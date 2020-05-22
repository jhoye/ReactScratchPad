using System;
using System.Collections.Generic;
using System.Linq;
using DemoB.Models;
using Microsoft.AspNetCore.Mvc;
using ValueType = DemoB.Models.Meta.ValueType;

namespace DemoB.Controllers.Meta
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
