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
    }
}
