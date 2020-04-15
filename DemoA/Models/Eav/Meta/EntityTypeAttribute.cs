using System;
using System.Collections.Generic;

namespace DemoA.Models.Eav.Meta
{
    public class EntityTypeAttribute
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsNullable { get; set; }

        public bool IsUnique { get; set; }

        public Guid EntityTypeId { get; set; }
        public EntityType EntityType { get; set; }

        public int ValueTypeId { get; set; }
        public ValueType ValueType { get; set; }

        #region data

        public IEnumerable<Attribute> Attributes { get; set; }

        #endregion
    }
}
