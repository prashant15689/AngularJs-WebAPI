using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPICore.Contexts;

namespace WebAPICore.Controllers
{
    [ApiController, Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly CompanyContext DataContext;

        public UserController(CompanyContext companyContext)
        {
            DataContext = companyContext;
        }

        [HttpGet, Route("user")]
        public async Task<IActionResult> GetUsers()
        {
            var userList = await DataContext.User.ToListAsync();
            return new JsonResult(new { code = HttpStatusCode.OK, message = "User list.", data = userList });            
        }
    }
}