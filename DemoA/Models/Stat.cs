using System;

namespace DemoA.Models
{
    public class Stat
    {
        public Guid Id { get; set; }

        public StatType StatType { get; set; }

        public DateTime Date { get; set; }

        public decimal Value { get; set; }
    }
}