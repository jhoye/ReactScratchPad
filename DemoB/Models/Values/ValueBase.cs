using System;

namespace DemoB.Models.Values
{
    public abstract class ValueBase
    {
        public Guid Id { get; set; }

        public Guid AttributeId { get; set; }
        public Attribute Attribute { get; set; }
    }
}
