using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon_Tinkr.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Bangazon_Tinkr.Models;

namespace Bangazon_Tinkr.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrdersRepo _ordersRepository;
        UserRepo _usersRepository;
        public OrdersController(OrdersRepo repository, UserRepo usersRepository)
        {
            _ordersRepository = repository;
            _usersRepository = usersRepository;
        }
        //api/Order/{id}
        [HttpGet("{id}")]
        public IActionResult GetSingleOrderById(int id)
        {
            var validOrder = _ordersRepository.CheckForValidOrderId(id);
            if (validOrder)
            {
                var order = _ordersRepository.GetSingleOrderDetails(id);
                if (order == null) NotFound("Couldn't find an order with that id");
                return Ok(order);
            }
            return NotFound("Couldn't find an order with that id");
        }

        //api/Order/user/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetAllOrdersByUserId(int userId)
        {
            var validUser = _usersRepository.GetUserById(userId);
            if (validUser != null)
            {
                var orders = _ordersRepository.GetUserOrders(userId);
                var isEmpty = !orders.Any();
                if (isEmpty)
                {
                    return NotFound("This user does not have any orders.");
                }
                return Ok(orders);
            }
            return NotFound("That user does not exist");
        }

        //api/Order/{userId}/new
        [HttpPost("{userId}/new")]
        public IActionResult CreateNewOrder(int userId, Order orderToAdd)
        {
            var newOrder = _ordersRepository.AddNewOrder(userId, orderToAdd);

        }
    }
}