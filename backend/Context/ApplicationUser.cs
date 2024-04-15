using Microsoft.AspNetCore.Identity;

namespace backend.Context {

    public class ApplicationUser : IdentityUser
    {
        public bool isAdmin { get; set; } = false;
    }

    public class Admin : IdentityUser
    {
        public bool isAdmin { get; set; } = true;

    }
}
