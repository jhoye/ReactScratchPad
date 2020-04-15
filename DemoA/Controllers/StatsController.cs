using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoA.Models;

namespace DemoA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly StatsContext _statsContext;

        public StatsController(StatsContext statsContext)
        {
            _statsContext = statsContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Stat>> Get(Guid? statTypeId = null)
        {
            try
            {
                return Ok(
                    (statTypeId.HasValue
                        ? _statsContext.Stats.Where(a => a.StatType.Id == statTypeId.Value)
                        : _statsContext.Stats)
                    .Include(a => a.StatType)
                    .ToList()
                );
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Stat> Get(Guid id)
        {
            try
            {
                var statData = _statsContext.Stats
                    .Where(a => a.Id == id)
                    .Include(a => a.StatType)
                    .SingleOrDefault();

                if (statData == null)
                {
                    return NotFound();
                }

                return Ok(statData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost]
        public ActionResult<Stat> Post([FromBody] Stat stat)
        {
            try
            {
                StatType statType;

                var validationErrors = Validate(stat, out statType);

                if (validationErrors.Any())
                {
                    return BadRequest(string.Join(' ', validationErrors));
                }

                var statData = new Stat
                {
                    Id = Guid.NewGuid(),
                    StatType = statType,
                    Date = stat.Date,
                    Value = stat.Value
                };

                _statsContext.Stats.Add(statData);

                _statsContext.SaveChanges();

                return Ok(statData);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] Stat stat)
        {
            try
            {
                StatType statType;

                var validationErrors = Validate(stat, out statType);

                if (validationErrors.Any())
                {
                    return BadRequest(string.Join(' ', validationErrors));
                }

                var statData = _statsContext.Stats.SingleOrDefault(a => a.Id == stat.Id);

                if (statData == null)
                {
                    return NotFound();
                }

                statData.StatType = statType;
                statData.Date = stat.Date;
                statData.Value = stat.Value;

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
                var statData = _statsContext.Stats.SingleOrDefault(a => a.Id == id);

                if (statData == null)
                {
                    return NotFound();
                }

                _statsContext.Stats.Remove(statData);

                _statsContext.SaveChanges();

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        private List<string> Validate(Stat stat, out StatType statType)
        {
            statType = null;

            var errors = new List<string>();

            if (stat == null)
            {
                errors.Add("Stat is required.");
                return errors;
            }

            if (stat.Date == null)
            {
                errors.Add("Stat date is required.");
            }

            if (stat.StatType == null ||
                stat.StatType.Id == null)
            {
                errors.Add("Stat type is required.");
                return errors;
            }

            statType = _statsContext.StatTypes.SingleOrDefault(a => a.Id == stat.StatType.Id);

            if (statType == null)
            {
                errors.Add($"Stat type with id ${stat.StatType.Id} does not exist.");
            }

            if(_statsContext.Stats.Any(a => a.Id != stat.Id && (
                a.StatType.Id == stat.StatType.Id &&
                a.Date.Year == stat.Date.Year &&
                a.Date.Month == stat.Date.Month &&
                a.Date.Day == stat.Date.Day
            )))
            {
                errors.Add($"Another stat exists for date ${stat.Date:MM/dd/yyyy}.");
            }

            return errors;
        }
    }
}
