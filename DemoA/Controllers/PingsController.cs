using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DemoA.Services;

namespace DemoA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PingsController : ControllerBase
    {
        private readonly ILogger<PingsController> _logger;

        private readonly IMessageService _messageService;

        public PingsController(
            ILogger<PingsController> logger,
            IMessageService messageService)
        {
            _logger = logger;
            _messageService = messageService;
        }

        [HttpGet]
        public string Get()
        {
            return _messageService.Status;
        }

        [HttpPost]
        public string Post()
        {
            return _messageService.SendCommand();
        }
    }
}
