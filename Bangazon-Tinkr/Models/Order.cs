using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int PaymentId { get; set; }
        public bool IsComplete { get; set; }
        public DateTime DateCompleted { get; set; } 
        public bool IsShipped { get; set; }
    }
}
