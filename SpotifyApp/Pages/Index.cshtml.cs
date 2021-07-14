using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SpotifyAPI.Web;

namespace SpotifyApp.Pages
{
  public class IndexModel : PageModel
  {
    private const int LIMIT = 10;
    private readonly SpotifyClientBuilder _spotifyClientBuilder;

    public Paging<SimplePlaylist> Playlists { get; set; }
    public Paging<FullTrack> Tracks { get; set; }

    public string Next { get; set; }
    public string Previous { get; set; }

    public IndexModel(SpotifyClientBuilder spotifyClientBuilder)
    {
      _spotifyClientBuilder = spotifyClientBuilder;
    }

    public async Task OnGet()
    {
      var spotify = await _spotifyClientBuilder.BuildClient();


      int offset = int.TryParse(Request.Query["Offset"], out offset) ? offset : 0;
      var tracksRequest = new PersonalizationTopRequest
      {
        Limit = LIMIT,
        Offset = offset
      };
      try
      {
        Tracks = await spotify.Personalization.GetTopTracks(tracksRequest);
      }

      catch(APIException e)
      {
        System.Console.WriteLine(e.Message);
        System.Console.WriteLine(e.Response?.StatusCode);
      }
      if (Tracks.Next != null)
      {
        Next = Url.Page("Index", new { Offset = offset + LIMIT });
      }
      if (Tracks.Previous != null)
      {
        Previous = Url.Page("Index", values: new { Offset = offset - LIMIT });
      }
    }
  }
}
