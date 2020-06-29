using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Models
{
    public class OrderForSellerDash
    {
        public int OrderId { get; set; }
        public string RubbishName { get; set; }
        public int Price { get; set; }
        public string BuyerName { get; set; }
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int Zip { get; set; }
    }
}
