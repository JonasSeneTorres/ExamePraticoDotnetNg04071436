using ExamePratico.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExamePratico.Infra.Data.EntitiesConfig
{
    public class VeiculoConfig : IEntityTypeConfiguration<Veiculo>
    {
        public void Configure(EntityTypeBuilder<Veiculo> builder)
        {
            builder.HasKey(v => v.VeiculoId);

            builder.Property(v => v.Marca)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(v => v.Modelo)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(v => v.ValorDoVeiculo)
                .HasPrecision(18, 2);

            builder.Property(v => v.DataCadastro)
                .IsRequired();
        }
    }
}
