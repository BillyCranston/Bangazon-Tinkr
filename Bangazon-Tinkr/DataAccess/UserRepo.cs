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

        public PaymentType GetPaymentTypeById(int paymentTypeId)
        {
            var query = @"select * from PaymentType
                          where PaymentTypeId = @paymentTypeId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { PaymentTypeId = paymentTypeId };

                return db.QueryFirstOrDefault<PaymentType>(query, parameters);
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

        public IEnumerable<User> DeleteUserAccount(int id)
        {
            DeleteAllUserPaymentAccounts(id);

            var sql = @"UPDATE [User]
                        SET FirstName = null, LastName = null, StreetAddress = null, City = null, [State] = null, Zip = null
                        WHERE [User].UserId = @id";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { Id = id };

                var results = db.Query<User>(sql, parameters);
                return results;
            }
        }

        public IEnumerable<User> DeleteAllUserPaymentAccounts(int id)
        {
            var sql = @"UPDATE p
                        SET AccountNo = null
                        FROM PaymentType p
	                        JOIN [User] u
		                        ON u.UserId = p.UserId
			                        WHERE u.UserId = @id";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { Id = id };

                var results = db.Query<User>(sql, parameters);
                return results;
            }
        }

        public IEnumerable<PaymentType> GetPaymentTypesByUserId(int userId)
        {
            var query = @"SELECT *
                          FROM PaymentType
                          WHERE UserId = @UserId";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { UserId = userId };

                return db.Query<PaymentType>(query, parameters);
            }
        }

        public PaymentType GetPaymentTypeByAccountNo(int accountNo)
        {
            var query = @"SELECT *
                          FROM PaymentType
                          WHERE AccountNo = @accountNo";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { AccountNo = accountNo };

                var paymentType = db.QueryFirstOrDefault<PaymentType>(query, parameters);
                return paymentType;
            }
        }

        public PaymentType AddPaymentType(PaymentType paymentType)
        {
            var sql = $@"INSERT into PaymentType(UserId, PmtType, AccountNo)
                         OUTPUT inserted.*
                         VALUES(@UserId, @PmtType, @AccountNo)";

            using (var db = new SqlConnection(connectionString))
            {
                var result = db.QueryFirstOrDefault<PaymentType>(sql, paymentType);
                return result;
            }
        }

        public PaymentType UpdatePaymentType(PaymentType pmtType)
        {
            var sql = @"UPDATE PaymentType
                        SET UserId = @UserId, PmtType = @PmtType, AccountNo = @AccountNo
                        WHERE PaymentTypeId = @PaymentTypeId";

            using (var db = new SqlConnection(connectionString))
            {
                var result = db.QueryFirstOrDefault<PaymentType>(sql, pmtType);
                return result;
            }
        }

        public IEnumerable<PaymentType> DeletePaymentType(int paymentTypeId)
        {

            var sql = @"UPDATE PaymentType
                        SET AccountNo = null
                        WHERE PaymentTypeId = @id";

            using (var db = new SqlConnection(connectionString))
            {
                var parameters = new { Id = paymentTypeId };

                var results = db.Query<PaymentType>(sql, parameters);
                return results;
            }
        }
    }
}
