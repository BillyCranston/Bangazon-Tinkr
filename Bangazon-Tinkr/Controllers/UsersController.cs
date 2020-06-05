using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Bangazon_Tinkr.Models;
using Bangazon_Tinkr.DataAccess;

namespace Bangazon_Tinkr.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepo _userRepository;

        public UsersController(UserRepo repository)
        {
            _userRepository = repository;
        }

        //api/User
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _userRepository.GetAll();
            var isEmpty = !allUsers.Any();
            if (isEmpty) return NotFound("There are no users!");

            return Ok(allUsers);
        }

        //api/User
        [HttpPost]
        public IActionResult CreateNewUser(User userToAdd)
        {
            var existingUser = _userRepository.GetUserByAddress(userToAdd.StreetAddress);
            if (existingUser == null)
            {
                var newUser = _userRepository.Add(userToAdd);
                return Created("", newUser);
            }
            else
            {
                return NotFound("A user already exists with this address. Please login.");
            }
        }

        //api/User
        [HttpDelete]
        public IActionResult DeleteUser(int userIDToDelete)
        {
            var existingUser = _userRepository.GetUserById(userIDToDelete);
            if (existingUser != null)
            {
                _userRepository.DeleteUserAccount(userIDToDelete);
            }
            else
            {
                return NotFound("No user currently exists with that Id.");
            }
        }


    }
}
