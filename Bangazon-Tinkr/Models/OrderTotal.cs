using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Models
{
    public class OrderTotal : Order
    {
        public IEnumerable<LineItemDetailed> LineItems { get; set; }
        public decimal Total { get; set; }
        
    }
}
