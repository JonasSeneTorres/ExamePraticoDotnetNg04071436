using ExamePratico.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExamePratico.Infra.Data.EntitiesConfig
{
    public class SeguroConfig : IEntityTypeConfiguration<Seguro>
    {
        public void Configure(EntityTypeBuilder<Seguro> builder)
        {
            builder.HasKey(s => s.SeguroId);

            builder.Property(s => s.Lucro)
                .HasPrecision(18, 2);

            builder.Property(s => s.MargemSeguranca)
                .HasPrecision(18, 2);

            builder.Property(s => s.DataCadastro)
                .IsRequired();

            // Relacionamentos
            builder.HasOne(s => s.Segurado)
                   .WithMany()
                   .HasForeignKey("SeguradoId")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(s => s.Veiculo)
                   .WithMany()
                   .HasForeignKey("VeiculoId")
                   .OnDelete(DeleteBehavior.Cascade);

            // Ignorar propriedades calculadas
            builder.Ignore(s => s.ValorDoVeiculo);
            builder.Ignore(s => s.TaxaDeRisco);
            builder.Ignore(s => s.PremioDoRisco);
            builder.Ignore(s => s.PremioPuro);
            builder.Ignore(s => s.PremioComercial);
            builder.Ignore(s => s.ValorDoSeguro);
        }
    }
}
