using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Elysium.Server.Core.Migrations
{
    /// <inheritdoc />
    public partial class Script : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MinimumVersion",
                table: "ConditionScripts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MinimumVersion",
                table: "ConditionScripts");
        }
    }
}
