﻿using System;
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
    }
}
