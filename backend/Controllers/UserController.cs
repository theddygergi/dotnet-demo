using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;

    public UserController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user == null)
        {
            // User with the provided email not found
            return NotFound("User no");
        }

        // Validate user's password
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);

        if (!isPasswordValid)
        {
            // Incorrect password
            return Unauthorized();
        }

        // Password is valid, return the user's Id
        return Ok(new { Id = user.Id });
    }
}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}
