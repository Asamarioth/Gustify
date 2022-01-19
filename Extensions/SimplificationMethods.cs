using SpotifyAPI.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpotTest.Extensions
{
    public static class SimplificationMethods
    {
        public static async Task<List<SimplifiedTopTrack>> SimplifyTopTracks(Paging<FullTrack> tracks, SpotifyClient spotify)
        { 
            var simplifiedTopTracks = new List<SimplifiedTopTrack>();
            var artistsIds = new List<string>();
            foreach(var item in tracks.Items)
            {
                artistsIds.Add(item.Artists[0].Id);
            }
            ArtistsRequest artistsRequest = new ArtistsRequest(artistsIds);
            ArtistsResponse artistsResponse = await spotify.Artists.GetSeveral(artistsRequest);

            int i = 0;
            foreach (var item in tracks.Items)
            {
                var tempArtists = new List<string>();
                foreach (var art in item.Artists)
                {
                    tempArtists.Add(art.Name);
                }

                var tempTrack = new SimplifiedTopTrack(
                    tempArtists,
                    item.Album.Images[0].Url,
                    item.Album.Name,
                    item.Name,
                    item.Popularity,
                    artistsResponse.Artists[i].Genres[0]
                    );
                simplifiedTopTracks.Add(tempTrack);
                i++;
            }

            return simplifiedTopTracks;
        }
        public static List<SimplifiedPlaylist> SimplifyPlaylists(Paging<SimplePlaylist> playlists, string userID)
        {
            var simplifiedPlaylists = new List<SimplifiedPlaylist>();

            foreach (var item in playlists.Items)
            {
                //Biorę tylko playlisty których właścicielem jest obecny użytkownik
                if (item.Owner.Id == userID)
                {
                    var simplified = new SimplifiedPlaylist(
                        item.Id,
                        item.Images[0].Url,
                        item.Name);
                    simplifiedPlaylists.Add(simplified);
                }
            }
            return simplifiedPlaylists;
        }

    }

}
