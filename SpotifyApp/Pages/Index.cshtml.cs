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
        public Paging<FullTrack> Tracks { get; set; }
        public string Next { get; set; }
        public string Previous { get; set; }

        private string userID;
        private Paging<SimplePlaylist> cachedPlaylists;
        private Paging<FullTrack> cachedTracks;


        public List<TemporaryTopTracks> temporaryTopTracks;
        public List<TemporaryPlaylists> temporaryPlaylists;


        public IndexModel(SpotifyClientBuilder spotifyClientBuilder, IMemoryCache memoryCache)
        {
            _spotifyClientBuilder = spotifyClientBuilder;
            _cache = memoryCache;
            
        }
        public async Task OnGet()
       {
            temporaryTopTracks = new List<TemporaryTopTracks>();
            TemporaryTopTracks temporaryTop = new TemporaryTopTracks("In fermentum sodales se", "https://i.scdn.co/image/ab67616d0000b2734f361be013b7802a4d8f17b3", "Nam libero aenean.", "Nullam at eros non dolor.");


            temporaryPlaylists = new List<TemporaryPlaylists>();
            TemporaryPlaylists tempPlay = new TemporaryPlaylists("In fermentum sodales sed.", "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/dX3XSnyQK6tslP5sRTbMBoFRPaclWTWrGPnr81BizynnGlIB5MsQ50fm9G_g6nzB8Zt_B10UeIBkqgmkvWQppHmYBp2FYWTjeupLcFGG54I=/NDE6MTE6MzBUODEtODAtMQ==", "Sol");
 

            for(int i=0; i<11;i++)
            {
                temporaryTopTracks.Add(temporaryTop);
                temporaryPlaylists.Add(tempPlay);
            }




        }

       /* public async Task OnGet()
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

         }*/
             
    }
}