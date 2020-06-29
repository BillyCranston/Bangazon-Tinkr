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

        public bool CheckForValidOrderId(int orderId)
        {
            var sql = @"
                        select *
                        from [Order]
                        where orderId = @OrderId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                if (result != null) return true;
                return false;
            }
        }

        public int GetOrderTotal(int orderId)
        {
            var sql = @"
                        select sum(Rubbish.Price) as OrderTotal
                        from LineItem
	                        join Rubbish
		                        on LineItem.RubbishId = Rubbish.RubbishId
                        where LineItem.orderId = @OrderId;
                      ";
            
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var orderSum = db.QueryFirstOrDefault<int>(sql, parameters);
                return orderSum;
            }

        }

        public OrderTotal GetSingleOrderDetails(int orderId)
        {
            var orderLineItems = GetLineItemDetailsByOrderId(orderId);
            var orderSum = GetOrderTotal(orderId);
            var sql = @"
                        select *
                        from [Order]
                        where OrderId = @OrderId;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                var orderTotal = new OrderTotal()
                {
                    OrderId = orderId,
                    LineItems = orderLineItems,
                    Total = orderSum,
                    UserId = result.UserId,
                    PaymentId = result.PaymentId
                };
                return orderTotal;
            }
        }

        public Order GetCompletedOrderByRubbishId(int rubbishId)
        {
            var sql = @"
                        select o.* 
                        FROM Rubbish r
                        JOIN LineItem l ON l.RubbishId = r.RubbishId
                        JOIN [Order] o ON o.OrderId = l.OrderId
                        Where r.RubbishId = @rubbishId AND r.IsAvailable = 0 AND o.IsComplete = 1 AND o.IsShipped = 0;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { RubbishId = rubbishId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<LineItemDetailed> GetLineItemDetailsByOrderId(int orderId)
        {
            var sql = @"
                        select LineItem.LineItemId, Rubbish.[Name] as RubbishName, Rubbish.[Description] as RubbishDescription, Rubbish.Price as RubbishPrice, Rubbish.RubbishId
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

        public IEnumerable<Order> GetUserOrders(int userId)
        {
            var sql = @"
                        select *
                        from [Order]
                        where UserId = @UserId;
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.Query<Order>(sql, parameters);
                return result;
            }
        }

        public Order GetOpenUserOrder(int userId)
        {
            var sql = @"
                        select *
                        from [Order]
                        where UserId = @UserId
                        and IsComplete = 0;
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                return result;
            }
        }


        public bool VerifyIncompleteOrderExists(int orderId)
        {
           var sql = @"
                        select*
                        from[Order]
                        where OrderId = @orderId and IsComplete = 0;
            ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                if (result != null) return true;
                return false;
            }
        }

        public bool VerifyCompletedOrderExists(int orderId)
        {
            var sql = @"
                        select*
                        from[Order]
                        where OrderId = @orderId and IsComplete = 1;
            ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                if (result != null) return true;
                return false;
            }
        }

        public IEnumerable<Order> CompleteOrder(int orderId)
        {
            var sql = @"
                        UPDATE [Order]
                        Set IsComplete = 1, DateCompleted = GETDATE()
                        Output inserted.*
                        Where OrderId = @orderId;
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.Query<Order>(sql, parameters);
                return result;
            }
        }


        public Order AddNewOrder(Order orderToAdd)
        {
            var sql = @"insert into [Order](UserId, PaymentId, IsComplete)
                        output inserted.*
                        values(@UserId,null,0)";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = orderToAdd.UserId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                return result;
            }
           
        }

        public Order CheckForCurrentOrder(Order orderToAdd)
        {
            var sql = @"
                        select *
                        from [Order]
                        where userId = @UserId and IsComplete = 0;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = orderToAdd.UserId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                return result;
            }
        }

        public Order CheckIfOrderIsActive(int orderId)
        {
            var sql = @"
                        select *
                        from [Order]
                        where orderId = @OrderId and IsComplete = 0;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                return result;
            }
        }

        public IEnumerable<OrderForSellerDash> GetOrdersBySeller(int sellerId)
        {
            var sql = @"
                        select o.OrderId,
                               r.[Name] as RubbishName,
                               r.Price,
                               Buyer.FirstName + ' ' + Buyer.LastName as BuyerName,
	                           Buyer.StreetAddress,
                               Buyer.City,
                               Buyer.[State],
                               Buyer.Zip
                        from [Order] as o
	                        join LineItem as l on o.OrderId = l.OrderId
	                        join Rubbish as r on l.RubbishId = r.RubbishId
	                        join [User] as Buyer on o.UserId = Buyer.UserId
                        where r.UserId = @sellerId
                       ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { SellerId = sellerId };
                var results = db.Query<OrderForSellerDash>(sql, parameters);
                return results;
            }
        }

        public LineItem AddNewLineItem(LineItem lineItemToAdd)
        {
            var sql = @"
                        insert into LineItem(OrderId, RubbishId)
                        output inserted.*
                        values(@OrderId,@RubbishId);
                      ";
            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = lineItemToAdd.OrderId, RubbishId = lineItemToAdd.RubbishId };
                var result = db.QueryFirstOrDefault<LineItem>(sql, parameters);
                return result;
            }
        }

        public LineItem GetLineItemById(int lineItemId)
        {
            var sql = @"
                        select * 
                        from LineItem 
                        where LineItemId = @LineItemId;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { LineItemId = lineItemId };
                var result = db.QueryFirstOrDefault<LineItem>(sql, parameters);
                return result;
            }
        }
         public LineItem DeleteLine(int lineItemId)
        {
            var sql = @"DELETE from LineItem
                        WHERE LineItemId = @LineItemId;";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { LineItemId = lineItemId };
                var result = db.QueryFirstOrDefault<LineItem>(sql, parameters);
                return result;
            }
        }

        public LineItem CheckForProductIdOnCurrentOrder(LineItem lineItem)
        {
            var sql = @"
                        select *
                        from LineItem
                        where orderId = @OrderId and RubbishId = @RubbishId;
                      ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { RubbishId = lineItem.RubbishId, OrderId = lineItem.OrderId };
                var result = db.QueryFirstOrDefault<LineItem>(sql, parameters);
                return result;
            }
        }

        public Order UpdateOrderWithNewPaymentType(int orderId, int paymentId)
        {
            var sql = @"
                        UPDATE[Order]
                        Set PaymentId = @PaymentId
                        Output inserted.*
                        Where OrderId = @OrderId;
                        ";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { OrderId = orderId, PaymentId = paymentId };
                var result = db.QueryFirstOrDefault<Order>(sql, parameters);
                return result;
            }
        }

    }
}
