using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using DemoA.Models;

namespace DemoA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Statistic>> Get()
        {
            try
            {
                var stats = new List<Statistic>();

                var assembly = typeof(StatisticsController).GetTypeInfo().Assembly;

                using (var resourceStream = assembly.GetManifestResourceStream("DemoA.statistics.csv"))
                using (var reader = new StreamReader(resourceStream))
                {
                    do
                    {
                        var line = reader.ReadLine();

                        var values = line.Split(',');

                        if (values.Length == 3 &&
                            int.TryParse(values[0], out var year) &&
                            int.TryParse(values[1], out var month) &&
                            decimal.TryParse(values[2], out var value))
                        {
                            const int earliestYear = 1998;
                            const int earliestMonth = 1;
                            if ((year == earliestYear && month >= earliestMonth) || year > earliestYear)
                            {
                                stats.Add(new Statistic
                                {
                                    Id = Guid.NewGuid(),
                                    Date = new DateTime(year, month, 1),
                                    Value = value
                                });
                            }
                        }
                    }
                    while (!reader.EndOfStream);
                }

                return Ok(stats);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
