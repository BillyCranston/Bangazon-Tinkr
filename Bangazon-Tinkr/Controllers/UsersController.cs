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

        //api/User/1
        [HttpDelete("{userIdToDelete}")]
        public IActionResult DeleteUser(int userIdToDelete)
        {
            var existingUser = _userRepository.GetUserById(userIdToDelete);
            if (existingUser != null)
            {
                _userRepository.DeleteUserAccount(userIdToDelete);
                return Ok($"User {userIdToDelete} and their payment info have successfully been deleted");
            }
            else { return NotFound("No user currently exists with that Id"); }
        }


        // api/User/2
        [HttpGet("{userId}")]
        public IActionResult GetSingleUserById(int userId)
        {
            var singleUserId = _userRepository.GetUserById(userId);
            var singleUserAccountIsDeleted = _userRepository.CheckIfUserAccountIsDeleted(userId);
            if (singleUserId != null)
            {
                return Ok(singleUserId);
            }
            else if (singleUserAccountIsDeleted != null)
            {
                return Ok("Account has been Deleted");
            }
            else return NotFound("That User does not exist.");
        }

        // api/User/PaymentTypes/3
        [HttpGet("PaymentTypes/{paymentTypeId}")]
        public IActionResult GetSinglePaymentTypeById(int paymentTypeId)
        {
            var paymentType = _userRepository.GetPaymentTypeById(paymentTypeId);

            if (paymentType == null) return NotFound("No such payment type found");

            return Ok(paymentType);
        }

        // api/User/1/PaymentTypes
        [HttpGet("{userId}/PaymentTypes")]
        public IActionResult GetAllPaymentTypes(int userId)
        {
            var result = GetSingleUserById(userId);
            var okActionResult = result as OkObjectResult;

            if (okActionResult != null && okActionResult.Value as User != null)
            {
                var paymentTypes = _userRepository.GetPaymentTypesByUserId(userId);
                if (paymentTypes.Any())
                {
                    return Ok(paymentTypes);
                }
                else return NotFound("No payment types found for that User.");
            }
            else return result;

        }

        // api/User/PaymentTypes
        [HttpPost("PaymentTypes")]
        public IActionResult AddPaymentType(PaymentType paymentType)
        {
            var existingUser = _userRepository.GetUserById(paymentType.UserId);
            var existingPaymentType = _userRepository.GetPaymentTypeByAccountNo(paymentType.AccountNo);
            if (existingPaymentType == null && existingUser != null)
            {
                var newPaymentType = _userRepository.AddPaymentType(paymentType);
                return Created("", newPaymentType);
            }
            else if (existingUser == null)
            {
                return NotFound("That User does not exist");
            }
            else
            {
                return NotFound("A payment type already exists with this account number.");
            }
        }
    }
}
