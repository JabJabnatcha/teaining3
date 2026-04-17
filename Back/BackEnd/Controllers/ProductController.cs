using Microsoft.AspNetCore.Mvc;
using Application.Services;
using Application.DTOs;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _service;

    public ProductController(ProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _service.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductDto dto)
    {
        string imagePath = "";

        if (dto.ImageFile != null && dto.ImageFile.Length > 0)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(dto.ImageFile.FileName);
            var folderPath = Path.Combine("wwwroot/images");

            Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.ImageFile.CopyToAsync(stream);
            }

            imagePath = "/images/" + fileName;
        }

        await _service.CreateAsync(dto, imagePath);

        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] ProductDto dto) 
    {
        string imagePath = "";

        if (dto.ImageFile != null && dto.ImageFile.Length > 0)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(dto.ImageFile.FileName);
            var folderPath = Path.Combine("wwwroot/images");

            Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.ImageFile.CopyToAsync(stream);
            }

            imagePath = "/images/" + fileName;
        }

        await _service.UpdateAsync(id, dto, imagePath);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) 
    {
        await _service.DeleteAsync(id);
        return Ok();
    }
}