using Microsoft.EntityFrameworkCore;
using Elysium.Server.Presentation.Models;

namespace Elysium.Server.Presentation.Data;

public class CoreDbContext(DbContextOptions<CoreDbContext> options) : DbContext(options)
{
    public DbSet<Application> Applications { get; init; }
    public DbSet<Models.Conditions.Script> ConditionScripts { get; init; }
}