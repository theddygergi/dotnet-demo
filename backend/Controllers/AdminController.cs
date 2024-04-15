using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using backend.Context;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<UserIdentityExtra> _userManager;

        public AdminController(UserManager<UserIdentityExtra> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAdmin([FromBody] AdminCreationModel model)
        {
            // Check if the user is authenticated and authorized to create admin accounts
            // For simplicity, you can implement your own authorization logic here

            /*if (!User.Identity.IsAuthenticated || !User.IsInRole("Admin"))
            {
                return Forbid(); // Return 403 Forbidden if the user is not authenticated or authorized
            }*/

            // Create a new admin user
            var user = new UserIdentityExtra
            {
                UserName = model.Username,
                Email = model.Email,
                isAdmin = true // Set the isAdmin property to true for admin users
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok("Admin account created successfully.");
            }
            else
            {
                // If creating the admin account fails, return the error messages
                return BadRequest(result.Errors);
            }
        }
    }

    public class AdminCreationModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
