using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using DemoA.Models.Eav;
using ValueType = DemoA.Models.Eav.Meta.ValueType;

namespace DemoA.Controllers.Eav.Meta
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValueTypesController : ControllerBase
    {
        private readonly EavContext _eavContext;

        public ValueTypesController(EavContext eavContext)
        {
            _eavContext = eavContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ValueType>> Get()
        {
            try
            {
                return Ok(_eavContext.ValueTypes.ToList());
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
