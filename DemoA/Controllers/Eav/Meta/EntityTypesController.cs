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
    public class EntityTypesController : ControllerBase
    {
        private readonly EavContext _eavContext;

        public EntityTypesController(EavContext eavContext)
        {
            _eavContext = eavContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<EntityType>> Get()
        {
            try
            {
                return Ok(_eavContext.EntityTypes.ToList());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<EntityType> Get(Guid id)
        {
            try
            {
                var data = _eavContext.EntityTypes
                    .Include(a => a.EntityTypeAttributes)
                    .Include(a => a.EntityTypeRelationships)
                    .Include(a => a.ReverseEntityTypeRelationships)
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
        public ActionResult<EntityType> Post([FromBody] EntityType entityType)
        {
            try
            {
                var entityTypeData = new EntityType
                {
                    Id = Guid.NewGuid(),
                    Name = string.IsNullOrWhiteSpace(entityType.Name)
                        ? $"entity type {entityType.Id}"
                        : entityType.Name
                };

                _eavContext.EntityTypes.Add(entityTypeData);

                _eavContext.SaveChanges();

                return Ok(entityTypeData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] EntityType entityType)
        {
            try
            {
                var entityTypeData = _eavContext.EntityTypes
                    .SingleOrDefault(a => a.Id == entityType.Id);

                if (entityTypeData == null)
                {
                    return NotFound();
                }

                entityTypeData.Name = string.IsNullOrWhiteSpace(entityType.Name)
                    ? $"entity type {entityType.Id}"
                    : entityType.Name;

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
                var entityTypeData = _eavContext.EntityTypes
                    .Include(a => a.EntityTypeAttributes)
                    .Include(a => a.EntityTypeRelationships)
                    .Include(a => a.ReverseEntityTypeRelationships)
                    .SingleOrDefault(a => a.Id == id);

                if (entityTypeData == null)
                {
                    return NotFound();
                }

                var entitiesCount = _eavContext.Entities.Count(a => a.EntityTypeId == id);

                if (entitiesCount > 0)
                {
                    return BadRequest($"This entity type has ${entitiesCount} entities; delete them first.");
                }

                var reverseEntityTypeRelationshipsCount = entityTypeData.ReverseEntityTypeRelationships.Count();

                if(reverseEntityTypeRelationshipsCount > 0)
                {
                    return BadRequest($"This entity type is used in ${reverseEntityTypeRelationshipsCount} reverse entity type relationships; delete them first.");
                }

                _eavContext.EntityTypeAttributes.RemoveRange(entityTypeData.EntityTypeAttributes);
                _eavContext.EntityTypeRelationships.RemoveRange(entityTypeData.EntityTypeRelationships);
                _eavContext.EntityTypes.Remove(entityTypeData);

                _eavContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
