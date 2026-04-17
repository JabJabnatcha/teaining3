using Domain.Entities;

namespace Domain.Interfaces;

public interface IProductRepository
{
    Task<List<Product>> GetAllAsync(int? limit = null);
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
}