using ExamePratico.Domain.Entities;
using ExamePratico.Domain.Interfaces;

namespace ExamePratico.Infra.Data.Repositories
{
    public class VeiculoRepository : RepositoryBase<Veiculo>, IVeiculoRepository
    {
        public VeiculoRepository(ExamePraticoContext context) : base(context)
        {
        }
    }
}
