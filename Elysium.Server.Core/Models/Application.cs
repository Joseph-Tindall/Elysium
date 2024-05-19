﻿using System.ComponentModel.DataAnnotations;

namespace Elysium.Server.Core.Models;

public class Application
{
    [Key]
    public int Id { get; set; }
    public string? Path { get; set; }
    public string? Arguments { get; set; }
}