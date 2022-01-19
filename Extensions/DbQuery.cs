using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using MySqlConnector;

namespace Gustify.Extensions
{
    public class DbQuery
    {
        public AppDb AppDb { get; }

        public DbQuery(AppDb appDb)
        {
            AppDb = appDb;
        }

        public async Task<DbItem> FindOneAsync(int id)
        {
            using var cmd = AppDb.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `gatunek`, `komentarz` FROM `komentarze` WHERE `id` = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }
        public async Task<List<DbItem>> FindAllAsync(int id)
        {
            using var cmd = AppDb.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `gatunek`, `komentarz` FROM `komentarze` WHERE `id` = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id,
            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result : null;
        }
        public async Task<DbItem> FindOneAsync(string gatunek)
        {
            using var cmd = AppDb.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `gatunek`, `komentarz` FROM `komentarze` WHERE `gatunek` = @gatunek";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@gatunek",
                DbType = DbType.String,
                Value = gatunek
            }); ;
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }
        public async Task<List<DbItem>> FindAllAsync(string gatunek)
        {
            using var cmd = AppDb.Connection.CreateCommand();
            cmd.CommandText = @"SELECT `id`, `gatunek`, `komentarz` FROM `komentarze` WHERE `gatunek` = @gatunek";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@gatunek",
                DbType = DbType.String,
                Value = gatunek
            }); ;
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result : null;
        }

        private async Task<List<DbItem>> ReadAllAsync(DbDataReader reader)
        {
            var items = new List<DbItem>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var item = new DbItem
                    {
                        Id = reader.GetInt32(0),
                        Gatunek = reader.GetString(1),
                        Komentarz = reader.GetString(2),
                    };
                    items.Add(item);
                }
            }
            return items;
        }
    }
}
