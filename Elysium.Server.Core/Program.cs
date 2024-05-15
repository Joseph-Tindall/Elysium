var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseHttpsRedirection();

System.Diagnostics.Debug.WriteLine("Hello world");
Console.WriteLine("The second world.");

app.Run();
