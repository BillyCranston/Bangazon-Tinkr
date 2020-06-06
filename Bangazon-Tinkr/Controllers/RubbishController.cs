using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon_Tinkr.DataAccess;
using Bangazon_Tinkr.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace Bangazon_Tinkr.Controllers
{
    [Route("api/Rubbish")]
    [ApiController]
    public class RubbishController : ControllerBase
    {
        RubbishRepo _rubbishRepository;
        UserRepo _usersRepository;

        public RubbishController(RubbishRepo repository, UserRepo usersRepository)
        {
            _rubbishRepository = repository;
            _usersRepository = usersRepository;
        }

       
        // api/Rubbish/2
        [HttpGet("{rubbishId}")]
        public IActionResult GetRubbishById(int rubbishId)
        {
            var singleRubbish = _rubbishRepository.getSingleRubbish(rubbishId);
            if (singleRubbish != null)
            {
                return Ok(singleRubbish);
            }
            else return NotFound("That Rubbish does not exist.");
        }

        // api/Rubbish/
        [HttpGet]
        public IActionResult GetAllRubbish()
        {
            var allRubbish = _rubbishRepository.GetRubbish();
            if (allRubbish == null) return NotFound(" There is not any Rubbish in the inventory");

            return Ok(allRubbish);
        }
        // api/Rubbish/2/createRubbish
        [HttpPost("{userId}/createRubbish")]
        public IActionResult CreateNewRubbish(int userId, Rubbish rubbishToAdd)
        {
            var user =  _usersRepository.GetUserById(userId);
            if (user != null) {
                var newRubbish = _rubbishRepository.CreateRubbish(userId, rubbishToAdd);
                return Created("", newRubbish);
            }
            return NotFound("User Not Found");
        }

    }
}