using Microsoft.AspNetCore.Mvc;
using RedLegConstruction.EmailClient;
using RedLegConstruction.Models;

namespace RedLegConstruction.Controllers
{
    [ApiController]
    [Route("api/email")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailClient emailClient;

        public EmailController(IEmailClient emailClient)
        {
            this.emailClient = emailClient;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RequestCommand command)
        {
            try
            {
                var message =
                    @$"Hey Steve,
                    You have a new request. {command}.";
                await this.emailClient.Send(new string[] { "steven.macveigh@gmail.com", "tnlavay@gmail.com" }, "RedLeg Construction Request!", message);
                return Ok();
            }
            catch (Exception ex)
            {
                // I understand this is bad but do not want to set up logging.
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("This worked");
        }
    }
}
