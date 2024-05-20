using Microsoft.AspNetCore.Mvc;
using Elysium.Server.Core.Models;

namespace Elysium.Server.Core.Controllers.Applications;

[Route("api/v1/applications/[controller]")]
[ApiController]
public class Install(ILogger<Install> logger) : Controller
{
    [HttpPost]
    public IActionResult ReadFromBody([FromBody] Application model)
    {
        logger.LogInformation("Hello world!");
        var message = $"Application Data => Path: {model.Path}, Arguments: {model.Arguments}";
        return Ok(message);
    }
}