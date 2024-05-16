using Microsoft.EntityFrameworkCore;
using Elysium.Server.Core.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddDbContext<ApplicationContext>(
    options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("ApplicationContext")
    )
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Logger.LogInformation("Starting application.");
app.Run();