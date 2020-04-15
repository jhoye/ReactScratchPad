using System;
using DemoA.Models.Eav.Meta;

namespace DemoA.Models.Eav
{
    public class Relationship
    {
        public Guid Id { get; set; }

        public Guid EntityId { get; set; }
        public Entity Entity { get; set; }

        public Guid RelatedEntityId { get; set; }
        public Entity RelatedEntity { get; set; }

        #region meta

        public Guid EntityTypeRelationshipId { get; set; }
        public EntityTypeRelationship EntityTypeRelationship { get; set; }

        #endregion
    }
}
