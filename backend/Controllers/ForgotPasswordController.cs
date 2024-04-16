using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mail;
using System.Web.Http;
using FromBodyAttribute = Microsoft.AspNetCore.Mvc.FromBodyAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;

namespace backend.Controllers
{
    public class ForgotPasswordController : ApiController
    {
        [HttpPost("fp")]
        public IHttpActionResult ForgotPassword([FromBody] MyForgotPasswordRequest request)
        {
            try
            {
                // Here you can generate a password reset token and send it to the user's email
                // For demonstration purposes, let's just send a dummy email
                SendPasswordResetEmail(request.Email);
                return Ok("Password reset instructions sent to your email.");
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error: {ex.Message}");
                return InternalServerError();
            }
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private void SendPasswordResetEmail(string email)
        {
            // Here you would implement code to send an email with the password reset instructions
            // This is just a dummy implementation
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("imeddygergi@gmail.com", "gohome123$A"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(email),
                Subject = "Password Reset Instructions",
                Body = "Here are your password reset instructions..."
            };

            mailMessage.To.Add(email);
            smtpClient.Send(mailMessage);
        }
    }

    public class MyForgotPasswordRequest
    {
        public string Email { get; set; }
    }
}