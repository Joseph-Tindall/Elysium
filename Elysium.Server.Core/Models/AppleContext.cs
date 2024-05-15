using Microsoft.EntityFrameworkCore;

namespace Elysium.Server.Core.Models;

public class AppleContext : DbContext
{
    public AppleContext(DbContextOptions<AppleContext> options) : base(options)
    {
        
    }

    public DbSet<AppleModel> Apples { get; set; } = null!;
}