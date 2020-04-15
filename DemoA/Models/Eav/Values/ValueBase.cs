using System;

namespace DemoA.Models.Eav.Values
{
    public abstract class ValueBase
    {
        public Guid Id { get; set; }

        public Guid AttributeId { get; set; }
        public Attribute Attribute { get; set; }
    }
}
