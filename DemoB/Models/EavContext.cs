using DemoB.Models.Meta;
using DemoB.Models.Values;
using Microsoft.EntityFrameworkCore;

namespace DemoB.Models
{
    public class EavContext : DbContext
    {
        public EavContext(DbContextOptions<EavContext> options) : base(options)
        {
        }

        #region Meta

        public DbSet<EntityType> EntityTypes { get; set; }

        public DbSet<EntityTypeAttribute> EntityTypeAttributes { get; set;}

        public DbSet<EntityTypeRelationship> EntityTypeRelationships { get; set; }

        public DbSet<ValueType> ValueTypes { get; set; }

        #endregion

        public DbSet<Entity> Entities { get; set; }

        public DbSet<Attribute> Attributes { get; set; }

        public DbSet<Relationship> Relationships { get; set; }

        public DbSet<AttributeBooleanValue> AttributeBooleanValues { get; set; }

        public DbSet<AttributeIntegerValue> AttributeIntegerValues { get; set; }

        public DbSet<AttributeDecimalValue> AttributeDecimalValues { get; set; }

        public DbSet<AttributeTextValue> AttributeTextValues { get; set; }

        public DbSet<AttributeDateTimeValue> AttributeDateTimeValues { get; set; }
    }
}