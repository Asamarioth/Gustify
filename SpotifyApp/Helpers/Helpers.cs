using System;
using System.Linq;

namespace SpotifyApp.Helpers
{
    public static class Helpers
    {
        public static string GenerateRandomAlphanumericString(int length)
        {
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            var random = new Random();
            var randomString = new string(Enumerable.Repeat(chars, length)
                                                    .Select(s => s[random.Next(s.Length)]).ToArray());
            return randomString;
        }
    }

    public class TemporaryTopTracks
    {
        public string name { get; set; }
        public string image { get; set; }
        public int popularity { get; set; }
        public string artist { get; set; }
        public string album { get; set; }

        public TemporaryTopTracks(string Name, string Image, string Artist, string Album)
        {
            name = Name;
            image = Image;
            artist = Artist;
            album = Album;
        }
    }

    public class TemporaryPlaylists
    {
        public string name { get; set; }
        public string displayName { get; set; }
        public string image { get; set; }
        public TemporaryPlaylists(string Name, string Image, string DisplayName)
        {
            name = Name;
            image = Image;
            displayName = DisplayName;
        }
    }

}