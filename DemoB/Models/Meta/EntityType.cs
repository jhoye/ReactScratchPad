using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace DemoB.Models.Meta
{
    [DataContract]
    public class EntityType
    {
        [DataMember]
        public Guid Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember(EmitDefaultValue = false, Name = "attributes")]
        public IEnumerable<EntityTypeAttribute> EntityTypeAttributes { get; set; }

        [DataMember(EmitDefaultValue = false, Name = "relationships")]
        [InverseProperty("EntityType")]
        public IEnumerable<EntityTypeRelationship> EntityTypeRelationships { get; set; }

        [DataMember(EmitDefaultValue = false, Name = "inverseRelationships")]
        [InverseProperty("RelatedEntityType")]
        public IEnumerable<EntityTypeRelationship> ReverseEntityTypeRelationships { get; set; }

        #region data

        public IEnumerable<Entity> Entities { get; set; }

        #endregion
    }
}
