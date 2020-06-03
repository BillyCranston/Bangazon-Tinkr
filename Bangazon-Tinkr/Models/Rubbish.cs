using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bangazon_Tinkr.Models
{
    public class Rubbish
    {
        public int RubbishId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public bool IsAvailable { get; set; }
        public int UserId { get; set; }
        public decimal Price { get; set; }

    }
}
