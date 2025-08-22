namespace ExamePratico.Domain.Interfaces
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Remove(TEntity entity);
        TEntity? GetById(int id);
        IEnumerable<TEntity> GetAll();
        void Dispose();
    }
}
