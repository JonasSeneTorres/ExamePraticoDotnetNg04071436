using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ExamePratico.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Segurados",
                schema: "dbo",
                columns: table => new
                {
                    SeguradoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CPF = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataUltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Segurados", x => x.SeguradoId);
                });

            migrationBuilder.CreateTable(
                name: "Veiculos",
                schema: "dbo",
                columns: table => new
                {
                    VeiculoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ValorDoVeiculo = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Marca = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Modelo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataUltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Veiculos", x => x.VeiculoId);
                });

            migrationBuilder.CreateTable(
                name: "Seguros",
                schema: "dbo",
                columns: table => new
                {
                    SeguroId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeguradoId = table.Column<int>(type: "int", nullable: false),
                    VeiculoId = table.Column<int>(type: "int", nullable: false),
                    Lucro = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    MargemSeguranca = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DataUltimaAlteracao = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seguros", x => x.SeguroId);
                    table.ForeignKey(
                        name: "FK_Seguros_Segurados_SeguradoId",
                        column: x => x.SeguradoId,
                        principalSchema: "dbo",
                        principalTable: "Segurados",
                        principalColumn: "SeguradoId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Seguros_Veiculos_VeiculoId",
                        column: x => x.VeiculoId,
                        principalSchema: "dbo",
                        principalTable: "Veiculos",
                        principalColumn: "VeiculoId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Segurados",
                columns: new[] { "SeguradoId", "CPF", "DataCadastro", "DataNascimento", "DataUltimaAlteracao", "Nome" },
                values: new object[,]
                {
                    { 1, "123.456.789-00", new DateTime(2025, 8, 27, 4, 55, 41, 490, DateTimeKind.Local).AddTicks(1834), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "João Silva" },
                    { 2, "987.654.321-00", new DateTime(2025, 8, 27, 4, 55, 41, 490, DateTimeKind.Local).AddTicks(1839), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Maria Oliveira" }
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "Veiculos",
                columns: new[] { "VeiculoId", "DataCadastro", "DataUltimaAlteracao", "Marca", "Modelo", "ValorDoVeiculo" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 8, 27, 4, 55, 41, 490, DateTimeKind.Local).AddTicks(1578), null, "Toyota", "Corolla", 80000m },
                    { 2, new DateTime(2025, 8, 27, 4, 55, 41, 490, DateTimeKind.Local).AddTicks(1616), null, "Honda", "Civic", 85000m },
                    { 3, new DateTime(2025, 8, 27, 4, 55, 41, 490, DateTimeKind.Local).AddTicks(1619), null, "Ford", "Focus", 75000m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Seguros_SeguradoId",
                schema: "dbo",
                table: "Seguros",
                column: "SeguradoId");

            migrationBuilder.CreateIndex(
                name: "IX_Seguros_VeiculoId",
                schema: "dbo",
                table: "Seguros",
                column: "VeiculoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Seguros",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Segurados",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Veiculos",
                schema: "dbo");
        }
    }
}
