namespace ExamePratico.Application.DTOs
{
    public class SeguroDTO
    {

        public int SeguroId { get; set; }
        public int VeiculoId { get; set; }
        public string VeiculoMarca { get; set; } = string.Empty;
        public string VeiculoModelo { get; set; } = string.Empty;
        public decimal ValorDoVeiculo { get; set; }
        public decimal TaxaDeRisco { get; set; }
        public decimal PremioDoRisco { get; set; }
        public decimal PremioPuro { get; set; }
        public decimal PremioComercial { get; set; }
        public decimal ValorDoSeguro { get; set; }
        public int SeguradoId { get; set; }
        public string SeguradoNome { get; set; } = string.Empty;
        public string SeguradoCPF { get; set; } = string.Empty;
        public DateTime SeguradoDataNascimento { get; set; }
        public uint SeguradoIdade { get; set; } // calculada
        public DateTime DataCadastro { get; set; }
        public DateTime? DataUltimaAlteracao { get; set; }
    }
}
