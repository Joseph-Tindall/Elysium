using Microsoft.EntityFrameworkCore;

namespace Elysium.Server.Core.Data;

public class ApplicationContext(DbContextOptions<ApplicationContext> options) : DbContext(options)
{
    public DbSet<Models.Application> Application { get; init; }
}