using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.DataAccess
{
    public class OrdersRepo
    {
        string connectionString;
        public OrdersRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("Tinkr");
        }
    }
}
