using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon_Tinkr.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bangazon_Tinkr.Controllers
{
    [Route("api/RegisteredUser")]
    [ApiController]
    public class RegisteredUserController : FirebaseEnabledController
    {
        [HttpPost("register")]
        public IActionResult RegisterUser(RegisteredUser userToRegister)
        {
            //register the user

            return Ok();
        }

        [HttpGet("current")]
        public IActionResult GetCurrentUser()
        {
            //pull user info from the database based on email or firebaseid or whatever other property

            return Ok(new { Email = UserEmail, FirebaseId = UserId });
        }
    }
}
