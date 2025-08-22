using System.ComponentModel.DataAnnotations;

namespace ExamePratico.Domain.Entities
{
    public class Segurado
    {
        private DateTime hoje = DateTime.Now;

        public int SeguradoId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }

        public uint Idade
        {
            get
            {
                // Considerando que o ano tem 365 dias e 6 horas (0.25) para incluir anos bissextos.
                const double DiasPorAno = 365.25;
                double diasDeVida = (this.hoje - DataNascimento).TotalDays;
                return (uint)(diasDeVida / DiasPorAno);
            }
        }

        public DateTime DataCadastro { get; set; }
        public DateTime? DataUltimaAlteracao { get; set; }
    }
}
