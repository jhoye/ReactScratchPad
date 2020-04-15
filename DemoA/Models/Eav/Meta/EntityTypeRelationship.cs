using System;
using System.Collections.Generic;

namespace DemoA.Models.Eav.Meta
{
    public class EntityTypeRelationship
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsHasManyRelationship { get; set; }

        public Guid EntityTypeId { get; set; }
        public EntityType EntityType { get; set; }

        public Guid RelatedEntityTypeId { get; set; }
        public EntityType RelatedEntityType { get; set; }

        #region data

        public IEnumerable<Relationship> Relationships { get; set; }

        #endregion
    }
}
