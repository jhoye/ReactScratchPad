using System.Collections.Generic;
using System.Runtime.Serialization;

namespace DemoA.Models.Eav.Meta
{
    [DataContract]
    public class ValueType
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public IEnumerable<EntityTypeAttribute> Attributes { get; set; }
    }
}
