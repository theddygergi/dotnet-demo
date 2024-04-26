using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    [HttpGet("GetAllUsers")]
    public async Task<ActionResult<List<IdentityUser>>> GetAllUsers()
    {
        var users = await _userManager.Users.ToListAsync();
        return Ok(users);
    }

    [HttpDelete("DeleteUser/{id}")]
    public async Task<ActionResult> DeleteUser([FromRoute] string id)
    {

        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return NotFound("User not found");
        }

        
        await _userManager.DeleteAsync(user);
        return Ok("User deleted");
    }

    [HttpGet("GetNbUsers")]
    public async Task<ActionResult> GetNbUsers()
    {
        var count = await _userManager.Users.CountAsync();
        return Ok(count);
    }
}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}
