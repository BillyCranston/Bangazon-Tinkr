﻿using Microsoft.Extensions.Configuration;
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

        public OrderTotal GetSingleOrder(int orderId)
        {
            var orderLineItems = GetLineItemDetailsByOrderId(orderId);
            var sql = @"
                        select *
                        from [Order]
                        where OrderId = @OrderId;
                      ";

            var sql2 = @"
                        select sum(Rubbish.Price) as OrderTotal
                        from LineItem
	                        join Rubbish
		                        on LineItem.RubbishId = Rubbish.RubbishId
                        where LineItem.orderId = @OrderId;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var orderSum = db.QueryFirstOrDefault<int>(sql2, parameters);
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                var parameters2 = new OrderTotal() 
                { 
                    OrderId = orderId, 
                    LineItems = orderLineItems, 
                    Total = orderSum, 
                    UserId = result.UserId, 
                    PaymentId = result.PaymentId 
                };
                return parameters2;
            }
        }

        public IEnumerable<LineItemDetailed> GetLineItemDetailsByOrderId(int orderId)
        {
            var sql = @"
                        select Rubbish.[Name] as RubbishName, Rubbish.[Description] as RubbishDescription, Rubbish.Price as RubbishPrice
                        from LineItem
	                        join Rubbish
		                        on LineItem.RubbishId = Rubbish.RubbishId
                        where LineItem.orderId = @OrderId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.Query<LineItemDetailed>(sql, parameters);
                return result;
            }
        }

    }
}
