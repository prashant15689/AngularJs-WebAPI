using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPICore.Contexts;
using WebAPICore.Models;

namespace WebAPICore.Controllers
{
    [ApiController, Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly CompanyContext DataContext;

        public AccountController(CompanyContext companyContext)
        {
            DataContext = companyContext;
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel registrationModel)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new { code = HttpStatusCode.BadRequest, message = "Invalid request.", data = "" });
            }
            else
            {
                var IsExists = DataContext.User.Where(u => u.Email.ToLower().Equals(registrationModel.Email.ToLower()) ||
                  u.PhoneNumber.Equals(registrationModel.PhoneNumber)).Count() > 0;

                if (IsExists)
                {
                    return new JsonResult(new { code = HttpStatusCode.Ambiguous, message = "Email/phone number already exists.", data = "" });
                }

                Users objUser = new Users()
                {
                    Name = registrationModel.Name,
                    Email = registrationModel.Email,
                    PhoneNumber = registrationModel.PhoneNumber,
                    Password = registrationModel.Password
                };

                DataContext.User.Add(objUser);
                await DataContext.SaveChangesAsync();

                return new JsonResult(new { code = HttpStatusCode.OK, message = "You have successfully registered.", data = objUser });
            }
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new { code = HttpStatusCode.BadRequest, message = "Invalid request.", data = "" });
            }
            else
            {
                var loggedUser = DataContext.User.FirstOrDefault(u => u.Email.ToLower().Equals(loginModel.Email.ToLower()) &&
                  u.Password.Equals(loginModel.Password));

                if (loggedUser == null)
                {
                    return new JsonResult(new { code = HttpStatusCode.Unauthorized, message = "Login failed.", data = "" });
                }
                else
                {
                    return new JsonResult(new { code = HttpStatusCode.OK, message = "Login successful.", data = loggedUser });
                }
            }
        }

        [HttpPost, Route("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel changePasswordModel)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new { code = HttpStatusCode.BadRequest, message = "Invalid request.", data = "" });
            }
            else
            {
                var loggedUser = DataContext.User.FirstOrDefault(u => u.Email.ToLower().Equals(changePasswordModel.Email.ToLower()) &&
                  u.Password.Equals(changePasswordModel.OldPassword));

                if (loggedUser == null)
                {
                    return new JsonResult(new { code = HttpStatusCode.Unauthorized, message = "Invalid old passowrd.", data = "" });
                }
                else
                {
                    loggedUser.Password = changePasswordModel.NewPassword;
                    loggedUser.UpdatedDate = DateTime.UtcNow;
                    await DataContext.SaveChangesAsync();

                    return new JsonResult(new { code = HttpStatusCode.OK, message = "Password successfully changed.", data = loggedUser });
                }
            }
        }
    }
}