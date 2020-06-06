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

        // api/User/PaymentTypes/3
        [HttpGet("PaymentTypes/{paymentTypeId}")]
        public IActionResult GetSinglePaymentTypeById(int paymentTypeId)
        {
            var paymentType = _userRepository.GetPaymentTypeById(paymentTypeId);

            if (paymentType == null) return NotFound("No such payment type found");

            return Ok(paymentType);
        }
    }
}
