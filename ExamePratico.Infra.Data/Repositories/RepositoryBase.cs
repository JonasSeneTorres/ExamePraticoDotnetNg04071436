using ExamePratico.Domain.Interfaces;

namespace ExamePratico.Infra.Data.Repositories
{
    public class RepositoryBase<TEntity> : IDisposable, IRepositoryBase<TEntity> where TEntity : class
    {
        protected readonly ExamePraticoContext _db;

        public RepositoryBase(ExamePraticoContext context)
        {
            _db = context;
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _db.Set<TEntity>().ToList();
        }

        public TEntity? GetById(int id)
        {
            return _db.Set<TEntity>().Find(id);
        }

        public void Add(TEntity entity)
        {
            _db.Add(entity);
            _db.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _db.SaveChanges();
        }

        public void Remove(TEntity entity)
        {
            _db.Set<TEntity>().Remove(entity);
            _db.SaveChanges();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
