using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Elysium.Server.Presentation.Models.Enums;

namespace Elysium.Server.Presentation.Models.Conditions;

public class Script
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public List<int> SuccessCodes { get; set; } = [0];
    public List<int> FailureCodes { get; set; } = [1];
    public bool Invert { get; set; }
    public ScriptTypes Type { get; set; } = ScriptTypes.PowerShell;
    [DisplayName("Minimum Version")]
    public string? MinimumVersion { get; set; } = null;
    public string? Hypothesis { get; set; }
}