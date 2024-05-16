namespace Elysium.Server.Core.Models;

public class Application
{
    public int Id { get; init; }
    public string? Name { get; init; }
    public string? Path { get; init; }
    public string? InstallCommand { get; init; }
    public string? Arguments { get; init; }
}