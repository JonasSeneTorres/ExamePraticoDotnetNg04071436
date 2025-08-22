using ExamePratico.Domain.Entities;
using ExamePratico.Domain.Interfaces;

namespace ExamePratico.Infra.Data.Repositories
{
    public class SeguroRepository : RepositoryBase<Seguro>, ISeguroRepository
    {
        public SeguroRepository(ExamePraticoContext context) : base(context)
        {
        }
    }
}
