namespace Application.DTOs;

public class ProductDto
{
    public string ProductName { get; set; } = null!;
    public decimal ProductPrice { get; set; }
    public string Categories { get; set; } = null!;
    public int Stock { get; set; }
    public IFormFile? ImageFile { get; set; } = null!;
}