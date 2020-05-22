using System;
using System.Collections.Generic;
using System.Linq;
using DemoB.Models;
using DemoB.Models.Meta;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DemoB.Controllers.Meta
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelationshipsController : ControllerBase
    {
        private readonly EavContext _eavContext;

        public RelationshipsController(EavContext eavContext)
        {
            System.Threading.Thread.Sleep(1000);
            _eavContext = eavContext;
        }

        [HttpPost]
        public ActionResult<EntityTypeRelationship> Post([FromBody] EntityTypeRelationship entityTypeRelationship)
        {
            try
            {
                var errors = Validate(entityTypeRelationship);

                if (errors.Length > 0)
                {
                    return BadRequest(errors);
                }

                var entityTypeRelationshipData = new EntityTypeRelationship
                {
                    Id = Guid.NewGuid(),
                    Name = string.IsNullOrWhiteSpace(entityTypeRelationship.Name)
                        ? $"Attribute {entityTypeRelationship.Id}"
                        : entityTypeRelationship.Name,
                    IsHasManyRelationship = entityTypeRelationship.IsHasManyRelationship,
                    EntityTypeId = entityTypeRelationship.EntityTypeId,
                    RelatedEntityTypeId = entityTypeRelationship.RelatedEntityTypeId
                };

                _eavContext.EntityTypeRelationships.Add(entityTypeRelationshipData);

                _eavContext.SaveChanges();

                return Ok(entityTypeRelationshipData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        public ActionResult<EntityTypeRelationship> Put([FromBody] EntityTypeRelationship entityTypeRelationship)
        {
            try
            {
                var errors = Validate(entityTypeRelationship);

                if (errors.Length > 0)
                {
                    return BadRequest(errors);
                }

                var entityTypeRelationshipData = _eavContext.EntityTypeRelationships
                    .SingleOrDefault(a => a.Id == entityTypeRelationship.Id);

                if (entityTypeRelationshipData == null)
                {
                    return NotFound();
                }

                entityTypeRelationshipData.Name = string.IsNullOrWhiteSpace(entityTypeRelationship.Name)
                    ? $"entity type attribute {entityTypeRelationship.Id}"
                    : entityTypeRelationship.Name;

                // TODO: check data for before allowing these updates
                entityTypeRelationshipData.IsHasManyRelationship = entityTypeRelationship.IsHasManyRelationship;
                entityTypeRelationshipData.EntityTypeId = entityTypeRelationship.EntityTypeId;
                entityTypeRelationshipData.RelatedEntityTypeId = entityTypeRelationship.RelatedEntityTypeId;

                _eavContext.SaveChanges();

                return Ok(entityTypeRelationshipData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete(Guid id)
        {
            try
            {
                var entityTypeRelationshipData = _eavContext.EntityTypeRelationships
                    .SingleOrDefault(a => a.Id == id);

                if (entityTypeRelationshipData == null)
                {
                    return NotFound();
                }

                // TODO: check data for before allowing these updates

                _eavContext.EntityTypeRelationships.Remove(entityTypeRelationshipData);

                _eavContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        private string Validate(EntityTypeRelationship entityTypeRelationship)
        {
            var errors = new List<string>();

            var entityType = _eavContext.EntityTypes
                .SingleOrDefault(a => a.Id == entityTypeRelationship.EntityTypeId);

            if (entityType == null)
            {
                errors.Add($"Entity type does not exists for EntityTypeId: {entityTypeRelationship.EntityTypeId}");
            }

            var relatedEntityType = _eavContext.EntityTypes
                .SingleOrDefault(a => a.Id == entityTypeRelationship.RelatedEntityTypeId);

            if (relatedEntityType == null)
            {
                errors.Add($"Entity type does not exists for RelatedEntityTypeId: {entityTypeRelationship.RelatedEntityTypeId}");
            }

            return string.Join(",", errors);
        }
    }
}
