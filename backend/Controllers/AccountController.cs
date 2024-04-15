using backend.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

public class AccountController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public AccountController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet]
    public IActionResult RegisterAdmin()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> RegisterAdmin(RegisterViewModel model)
    {
        if (ModelState.IsValid)
        {
            var admin = new Admin { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(admin, model.Password);
            if (result.Succeeded)
            {
                // Add additional admin-specific logic here
                return RedirectToAction("Index", "AdminDashboard");
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }
        return View(model);
    }

    [HttpGet]
    public IActionResult RegisterUser()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> RegisterUser(RegisterViewModel model)
    {
        if (ModelState.IsValid)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                // Add additional user-specific logic here
                return RedirectToAction("Index", "UserDashboard");
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
        }
        return View(model);
    }
}

public class RegisterViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }
}