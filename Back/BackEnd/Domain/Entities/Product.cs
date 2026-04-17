namespace Domain.Entities;

public class Product
{
    public int Id { get; set; }

    public string ProductName { get; set; } = "";

    public decimal ProductPrice { get; set; }

    public string Categories { get; set; } = "";

    public int Stock { get; set; }

    public string Image { get; set; } = "";

    public bool IsDelete { get; set; } = false;
}