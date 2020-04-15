using System;
using DemoA.Models.Eav.Meta;
using DemoA.Models.Eav.Values;

namespace DemoA.Models.Eav
{
    public class Attribute
    {
        public Guid Id { get; set; }

        public Guid EntityId { get; set; }
        public Entity Entity { get; set; }

        #region attribute value

        public AttributeBooleanValue BooleanValue { get; set; }

        public AttributeDateTimeValue DateTimeValue { get; set; }

        public AttributeDecimalValue DecimalValue { get; set; }

        public AttributeIntegerValue IntegerValue { get; set; }

        public AttributeTextValue TextValue { get; set; }

        #endregion

        #region meta

        public Guid EntityTypeAttributeId { get; set; }
        public EntityTypeAttribute EntityTypeAttribute { get; set; }

        #endregion
    }
}