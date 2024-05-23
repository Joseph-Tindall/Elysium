using Elysium.Server.Core.Data;
using Elysium.Server.Core.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace Elysium.Server.Core.Models;

public abstract class Seed
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new CoreDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<CoreDbContext>>()
        );

        var changesMade = false;

        if (!context.Applications.Any())
        {
            context.Applications.AddRange(
                new Application
                {
                    Id = 0,
                    Path = "Test",
                    Arguments = "/s"
                }
            );

            changesMade = true;
        }
        
        if (!context.ConditionScripts.Any())
        {
            context.ConditionScripts.AddRange(
                new Conditions.Script
                {
                    Id = 0,
                    Name = "Always true.",
                    SuccessCodes = [0],
                    FailureCodes = [1],
                    Invert = false,
                    Type = ScriptTypes.PowerShell,
                    Hypothesis = "Exit 0"
                }
            );

            changesMade = true;
        }

        if (changesMade) context.SaveChanges();
    }
}