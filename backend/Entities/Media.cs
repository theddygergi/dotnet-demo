using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;
using backend.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Entities
{
    public class Admin
    {
        [Key]
        public int AdminId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public bool isAdmin { get; set; } = true;

        public void SetPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                PasswordHash = Convert.ToBase64String(hashedBytes);
            }
        }

        // Method to verify login
        public bool VerifyPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                string hashedInput = Convert.ToBase64String(hashedBytes);
                return PasswordHash == hashedInput;
            }
        }
    }




    public class Media
    {
        [Key]
        public int MediaId { get; set; }
        [Required]
        public string MediaType { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Creator { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Cover { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public DateTime DateAdded { get; set; }


    }

    public class Book : Media
    {
        [Required]
        public int NbPages { get; set; }
    }

    public class Movie : Media
    {
        [Required]
        public int DurationMinutes { get; set; }
    }

    public class UserCart
    {
        [Key]
        public int CartItemId { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; } // Change from int to string

        [ForeignKey("MediaId")]
        public int MediaId { get; set; }

        // Use IdentityUser instead of User
        public IdentityUser User { get; set; }

        public Media Media { get; set; }
        public int Ranking { get; set; }
        public DateTime DateAdded { get; set; }
    }
}