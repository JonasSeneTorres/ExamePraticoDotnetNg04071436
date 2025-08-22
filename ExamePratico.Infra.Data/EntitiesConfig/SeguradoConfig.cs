using ExamePratico.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExamePratico.Infra.Data.EntitiesConfig
{
    public class SeguradoConfig : IEntityTypeConfiguration<Segurado>
    {
        public void Configure(EntityTypeBuilder<Segurado> builder)
        {
            builder.HasKey(s => s.SeguradoId);

            builder.Property(s => s.Nome)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(s => s.CPF)
                .HasMaxLength(11)
                .IsRequired();

            builder.Property(s => s.DataNascimento)
                .IsRequired();

            builder.Property(s => s.DataCadastro)
                .IsRequired();

            builder.Ignore(s => s.Idade); // Propriedade calculada não vai para o banco
        }
    }
}
