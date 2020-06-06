using Bangazon_Tinkr.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.DataAccess
{
    public class RubbishRepo
    {
        string connectionString;
        public RubbishRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("Tinkr");
        }

        public List<Rubbish> GetRubbish()
        {
            using (var db = new SqlConnection(connectionString))
            {
                return db.Query<Rubbish>("select * from rubbish").ToList();
            }
        }
    }
}
