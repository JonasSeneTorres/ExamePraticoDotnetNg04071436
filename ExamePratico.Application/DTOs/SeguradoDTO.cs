namespace ExamePratico.Application.DTOs
{
    public class SeguradoDTO
    {
        public int SeguradoId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public uint Idade { get; set; } // calculada
        public DateTime DataCadastro { get; set; }
        public DateTime? DataUltimaAlteracao { get; set; }
    }
}
