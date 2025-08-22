namespace ExamePratico.Domain.Entities
{
    public class Veiculo
    {
        private decimal valorDoVeiculo;

        public int VeiculoId { get; set; }
        public decimal ValorDoVeiculo
        {
            get{ return this.valorDoVeiculo; }

            set
            {
                // O valor do veículo deve ser um valor positivo
                this.valorDoVeiculo = 0 < value ? value : 0;
            }
        }

        public string Marca { get; set; } = string.Empty;
        public string Modelo { get; set; } = string.Empty;
        public DateTime DataCadastro { get; set; }
        public DateTime? DataUltimaAlteracao { get; set; }
    }
}
