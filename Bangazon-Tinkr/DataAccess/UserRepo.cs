using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.DataAccess
{
    public class UserRepo
    {
        string connectionString;
        public UserRepo(IConfiguration config)
        {
            connectionString = config.GetConnectionString("Tinkr");
        }
    }
}
