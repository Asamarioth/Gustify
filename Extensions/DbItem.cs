namespace Gustify.Extensions
{
    public class DbItem
    {
        public int Id { get; set; }
        public string Gatunek { get; set; }
        public string Komentarz { get; set; }

        public DbItem(int id, string gatunek, string komentarz)
        {
            Id = id;
            Gatunek = gatunek;
            Komentarz = komentarz;
        }

        public DbItem()
        {
        }
    }
}
