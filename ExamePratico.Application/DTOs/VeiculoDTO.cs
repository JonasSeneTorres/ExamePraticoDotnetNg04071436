namespace ExamePratico.Application.DTOs
{
    public class VeiculoDTO
    {
        public int VeiculoId { get; set; }
        public string Marca { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public decimal ValorDoVeiculo { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime? DataUltimaAlteracao { get; set; }
    }
}
