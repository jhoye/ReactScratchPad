using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoA.Models.Eav;
using DemoA.Models.Eav.Meta;

namespace DemoA.Controllers.Eav.Meta
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntityTypeAttributesController : ControllerBase
    {
        private readonly EavContext _eavContext;

        public EntityTypeAttributesController(EavContext eavContext)
        {
            _eavContext = eavContext;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<EntityTypeAttribute> Get(Guid id)
        {
            try
            {
                var data = _eavContext.EntityTypeAttributes
                    .Include(a => a.EntityType)
                    .Include(a => a.ValueType)
                    .SingleOrDefault(a => a.Id == id);

                if (data == null)
                {
                    return NotFound();
                }

                return Ok(data);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public ActionResult<EntityTypeAttribute> Post([FromBody] EntityTypeAttribute entityTypeAttribute)
        {
            try
            {
                var errors = Validate(entityTypeAttribute);

                if (errors.Length > 0)
                {
                    return BadRequest(errors);
                }

                var entityTypeAttributeData = new EntityTypeAttribute
                {
                    Id = Guid.NewGuid(),
                    Name = string.IsNullOrWhiteSpace(entityTypeAttribute.Name)
                        ? $"Attribute {entityTypeAttribute.Id}"
                        : entityTypeAttribute.Name,
                    IsNullable = entityTypeAttribute.IsNullable,
                    IsUnique = entityTypeAttribute.IsUnique,
                    EntityTypeId = entityTypeAttribute.EntityTypeId,
                    ValueTypeId = entityTypeAttribute.ValueTypeId
                };

                _eavContext.EntityTypeAttributes.Add(entityTypeAttributeData);

                _eavContext.SaveChanges();

                return Ok(entityTypeAttributeData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] EntityTypeAttribute entityTypeAttribute)
        {
            try
            {
                var errors = Validate(entityTypeAttribute);

                if (errors.Length > 0)
                {
                    return BadRequest(errors);
                }

                var entityTypeAttributeData = _eavContext.EntityTypeAttributes
                    .SingleOrDefault(a => a.Id == entityTypeAttribute.Id);

                if (entityTypeAttributeData == null)
                {
                    return NotFound();
                }

                entityTypeAttributeData.Name = string.IsNullOrWhiteSpace(entityTypeAttribute.Name)
                    ? $"entity type attribute {entityTypeAttribute.Id}"
                    : entityTypeAttribute.Name;

                // TODO: check data for before allowing these updates
                entityTypeAttributeData.IsNullable = entityTypeAttribute.IsNullable;
                entityTypeAttributeData.IsUnique = entityTypeAttribute.IsUnique;
                entityTypeAttributeData.ValueTypeId = entityTypeAttribute.ValueTypeId;

                _eavContext.SaveChanges();

                return Ok();
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
                var entityTypeAttributeData = _eavContext.EntityTypeAttributes
                    .SingleOrDefault(a => a.Id == id);

                if (entityTypeAttributeData == null)
                {
                    return NotFound();
                }

                // TODO: check data for before allowing these updates
                var attributesCount = _eavContext.Attributes.Count(a => a.EntityTypeAttributeId == id);

                if (attributesCount > 0)
                {
                    return BadRequest($"This attribute type has ${attributesCount} attributes; delete them first.");
                }

                _eavContext.EntityTypeAttributes.Remove(entityTypeAttributeData);

                _eavContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        private string Validate(EntityTypeAttribute entityTypeAttribute)
        {
            var errors = new List<string>();

            var entityType = _eavContext.EntityTypes
                .SingleOrDefault(a => a.Id == entityTypeAttribute.EntityTypeId);

            if (entityType == null)
            {
                errors.Add($"Entity type does not exists for EntityTypeId: {entityTypeAttribute.EntityTypeId}");
            }

            var valueType = _eavContext.ValueTypes
                .SingleOrDefault(a => a.Id == entityTypeAttribute.ValueTypeId);

            if (valueType == null)
            {
                errors.Add($"Value type does not exists for ValueTypeId: {entityTypeAttribute.ValueTypeId}");
            }

            return string.Join(",", errors);
        }
    }
}
