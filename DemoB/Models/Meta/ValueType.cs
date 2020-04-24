using System.Collections.Generic;
using System.Runtime.Serialization;

namespace DemoB.Models.Meta
{
    [DataContract]
    public class ValueType
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        public IEnumerable<EntityTypeAttribute> Attributes { get; set; }
    }
}
