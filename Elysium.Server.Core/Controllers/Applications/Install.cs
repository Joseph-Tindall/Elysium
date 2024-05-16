using Elysium.Server.Core.Data;
using Microsoft.AspNetCore.Mvc;

namespace Elysium.Server.Core.Controllers.Applications;

[Route("api/v1/applications/[controller]")]
[ApiController]
public class Install(ILogger<Install> logger, ApplicationContext context) : ControllerBase
{
    [HttpPost]
    public void OnPost()
    {
        logger.LogInformation("World");
    }
}