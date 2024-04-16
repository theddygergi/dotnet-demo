using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using backend.Context;
using System.Threading.Tasks;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;

        public AdminController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("createAdmin")]
        public async Task<ActionResult> CreateAdmin([FromBody] AdminCreationModel model)
        {
            var result = new Admin
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = model.Password,
            };


            await _context.Admins.AddAsync(result);
            await _context.SaveChangesAsync();

            return Ok(result);
        }

        [HttpPost("loginAdmin")]
        public async Task<ActionResult> LoginAdmin([FromBody] AdminCreationModel model)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Email == model.Email && a.PasswordHash == model.Password);
            if (admin == null) {
                return NotFound("Admin not found");
            }
            return Ok("Admin found");
        }

    }



    public class AdminCreationModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
