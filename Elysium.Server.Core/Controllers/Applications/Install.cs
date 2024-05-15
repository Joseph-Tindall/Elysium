using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Elysium.Server.Core.Controllers.Applications
{
    [Route("api/[controller]")]
    [ApiController]
    public class Install(ILogger<Install> logger) : ControllerBase
    {
        [HttpPost]
        public void OnPost()
        {
            logger.LogInformation("World");
        }
    }
}
