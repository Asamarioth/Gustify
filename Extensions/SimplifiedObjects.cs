using System.Collections.Generic;

namespace SpotTest.Extensions
{
    public class SimplifiedObjects
    {
    }

    public class SimplifiedTopTrack
    {
        public List<string> ArtistName { get; set; }
        public string ImageUri { get; set; }
        public string AlbumName { get; set; }
        public string TrackName { get; set; }
        public int Popularity { get; set; }
        public string Genre { get; set; }
        public string Comment { get; set; }

        public SimplifiedTopTrack(List<string> artistName, string imageUri, string albumName, string trackName, int popularity, string genre)
        {
            ArtistName = artistName;
            ImageUri = imageUri;
            AlbumName = albumName;
            TrackName = trackName;
            Popularity = popularity;
            Genre = genre;
            Comment = "";
        }
    }

    public class SimplifiedPlaylist
    {
        public string Id { get; set; }
        public string ImageUri { get; set; }
        public string Name { get; set; }

        public SimplifiedPlaylist(string id, string imageUri, string name)
        {
            this.Id = id;
            this.ImageUri = imageUri;
            this.Name = name;
        }
    }

    public class SimpPlay
    {
        public string Id { get; set; }
        public List<string> ArtistId { get; set; }

        public SimpPlay(string id, List<string> artistId)
        {
            this.Id = id;
            this.ArtistId = artistId;
        }

        public SimpPlay()
        {
            this.ArtistId = new List<string>();
        }

        public SimpPlay(string id)
        {
            this.Id = id;
            this.ArtistId = new List<string>();
        }
    }
}