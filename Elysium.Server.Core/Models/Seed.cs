using Elysium.Server.Core.Data;
using Microsoft.EntityFrameworkCore;

namespace Elysium.Server.Core.Models;

public class Seed
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new CoreDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<CoreDbContext>>()
        );
        
        
        if (context.Applications.Any()) return;
        
        context.Applications.AddRange(
            new Application
            {
                Id = 0,
                Path = "Test",
                Arguments = "/s"
            }
        );
        
        context.SaveChanges();
    }
}