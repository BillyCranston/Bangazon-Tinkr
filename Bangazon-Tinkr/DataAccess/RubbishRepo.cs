using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon_Tinkr.Models;
using Dapper;
using System.Data.SqlClient;

namespace Bangazon_Tinkr.DataAccess
{
    public class RubbishRepo
    {
        string connectionString;
        public RubbishRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("Tinkr");
        }

        public Rubbish getSingleRubbish(int rubbishId)
        {
            var sql = @"SELECT * FROM Rubbish
                        WHERE RubbishId = @RubbishId;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { RubbishId = rubbishId };
                var rubbish = db.QueryFirstOrDefault<Rubbish>(sql, parameters);
                return rubbish;
            }
        }
    }
}
