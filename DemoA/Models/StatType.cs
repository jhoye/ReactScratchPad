using System;
using System.Collections.Generic;

namespace DemoA.Models
{
    public class StatType
    {
        public enum ValueTypes {
            Bit,
            Integer,
            Decimal
        }

        public Guid Id { get; set; }

        public string Name { get; set;}

        public ValueTypes ValueType { get; set; }

        public IEnumerable<Stat> Stats { get; set; }
    }
}