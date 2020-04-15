using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using DemoA.Models.Eav.Meta;

namespace DemoA.Models.Eav
{
    public class Entity
    {
        public Guid Id { get; set; }

        public IEnumerable<Attribute> Attributes { get; set; }

        [InverseProperty("Entity")]
        public IEnumerable<Relationship> Relationships { get; set; }

        [InverseProperty("RelatedEntity")]
        public IEnumerable<Relationship> ReverseRelationships { get; set; }

        #region meta

        public Guid EntityTypeId { get; set; }
        public EntityType EntityType { get; set; }

        #endregion
    }
}