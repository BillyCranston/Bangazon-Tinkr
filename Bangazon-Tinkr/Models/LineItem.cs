using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Models
{
    public class LineItem
    {
        public int LineItemId { get; set; }
        public int OrderId { get; set; }
        public int RubbishId { get; set; }
    }
}
