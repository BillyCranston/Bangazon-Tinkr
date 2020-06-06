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
    public class UserRepo
    {
        string connectionString;
        public UserRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("Tinkr");
        }

        public IEnumerable<User> GetAll()
        {
            using (var db = new SqlConnection(connectionString))
            {
                return db.Query<User>("select * from [User]");
            }
        }

        public User GetUserById(int userId)
        {
            var sql = @"Select * 
                        FROM [User]
                        Where UserId = @UserId
                        AND StreetAddress IS NOT NULL;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }

        public User CheckIfUserAccountIsDeleted(int userId)
        {
            var sql = @"Select * 
                        FROM [User]
                        Where UserId = @UserId
                        AND StreetAddress IS NULL;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }
    }
}
