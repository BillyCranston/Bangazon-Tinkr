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
            var validOrder = _ordersRepository.CheckForValidOrderId(id);
            if (validOrder)
            {
                var order = _ordersRepository.GetSingleOrderDetails(id);
                if (order == null) NotFound("Couldn't find an order with that id");
                return Ok(order);
            }
            return NotFound("Couldn't find an order with that id");

        }
    }
}