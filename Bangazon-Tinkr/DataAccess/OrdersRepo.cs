using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon_Tinkr.Models;
using System.Data.SqlClient;
using Dapper;

namespace Bangazon_Tinkr.DataAccess
{
    public class OrdersRepo
    {
        string connectionString;
        public OrdersRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("Tinkr");
        }

        public Order GetSingleOrder(int orderId)
        {
            var sql = @"
                        select *
                        from [Order]
                        where OrderId = @OrderId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                return result;
            }
        }

    }
}
