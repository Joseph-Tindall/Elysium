using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Elysium.Server.Core.Models;

namespace Elysium.Server.Core.Controllers;

public class HomeController(ILogger<HomeController> logger) : Controller
{
    private readonly ILogger<HomeController> _logger = logger;

    public IActionResult Index() => View();

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error() => View(
        new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier }
    );
}