using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Memory;
using SpotifyAPI.Web;
using System;
using System.Threading.Tasks;
using SpotifyApp.Helpers;
using System.Collections.Generic;

namespace SpotifyApp.Pages
{
    public class IndexModel : PageModel
    {
        private const int LIMIT = 10;
        private readonly SpotifyClientBuilder _spotifyClientBuilder;
        private readonly IMemoryCache _cache;

        public Paging<SimplePlaylist> Playlists { get; set; }
        public List<SimplifiedTopTrack> Tracks { get; set; }
        public PrivateUser Me;
        private string userID;
        private Paging<SimplePlaylist> cachedPlaylists;
        private Paging<FullTrack> cachedTracks;
        SpotifyClient spotify;
        public IndexModel(SpotifyClientBuilder spotifyClientBuilder, IMemoryCache memoryCache)
        {
            _spotifyClientBuilder = spotifyClientBuilder;
            _cache = memoryCache;
            
        }
        public async Task OnGet()
         {
             spotify = await _spotifyClientBuilder.BuildClient();
             Me = await spotify.UserProfile.Current();
             userID = Me.Id;
             var tracksRequest = new PersonalizationTopRequest
             {
                 Limit = LIMIT
             };

             if (!_cache.TryGetValue(userID + "_Tracks", out cachedTracks))
             {
                 try
                 {
                     cachedTracks = await spotify.Personalization.GetTopTracks(tracksRequest);
                     var cacheEntryOptions = new MemoryCacheEntryOptions()
                         // Keep in cache for this time, reset time if accessed.
                         .SetSlidingExpiration(TimeSpan.FromMinutes(30));

                     // Save data in cache.
                     _cache.Set(userID + "_Tracks", cachedTracks, cacheEntryOptions);
                 }
                 catch (APIException e)
                 {
                     System.Console.WriteLine(e.Message);
                     System.Console.WriteLine(e.Response?.StatusCode);
                 }
             }
             Tracks = SimplifyTopTracks(cachedTracks);

            if (!_cache.TryGetValue(userID + "_Playlists", out cachedPlaylists))
             {
                 try
                 {
                     cachedPlaylists = await spotify.Playlists.CurrentUsers();
                     var cacheEntryOptions = new MemoryCacheEntryOptions()
                         // Keep in cache for this time, reset time if accessed.
                         .SetSlidingExpiration(TimeSpan.FromMinutes(30));

                     // Save data in cache.
                     _cache.Set(userID + "_Playlists", cachedPlaylists, cacheEntryOptions);
                 }
                 catch (APIException e)
                 {
                     System.Console.WriteLine(e.Message);
                     System.Console.WriteLine(e.Response?.StatusCode);
                 }
             }
             Playlists = cachedPlaylists;
            Dictionary<string, Dictionary<string, int>> test = await GetPlaylistsGenres(Playlists);
        }
        

        //Upraszcza list� Top Piosenek wybieraj�c niekt�re pola, tego typu lista trafia p�niej do Reacta 
        private List<SimplifiedTopTrack> SimplifyTopTracks(Paging<FullTrack> tracks)
        {
            List<SimplifiedTopTrack> simplifiedTopTracks = new List<SimplifiedTopTrack>();

            foreach (var item in tracks.Items)
            {
                List<string>tempArtists = new List<string>();
                foreach(var art in item.Artists)
                {
                    tempArtists.Add(art.Name);
                }

                SimplifiedTopTrack tempTrack = new SimplifiedTopTrack(
                    tempArtists,
                    item.Album.Images[0].Url,
                    item.Album.Name,
                    item.Name,
                    item.Popularity
                    );
                simplifiedTopTracks.Add(tempTrack);
            }

            return simplifiedTopTracks;
        }
        //Upraszcza list� playlist wybieraj�c niekt�re pola, tego typu lista trafia p�niej do Reacta 
        private List<SimplifiedPlaylist> SimplifyPlaylists(Paging<SimplePlaylist> playlists)
        {
            List<SimplifiedPlaylist> simplifiedPlaylists = new List<SimplifiedPlaylist>();

            foreach(var item in playlists.Items)
            {
                //Bior� tylko playlisty kt�rych w�a�cicielem jest obecny u�ytkownik
                if(item.Owner.Id == userID) { 
                SimplifiedPlaylist simplified = new SimplifiedPlaylist(
                    item.Id,
                    item.Images[0].Url,
                    item.Name);
                simplifiedPlaylists.Add(simplified);
                }
            }
            return simplifiedPlaylists;
        }

        //Funkcja konstruuje dla ka�dej playlisty s�ownik ze zliczonymi gatunkami przypisanymi do artyst�w
        //Arty�ci mog� mie� wi�cej ni� jeden gatunek i w takiej sytuacji brane s� wszystkie wi�c liczby
        //nie b�d� zgodne z ilo�ci� piosenek
        private async Task<Dictionary<string,Dictionary<string,int>>> GetPlaylistsGenres(Paging<SimplePlaylist> playlists)
        {
            Dictionary<string, Dictionary<string, int>> genres =new Dictionary<string, Dictionary<string, int>>() ;
            List<SimpPlay> simpPlays = await GetArtistsIdsFromPlaylists(playlists);
           
            
            foreach(var item in simpPlays)
            {
                Dictionary<string, int> playlistGenres = new Dictionary<string, int>();
                List<List<string>> artistsRequests = new List<List<string>>();

                //Dziel� id w grupki po maksymalnie 50, bo taki jest g�rny limit zapytania do API
                for(int i = 0; i <= (item.artistId.Count / 50); i++)
                {
                    List<string> artistsRequestPart = new List<string>();
                    for(int j =0;j<50; j++ )
                    {
                        if (i * 50 + j >= item.artistId.Count)
                            break;
                        else
                            artistsRequestPart.Add(item.artistId[i * 50 + j]);
                    }
                    artistsRequests.Add(artistsRequestPart);
                }

                //Wykonuje zapytanie o pe�ne detale artyst�w dla ka�dej z powy�szych grupek i wyci�gam z nich gatunki artyst�w
                foreach(var arReq in artistsRequests)
                {
                    ArtistsRequest artistsRequest = new ArtistsRequest(arReq);
                    ArtistsResponse artistsResponse =  await spotify.Artists.GetSeveral(artistsRequest);
                    foreach(var arResp in artistsResponse.Artists)
                    {
                        foreach(var genre in arResp.Genres)
                        {
                            if(playlistGenres.ContainsKey(genre))
                            {
                                playlistGenres[genre]++;
                            }
                            else
                            {
                                playlistGenres.Add(genre, 1);
                            }
                        }
                    }
                }
                genres.Add(item.id, playlistGenres);
                

            }

            return genres;
        }

        //SpotifyAPI zwraca uproszczone obiekty nie zawieraj�ce wszystkich potrzebnym mi p�l co zmusza mnie do pewnej �onglerki
        //Ta funkcja wyci�ga z Paging<SimplePlaylist> b�d�cego wynikiem zapytania o wszystkie playlisty u�ytkownika
        //id (pierwszego w wypadku kilku w piosence) artysty, kt�re potem zostanie wykorzystane do pobrania gatunk�w
        //przypisanych do tych artyst�w
        //Obiekt klasy SimpPlay zawiera w sobie id playlisty i list� id artyst�w w tej playli�cie
        private async Task<List<SimpPlay>> GetArtistsIdsFromPlaylists(Paging<SimplePlaylist> playlists)
        {
            List<SimpPlay> simpPlay = new List<SimpPlay>();
            foreach (var item in playlists.Items)
            {
                if (item.Owner.Id == userID)
                {
                    List<string> tempIdList = new List<string>();
                    //SimplePlaylist nie zawiera w sobie listy utwor�w wi�c musz� pobra� j� osobno
                    var playlistTracks = await spotify.Playlists.GetItems(item.Id);
                    await foreach (PlaylistTrack<IPlayableItem> track in spotify.Paginate(playlistTracks))
                    {
                        //Playlista mo�e zawiera� utwory lub epizody podcastu, te drugie ignoruj�
                        if (track.Track is FullTrack fullTrack)
                        {
                            tempIdList.Add(fullTrack.Artists[0].Id);
                        }
                    }
                    simpPlay.Add(new SimpPlay(item.Id, tempIdList));
                }
            }

            return simpPlay;
        }
    }
}
