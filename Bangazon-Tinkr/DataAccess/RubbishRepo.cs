using Bangazon_Tinkr.Models;
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

        public IEnumerable<Rubbish> GetRubbishByUserId(int userId)
        {
            var sql = @"select r.* 
                        from Rubbish r
                        JOIN [User] u
                        ON r.UserId = u.UserId
                        Where r.UserId = @userId AND r.IsAvailable = 1";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<Rubbish>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<Rubbish> RubbishInventoryByUserId(int userId)
        {
            var sql = @"select r.* 
                        FROM [User] u
                        JOIN Rubbish r ON r.UserId = u.UserId
                        JOIN LineItem l ON l.RubbishId = r.RubbishId
                        JOIN [Order] o ON o.OrderId = l.OrderId
                        Where r.UserId = 2 AND r.IsAvailable = 1 AND o.IsComplete = 0";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<Rubbish>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<Rubbish> RubbishToShipByUserId(int userId)
        {
            var sql = @"select r.* 
                        FROM [User] u
                        JOIN Rubbish r ON r.UserId = u.UserId
                        JOIN LineItem l ON l.RubbishId = r.RubbishId
                        JOIN [Order] o ON o.OrderId = l.OrderId
                        Where r.UserId = @UserId AND r.IsAvailable = 0 AND o.IsComplete = 1 AND o.IsShipped = 0";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<Rubbish>(sql, parameters);
                return result;
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
                        WHERE RubbishId = @RubbishId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { RubbishId = rubbishId };
                var result = db.QueryFirstOrDefault<Rubbish>(sql, parameters);
                return result;
            }
        }

        public Rubbish RubbishNoLongerAvailableAfterOrderComplete(int orderId)
        {
            var sql = @"UPDATE Rubbish
                        SET Rubbish.IsAvailable = 0
                        FROM Rubbish
                        JOIN LineItem ON LineItem.RubbishId = Rubbish.RubbishId
                        JOIN [Order] ON [Order].OrderId = LineItem.OrderId
                        WHERE [Order].OrderId = @orderId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
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

        public Rubbish Update(Rubbish rubbishToUpdate)
        {
            var sql = @"
                        update Rubbish
                        set [name] = @Name, [Description] = @Description, [CategoryId] = @CategoryId, [Price] = @Price
                        where RubbishId = @RubbishId;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new
                {
                    RubbishId = rubbishToUpdate.RubbishId,
                    Name = rubbishToUpdate.Name,
                    Description = rubbishToUpdate.Description,
                    CategoryId = rubbishToUpdate.CategoryId,
                    Price = rubbishToUpdate.Price
                };
                var result = db.QueryFirstOrDefault<Rubbish>(sql, parameters);
                return result;

            }
        }

        public IEnumerable<Category> GetCategories()
        {
            using (var db = new SqlConnection(connectionString))
            {
                return db.Query<Category>("select * from Category order by Name");
            }
        }
        
        public IEnumerable <Rubbish> getRubbishByName(string name)
        {
            var sql =   @"select *
                        from Rubbish
                        where Name LIKE @Name;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { Name = "%" + name + "%"};
                var rubbish = db.Query<Rubbish>(sql, parameters);
                return rubbish;
            }
        }

        public decimal returnTotalSalesByUserId(int userId)
        {
            var sql = @"Select ISNULL(SUM(r.Price), 0) as SalesTotal
                        FROM [User] u
                        JOIN Rubbish r on r.UserId = u.UserId
                        JOIN LineItem l on r.RubbishId = l.RubbishId
                        JOIN [Order] o on o.OrderId = l.OrderId
                        WHERE r.UserId = @userId AND o.IsComplete = 1;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var totalSales = db.QueryFirstOrDefault<decimal>(sql, parameters);
                return totalSales;
            }
        }

        public decimal returnTotalSalesThisMonth(int userId)
        {
            var sql = @"Select ISNULL(SUM(r.Price), 0) as SalesTotalThisMonth
                        FROM [User] u
                        JOIN Rubbish r on r.UserId = u.UserId
                        JOIN LineItem l on r.RubbishId = l.RubbishId
                        JOIN [Order] o on o.OrderId = l.OrderId
                        WHERE r.UserId = @userId AND o.IsComplete = 1 AND MONTH(DateCompleted) = MONTH(GETDATE())
                        AND YEAR(DateCompleted) = YEAR(GETDATE());";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var totalSales = db.QueryFirst<decimal>(sql, parameters);
                return totalSales;
            }
        }

        public decimal returnAverageSalePerItem(int userId)
        {
            var sql = @"Select ISNULL(AVG(r.Price), 0) as AvgPerSale
                        FROM [User] u
                        JOIN Rubbish r on r.UserId = u.UserId
                        JOIN LineItem l on r.RubbishId = l.RubbishId
                        JOIN [Order] o on o.OrderId = l.OrderId
                        WHERE r.UserId = @userId AND o.IsComplete = 1;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var avgSale = db.QueryFirst<decimal>(sql, parameters);
                return avgSale;
            }
        }


    }
}
