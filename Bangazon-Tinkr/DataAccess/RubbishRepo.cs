﻿using Bangazon_Tinkr.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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

        public List<Rubbish> GetRubbish()
        {
            using (var db = new SqlConnection(connectionString))
            {
                return db.Query<Rubbish>("select * from rubbish").ToList();
            }
        }

        public Rubbish CreateRubbish(Rubbish rubbishToAdd)
        {
            var sql = @"INSERT INTO Rubbish ( Name, Description, CategoryId, IsAvailable, UserId, Price)
                     output inserted.*
                     VALUES(@Name, @Description, @CategoryId, @IsAvailable, @UserId, @Price);";

            using (var db = new SqlConnection(connectionString))
            {
                var results = db.QueryFirstOrDefault<Rubbish>(sql, rubbishToAdd);
                return results;
            }
        }
        public IEnumerable<Rubbish> GetAllRubbishByCategoryId(int categoryId)
        {
            var sql = @"select r.* 
                        from Rubbish r
                        JOIN Category c
                        ON r.CategoryId = c.CategoryId
                        Where c.CategoryId = @categoryId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { CategoryId = categoryId };
                var result = db.Query<Rubbish>(sql, parameters);
                return result;
            }
        }

        public Rubbish DeleteRubbish(int rubbishId)
        {
            var sql = @"DELETE from Rubbish
                        WHERE RubbishId = @RubbishId;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { RubbishId = rubbishId };
                var result = db.QueryFirstOrDefault<Rubbish>(sql, parameters);
                return result;
            }
        }
        

        public Rubbish CheckIfRubbishIsAvailable(int rubbishId)
        {
            var sql = @"
                        select *
                        from Rubbish
                        where rubbishId = @RubbishId and IsAvailable = 1;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { RubbishId = rubbishId };
                var result = db.QueryFirstOrDefault<Rubbish>(sql, parameters);
                return result;
            }
        }
    }
}
