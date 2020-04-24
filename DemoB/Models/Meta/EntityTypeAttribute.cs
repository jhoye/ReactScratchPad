using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace DemoB.Models.Meta
{
    [DataContract]
    public class EntityTypeAttribute
    {
        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public bool IsNullable { get; set; }

        [DataMember]
        public bool IsUnique { get; set; }

        [DataMember]
        public Guid EntityTypeId { get; set; }

        public EntityType EntityType { get; set; }

        [DataMember]
        public int ValueTypeId { get; set; }

        public ValueType ValueType { get; set; }

        #region data

        public IEnumerable<Attribute> Attributes { get; set; }

        #endregion
    }
}
