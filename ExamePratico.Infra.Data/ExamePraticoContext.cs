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
        }
    }
}
