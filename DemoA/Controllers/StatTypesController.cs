using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoA.Models;

namespace DemoA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatTypesController : ControllerBase
    {
        private readonly StatsContext _statsContext;

        public StatTypesController(StatsContext statsContext)
        {
            _statsContext = statsContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StatType>> Get()
        {
            try
            {
                var statTypes = _statsContext.StatTypes
                    .Include(a => a.Stats)
                    .ToList();
                
                return Ok(statTypes);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<StatType> Get(Guid id)
        {
            try
            {
                var statTypeData = _statsContext.StatTypes
                    .Include(a => a.Stats)
                    .SingleOrDefault(a => a.Id == id);

                if (statTypeData == null)
                {
                    return NotFound();
                }

                return Ok(statTypeData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public ActionResult<StatType> Post([FromBody] StatType statType)
        {
            try
            {
                var statTypeData = new StatType
                {
                    Id = Guid.NewGuid(),
                    Name = string.IsNullOrWhiteSpace(statType.Name)
                        ? $"stat type {statType.Id}"
                        : statType.Name,
                    ValueType = statType.ValueType
                };

                _statsContext.StatTypes.Add(statTypeData);

                _statsContext.SaveChanges();

                return Ok(statTypeData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] StatType statType)
        {
            try
            {
                var statTypeData = _statsContext.StatTypes.SingleOrDefault(a => a.Id == statType.Id);

                if (statTypeData == null)
                {
                    return NotFound();
                }

                if (string.IsNullOrWhiteSpace(statType.Name)) {
                    statTypeData.Name = $"stat type {statType.Id}";
                } else {
                    statTypeData.Name = statType.Name;
                }

                statTypeData.ValueType = statType.ValueType;

                _statsContext.SaveChanges();

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
                var statTypeData = _statsContext.StatTypes.SingleOrDefault(a => a.Id == id);

                if (statTypeData == null)
                {
                    return NotFound();
                }

                var statsCount = statTypeData.Stats?.Count();

                if (statsCount > 0)
                {
                    return BadRequest($"This stat type has ${statsCount} stats; delete them first.");
                }

                _statsContext.StatTypes.Remove(statTypeData);

                _statsContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
