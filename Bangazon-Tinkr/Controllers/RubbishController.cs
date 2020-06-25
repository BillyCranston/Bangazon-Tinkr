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

        // api/Rubbish/User/1
        [HttpGet("User/{userId}")]
        public IActionResult GetAllRubbishByUserId(int userId)
        {
            var allRubbishByUser = _rubbishRepository.GetRubbishByUserId(userId);
            if (allRubbishByUser == null) return NotFound(" This user has no rubbish available for sale.");

            return Ok(allRubbishByUser);
        }

        // api/Rubbish/User/1/Inventory
        [HttpGet("User/{userId}/Inventory")]
        public IActionResult GetRubbishInventoryByUserId(int userId)
        {
            var RubbishInventoryByUser = _rubbishRepository.RubbishInventoryByUserId(userId);
            if (RubbishInventoryByUser == null) return NotFound("This user has no rubbish available in their inventory.");

            return Ok(RubbishInventoryByUser);
        }

        // api/Rubbish/User/1/toShip
        [HttpGet("User/{userId}/toShip")]
        public IActionResult GetRubbishToShipByUserId(int userId)
        {
            var RubbishToShip = _rubbishRepository.RubbishToShipByUserId(userId);
            if (RubbishToShip == null) return NotFound("There's no rubbish that needs to be shipped at the moment.");

            return Ok(RubbishToShip);
        }

        // api/Rubbish/User/1/TotalSales
        [HttpGet("User/{userId}/TotalSales")]
        public IActionResult GetTotalSalesByUserId(int userId)
        {
            var validUser = _usersRepository.GetUserById(userId);
            if (validUser != null)
            {
                var totalSales = _rubbishRepository.returnTotalSalesByUserId(userId);
                return Ok(totalSales);
            }
            return NotFound("That user does not exist");
        }

        // api/Rubbish/User/1/SalesThisMonth
        [HttpGet("User/{userId}/SalesThisMonth")]
        public IActionResult TotalSalesThisMonthByUserId(int userId)
        {
            var validUser = _usersRepository.GetUserById(userId);
            if (validUser != null)
            {
                var totalSalesThisMonth = _rubbishRepository.returnTotalSalesThisMonth(userId);
                return Ok(totalSalesThisMonth);
            }
            return NotFound("That user does not exist");
        }

        // api/Rubbish/User/1/AverageSale
        [HttpGet("User/{userId}/AverageSale")]
        public IActionResult GetAverageSalePerItem(int userId)
        {
            var validUser = _usersRepository.GetUserById(userId);
            if (validUser != null)
            {
                var avgSalePerRubbish = _rubbishRepository.returnAverageSalePerItem(userId);
                return Ok(avgSalePerRubbish);
            }
            return NotFound("That user does not exist");
        }

        // api/Rubbish/createRubbish
        [HttpPost]
        public IActionResult CreateNewRubbish(Rubbish rubbishToAdd)
        {
            var newRubbish = _rubbishRepository.CreateRubbish(rubbishToAdd);
            return Created("", newRubbish);
        }
        

        // api/Rubbish/Category/{categoryId}
        [HttpGet("Category/{categoryId}")]
        public IActionResult GetAllRubbishByCategory(int categoryId)
        {
            var rubbishByCategory = _rubbishRepository.GetAllRubbishByCategoryId(categoryId);
            //var isEmpty = !rubbishByCategory.Any();
            //if (isEmpty) return NotFound("Sorry, there is currently no rubbish available in that category.");

            return Ok(rubbishByCategory);
        }

        // api/Rubbish/{rubbishId}
        [HttpDelete("{rubbishId}")]
        public IActionResult DeleteRubbishById(int rubbishId)
        {
            var isValidRubbish = _rubbishRepository.getSingleRubbish(rubbishId);
            if (isValidRubbish != null)
            {
                var deletedRubbish = _rubbishRepository.DeleteRubbish(rubbishId);
                return Ok("The rubbish has been successfully deleted.");
            }
            return NotFound("That rubbish does not exist and could not be deleted");
        }

        // api/Rubbish/
        [HttpPut]
        public IActionResult UpdateRubbish(Rubbish rubbishToUpdate)
        {
            var isValidRubbish = _rubbishRepository.getSingleRubbish(rubbishToUpdate.RubbishId);
            if (isValidRubbish != null)
            {
                var updatedRubbish = _rubbishRepository.Update(rubbishToUpdate);
                return Ok(rubbishToUpdate);
            }
            return NotFound("That rubbish does not exist and could not be deleted");
        }

        // api/Rubbish/Categories
        [HttpGet("Categories")]
        public IActionResult GetAllCategories()
        {
            var allCategories = _rubbishRepository.GetCategories();
            if (allCategories == null) return NotFound("No categories found.");

            return Ok(allCategories);
        }
        
        // api/Rubbish/Name/shirt
        [HttpGet("Name/{name}")]
        public IActionResult GetRubbishByName(string name)
        {
            var RubbishByName = _rubbishRepository.getRubbishByName(name);
            if (RubbishByName == null) return NotFound("That Rubbish does not exist.");
            return Ok(RubbishByName);
            
         
        }

    }
}