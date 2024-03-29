﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;
using SpotifyAPI.Web;
using SpotTest.Extensions;
using SpotifyApp;
using Gustify.Extensions;
using MySqlConnector;
using System.Data;

namespace SpotTest.Controllers
{
    [Authorize]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly SpotifyClientBuilder _spotifyClientBuilder;
        private readonly IMemoryCache _cache;
        private readonly AppDb _appDb;
        public PrivateUser Me;
        private string userID;
        SpotifyClient spotify;
        private MemoryCacheEntryOptions cacheEntryOptions;


        public HomeController(SpotifyClientBuilder spotifyClientBuilder, IMemoryCache memoryCache, AppDb db)
        {
            _appDb = db;
            _spotifyClientBuilder = spotifyClientBuilder;
            _cache = memoryCache;

            cacheEntryOptions = new MemoryCacheEntryOptions()
                                    .SetSlidingExpiration(TimeSpan.FromMinutes(30));
        }


        [Route("toptracks")]
        public async Task<List<SimplifiedTopTrack>> TopTracks()
        {
            var Tracks = new List<SimplifiedTopTrack>();
            spotify = await _spotifyClientBuilder.BuildClient();
            Me = await spotify.UserProfile.Current();
            userID = Me.Id;
            var tracksRequest = new PersonalizationTopRequest { Limit = 10};


            Paging<FullTrack> cachedTracks;


            if (!_cache.TryGetValue(userID + "_Tracks", out cachedTracks))
            {
                try
                {
                    cachedTracks = await spotify.Personalization.GetTopTracks(tracksRequest);
                    // Save data in cache.
                    _cache.Set(userID + "_Tracks", cachedTracks, cacheEntryOptions);
                }
                catch (APIException e)
                {
                    System.Console.WriteLine(e.Message);
                    System.Console.WriteLine(e.Response?.StatusCode);
                }
            }

            await _appDb.Connection.OpenAsync();


            Tracks = await SimplificationMethods.SimplifyTopTracks(cachedTracks, spotify);
            Tracks = await GetCommentsForTracks(Tracks);

            return Tracks;
        }

        [Route("playlists")]
        public async Task<List<SimplifiedPlaylist>>Playlists()
        {
            spotify = await _spotifyClientBuilder.BuildClient();
            Me = await spotify.UserProfile.Current();
            userID = Me.Id;

            var Playlists = new List<SimplifiedPlaylist>();

            if (!_cache.TryGetValue(userID + "_Playlists", out Paging<SimplePlaylist> cachedPlaylists))
            {
                try
                {
                    cachedPlaylists = await spotify.Playlists.CurrentUsers();
                    // Save data in cache.
                    _cache.Set(userID + "_Playlists", cachedPlaylists, cacheEntryOptions);
                }
                catch (APIException e)
                {
                    System.Console.WriteLine(e.Message);
                    System.Console.WriteLine(e.Response?.StatusCode);
                }
            }

            Playlists = SimplificationMethods.SimplifyPlaylists(cachedPlaylists, userID);

            return Playlists;
        }

        [Route("playlist/{id}")]
        public async Task<Dictionary<string,int>>PlaylistDetails(string id)
        {
            var PlaylistDetails = new Dictionary<string, int>();
            spotify = await _spotifyClientBuilder.BuildClient();

            SimpPlay simpPlay = await ExtractionMethods.GetArtistsIdsFromPlaylist(id, spotify);
            var artistsRequests = new List<List<string>>();

            //Dzielę id w grupki po maksymalnie 50, bo taki jest górny limit zapytania do API
            for (int i = 0; i <= ((simpPlay.ArtistId.Count -1) / 50) ; i++)
            {
                List<string> artistsRequestPart = new List<string>();
                for (int j = 0; j < 50; j++)
                {
                    if (i * 50 + j >= simpPlay.ArtistId.Count)
                        break;
                    else
                        artistsRequestPart.Add(simpPlay.ArtistId[i * 50 + j]);
                }
                artistsRequests.Add(artistsRequestPart);
            }

            foreach (var arReq in artistsRequests)
            {
                ArtistsRequest artistsRequest = new ArtistsRequest(arReq);
                ArtistsResponse artistsResponse = await spotify.Artists.GetSeveral(artistsRequest);
                foreach (var arResp in artistsResponse.Artists)
                {
                    foreach (var genre in arResp.Genres)
                    {
                        if (PlaylistDetails.ContainsKey(genre))
                        {
                            PlaylistDetails[genre]++;
                        }
                        else
                        {
                            PlaylistDetails.Add(genre, 1);
                        }
                    }
                }
            }

            var dict = from entry in PlaylistDetails orderby entry.Value descending select entry;

            return dict.ToDictionary(x => x.Key, x => x.Value);
        }


        private async Task<List<SimplifiedTopTrack>> GetCommentsForTracks(List<SimplifiedTopTrack> topTracks)
        {
            string[] genres =
            {
                "k-pop", "rock", "metal", "rap", "hip hop", "jazz", "pop"
            };
            string genre;

            foreach(var track in topTracks)
            {
                genre = "";
                for(int i=0; i< genres.Length; i++)
                {  
                    if (track.Genre.Contains(genres[i], StringComparison.OrdinalIgnoreCase))
                    {
                        genre = genres[i];
                        break;
                    }
                }
                if (genre != "")
                {
                    var query = new DbQuery(_appDb);
                    var result = await query.FindAllAsync(genre);
                    Random random = new();
                    int index = random.Next(0, result.Count);
                    track.Comment = result[index].Komentarz;
                }
                else
                {
                    track.Comment = "Brak komentarza";
                }
            }
            return topTracks;
        }

    }
}
