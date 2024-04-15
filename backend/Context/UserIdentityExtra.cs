using Microsoft.AspNetCore.Identity;

namespace backend.Context
{
    public class UserIdentityExtra : IdentityUser
    {
        public bool isAdmin { get; set; } = false;

        
    }
}
