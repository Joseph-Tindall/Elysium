using Microsoft.EntityFrameworkCore;
using Elysium.Server.Core.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

//builder.Services.AddDbContext<Context>(opt => opt.UseInMemoryDatabase("Apples"));

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