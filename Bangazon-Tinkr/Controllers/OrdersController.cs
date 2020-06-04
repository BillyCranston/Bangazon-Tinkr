using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon_Tinkr.DataAccess;
using Microsoft.AspNetCore.Mvc;

namespace Bangazon_Tinkr.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrdersRepo _ordersRepository;

        public OrdersController(OrdersRepo repository)
        {
            _ordersRepository = repository;
        }
        //api/Order/{id}
        [HttpGet("{id}")]
        public IActionResult GetSingleOrderById(int id)
        {
            var order = _ordersRepository.GetSingleOrder(id);
            if (order == null) NotFound("Couldn't find an order with that id");
            return Ok(order);
        }

        //api/Order/user/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetAllOrdersByUserId(int userId)
        {
            // add user check to verify user exists once get user by id method is included
            var orders = _ordersRepository.GetUserOrders(userId);
            var isEmpty = !orders.Any();
            if (isEmpty)
            {
                return NotFound("This user does not have any orders.");
            }
            return Ok(orders);
        }
    }
}