namespace ExamePratico.Domain.Entities
{
    public class Seguro
    {
        private decimal margemSeguranca = 0;

        public int SeguroId { get; set; }

        // 🔹 Chaves estrangeiras
        public int SeguradoId { get; set; }
        public int VeiculoId { get; set; }

        // 🔹 Navegações
        public Segurado? Segurado { get; set; } = null!;
        public Veiculo? Veiculo { get; set; } = null!;

        // 🔹 Propriedades persistidas
        public decimal Lucro { get; set; } = 0;

        public decimal MargemSeguranca
        {
            get { return this.margemSeguranca; }
            set { this.margemSeguranca = value > 0 ? value : 0; }
        }

        // 🔹 Propriedades calculadas (não mapeadas no banco)
        public decimal ValorDoVeiculo => Veiculo?.ValorDoVeiculo ?? 0;

        public decimal TaxaDeRisco => ValorDoVeiculo == 0 ? 0 : (ValorDoVeiculo * 5) / (2 * ValorDoVeiculo);

        public decimal PremioDoRisco => (TaxaDeRisco * ValorDoVeiculo)/100;

        public decimal PremioPuro => PremioDoRisco * (1 + (this.margemSeguranca / 100));

        public decimal PremioComercial => (1 + Lucro/100) * PremioPuro;

        public decimal ValorDoSeguro => PremioComercial;

        public DateTime DataCadastro { get; set; }
        public DateTime? DataUltimaAlteracao { get; set; }

        public static Seguro Calcular(decimal valorDoVeiculo, decimal lucro, decimal margemSeguranca)
        {
            var veiculo = new Veiculo { ValorDoVeiculo = valorDoVeiculo };

            var seguro = new Seguro
            {
                Veiculo = veiculo,
                Lucro = lucro,
                MargemSeguranca = margemSeguranca,
                DataCadastro = DateTime.Now
            };

            return seguro;
        }
    }
}
