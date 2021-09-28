using System;
using System.Collections.Generic;
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
        public List<string> artistName;
        public string imageUri;
        public string albumName;
        public string trackName;
        public int popularity;

        public SimplifiedTopTrack(List<string> artistName, string imageUri, string albumName, string trackName, int popularity)
        {
            this.artistName = artistName;
            this.imageUri = imageUri;
            this.albumName = albumName;
            this.trackName = trackName;
            this.popularity = popularity;
        }
    }
    public class SimplifiedPlaylist
    {
        public string id;
        public string imageUri;
        public string name;

        public SimplifiedPlaylist(string id, string imageUri, string name)
        {
            this.id = id;
            this.imageUri = imageUri;
            this.name = name;
        }
    }
    public class SimpPlay
    {
        public string id;
        public List<string> artistId;

        public SimpPlay(string id, List<string> artistId)
        {
            this.id = id;
            this.artistId = artistId;
        }

        public SimpPlay()
        {
            this.artistId = new List<string>();
        }

        public SimpPlay(string id)
        {
            this.id = id;
            this.artistId = new List<string>();
        }
    }

}
