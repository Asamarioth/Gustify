using SpotifyAPI.Web;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpotTest.Extensions
{
    public static class ExtractionMethods
    {
        public static async Task<SimpPlay> GetArtistsIdsFromPlaylist(string playlistId, SpotifyClient spotify)
        {
            var tempIdList = new List<string>();
            //SimplePlaylist nie zawiera w sobie listy utworów więc muszę pobrać ją osobno
            var playlistTracks = await spotify.Playlists.GetItems(playlistId);
            await foreach (PlaylistTrack<IPlayableItem> track in spotify.Paginate(playlistTracks))
            {
                //Playlista może zawierać utwory lub epizody podcastu, te drugie ignoruję
                if (track.Track is FullTrack fullTrack)
                {
                    tempIdList.Add(fullTrack.Artists[0].Id);
                }
            }
            var simpPlay = new SimpPlay(playlistId, tempIdList);

            return simpPlay;
        }
    }
}