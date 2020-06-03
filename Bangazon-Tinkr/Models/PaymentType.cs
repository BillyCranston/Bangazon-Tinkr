using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Models
{
    public class PaymentType
    {
        public int PaymentTypeId { get; set; }
        public int UserId { get; set; }
        public string PmtType { get; set; }
        public int AccountNo { get; set; }
    }
}
