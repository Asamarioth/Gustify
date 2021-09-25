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
    public class SimplifiedTopTrack
    {
        public string artistName;
        public string imageUri;
        public string albumName;
        public string trackName;
        public int popularity;

        public SimplifiedTopTrack(string artistName, string imageUri, string albumName, string trackName, int popularity)
        {
            this.artistName = artistName;
            this.imageUri = imageUri;
            this.albumName = albumName;
            this.trackName = trackName;
            this.popularity = popularity;
        }
    }

}