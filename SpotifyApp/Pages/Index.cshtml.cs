using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Memory;
using SpotifyAPI.Web;
using System;
using System.Threading.Tasks;

namespace SpotifyApp.Pages
{
    public class IndexModel : PageModel
    {
        private const int LIMIT = 10;
        private readonly SpotifyClientBuilder _spotifyClientBuilder;
        private readonly IMemoryCache _cache;

        public Paging<SimplePlaylist> Playlists { get; set; }
        public Paging<FullTrack> Tracks { get; set; }
        public string Next { get; set; }
        public string Previous { get; set; }

        private string userID;
        private Paging<SimplePlaylist> cachedPlaylists;
        private Paging<FullTrack> cachedTracks;

        public IndexModel(SpotifyClientBuilder spotifyClientBuilder, IMemoryCache memoryCache)
        {
            _spotifyClientBuilder = spotifyClientBuilder;
            _cache = memoryCache;
            
        }

        public async Task OnGet()
        {
            var spotify = await _spotifyClientBuilder.BuildClient();
            userID = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
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
            Tracks = cachedTracks;

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

        }
    }
}