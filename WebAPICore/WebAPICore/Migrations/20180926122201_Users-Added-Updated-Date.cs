using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPICore.Migrations
{
    public partial class UsersAddedUpdatedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "User");
        }
    }
}
