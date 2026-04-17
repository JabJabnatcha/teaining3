using Domain.Entities;
using Domain.Interfaces;
using Application.DTOs;

namespace Application.Services;

public class ProductService
{
    private readonly IProductRepository _repo;

    public ProductService(IProductRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        return await _repo.GetAllAsync(10); // Limitไว้ที่ 10
    }

    public async Task<Product?> GetByIdAsync(int id) 
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task CreateAsync(ProductDto dto, string imagePath)
    {
        var product = new Product
        {
            // Id ถูก generate โดย DB/EF Core เอง
            ProductName = dto.ProductName,
            ProductPrice = dto.ProductPrice,
            Categories = dto.Categories,
            Stock = dto.Stock,
            Image = imagePath 
        };

        await _repo.AddAsync(product);
    }

    public async Task UpdateAsync(int id, ProductDto dto, string imagePath) 
    {
        var product = await _repo.GetByIdAsync(id);
        if (product == null) return;

        product.ProductName = dto.ProductName;
        product.ProductPrice = dto.ProductPrice;
        product.Categories = dto.Categories;
        product.Stock = dto.Stock;

        if (!string.IsNullOrEmpty(imagePath))
        {
            product.Image = imagePath;
        }

        await _repo.UpdateAsync(product);
    }

    public async Task FixImagePathsAsync()
    {
        var products = await _repo.GetAllAsync();
        foreach (var product in products)
        {
            if (!string.IsNullOrEmpty(product.Image))
            {
                if (product.Image.Contains("/images//images/"))
                {
                    product.Image = product.Image.Replace("/images//images/", "/images/");
                }
                else if (product.Image == "test.png")
                {
                    product.Image = ""; 
                }
            }
        }
    }

    public async Task DeleteAsync(int id) 
    {
        await _repo.DeleteAsync(id);
    }
}