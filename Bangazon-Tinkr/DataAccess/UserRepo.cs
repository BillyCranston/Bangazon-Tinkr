﻿using Microsoft.Extensions.Configuration;
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

        public User GetUserByAddress(string streetAddress)
        {
            var query = @"select *
                          from [User]
                          where StreetAddress = @streetAddress";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { StreetAddress = streetAddress };

                var user = db.QueryFirstOrDefault<User>(query, parameters);
                return user;
            }
        }

        public User Add(User user)
        {
            //var date = DateTime.Now;
            var sql = $@"insert into [User](FirstName, LastName, [Type], DateCreated, 
                        StreetAddress, City, [State], Zip)
                        output inserted.*
                        Values(@FirstName, @LastName, @Type,
                        GETDATE(), @StreetAddress, @City, @State, @Zip)";

            using (var db = new SqlConnection(connectionString))
            {
                var result = db.QueryFirstOrDefault<User>(sql, user);
                return result;
            }
        }
    }
}
