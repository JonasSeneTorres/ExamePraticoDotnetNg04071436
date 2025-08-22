using ExamePratico.Domain.Entities;
using ExamePratico.Domain.Interfaces;

namespace ExamePratico.Infra.Data.Repositories
{
    public class SeguradoRepository : RepositoryBase<Segurado>, ISeguradoRepository
    {
        public SeguradoRepository(ExamePraticoContext context) : base(context)
        {
        }
    }
}
