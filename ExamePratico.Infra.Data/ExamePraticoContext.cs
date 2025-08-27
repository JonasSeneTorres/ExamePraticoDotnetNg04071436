using ExamePratico.Domain.Entities;
using ExamePratico.Infra.Data.EntitiesConfig;
using Microsoft.EntityFrameworkCore;

namespace ExamePratico.Infra.Data
{
    public class ExamePraticoContext : DbContext
    {
        public ExamePraticoContext(DbContextOptions<ExamePraticoContext> options)
             : base(options) { }

        public DbSet<Segurado> Segurados { get; set; }
        public DbSet<Seguro> Seguros { get; set; }
        public DbSet<Veiculo> Veiculos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");
            modelBuilder.ApplyConfiguration(new SeguradoConfig());
            modelBuilder.ApplyConfiguration(new VeiculoConfig());
            modelBuilder.ApplyConfiguration(new SeguroConfig());

            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                     .SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder
                .Entity<Veiculo>()
                .HasData(
                    new Veiculo
                    {
                        VeiculoId = 1,
                        Marca = "Toyota",
                        Modelo = "Corolla",
                        ValorDoVeiculo = 80000,
                        DataCadastro = DateTime.Now
                    },
                    new Veiculo
                    {
                        VeiculoId = 2,
                        Marca = "Honda",
                        Modelo = "Civic",
                        ValorDoVeiculo = 85000,
                        DataCadastro = DateTime.Now
                    },
                    new Veiculo
                    {
                        VeiculoId = 3,
                        Marca = "Ford",
                        Modelo = "Focus",
                        ValorDoVeiculo = 75000,
                        DataCadastro = DateTime.Now
                    }
                );

            modelBuilder
                .Entity<Segurado>()
                .HasData(
                    new Segurado
                    {
                        SeguradoId = 1,
                        Nome = "João Silva",
                        CPF = "123.456.789-00",
                        DataCadastro = DateTime.Now
                    },
                    new Segurado
                    {
                        SeguradoId = 2,
                        Nome = "Maria Oliveira",
                        CPF = "987.654.321-00",
                        DataCadastro = DateTime.Now
                    }
                );
        }
    }
}
