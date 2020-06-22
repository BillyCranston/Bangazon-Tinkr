using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Models
{
    public class LineItemDetailed
    {
        public int LineItemId { get; set; }
        public string RubbishName { get; set; }
        public string RubbishDescription { get; set; }
        public decimal RubbishPrice { get; set; }
        public int RubbishId { get; set; }
    }
}
