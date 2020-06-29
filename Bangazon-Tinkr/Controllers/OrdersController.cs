using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bangazon_Tinkr.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Bangazon_Tinkr.Models;
using Microsoft.AspNetCore.Authorization;

namespace Bangazon_Tinkr.Controllers
{
    [Route("api/Order")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrdersRepo _ordersRepository;
        UserRepo _usersRepository;
        RubbishRepo _rubbishRepository;
        public OrdersController(OrdersRepo repository, UserRepo usersRepository, RubbishRepo rubbishRepository)
        {
            _ordersRepository = repository;
            _usersRepository = usersRepository;
            _rubbishRepository = rubbishRepository;
        }
        //api/Order/{orderId}
        [HttpGet("{orderId}")]
        public IActionResult GetSingleOrderByIdDetailed(int orderId)
        {
            var validOrder = _ordersRepository.CheckForValidOrderId(orderId);
            if (validOrder)
            {
                var order = _ordersRepository.GetSingleOrderDetails(orderId);
                if (order == null) NotFound("Couldn't find an order with that id");
                return Ok(order);
            }
            return NotFound("Couldn't find an order with that id");
        }

        //api/Order/Completed/Rubbish/{rubbishId}
        [HttpGet("Completed/Rubbish/{rubbishId}/")]
        public IActionResult GetCompletedOrderByRubbishId(int rubbishId)
        {
            var completedOrder = _ordersRepository.GetCompletedOrderByRubbishId(rubbishId);
            if (completedOrder != null)
            {
                return Ok(completedOrder);
            }
            return NotFound("No completed order could be found.");
        }

        //api/Order/OpenOrder/{userId}
        [HttpGet("OpenOrder/{userId}")]
        public IActionResult GetUserOpenOrder(int userId)
        {
            var validUser = _usersRepository.GetUserById(userId);
            if (validUser != null)
            {
                var order = _ordersRepository.GetOpenUserOrder(userId);
                return Ok(order);
            }
            return NotFound("User could not be found.");
        }

        // api/Order/userOpenOrder
        [HttpPost("userOpenOrder")]
        public IActionResult GetOpenOrderByUserId(Order userId)
        {

            // 1. validate user exists
            var validUser = _usersRepository.GetUserById(userId.UserId);
            if (validUser != null)
            {
                // 2. go to repo and check to see if there are any open orders for the user
                // TODO: this should be only open orders below...
                var order = _ordersRepository.GetOpenUserOrder(userId.UserId);
                //var isEmpty = !order.Any();
                // 3a. if not, create a new order and return the id on the new order
                if (order == null)
                {
                    _ordersRepository.AddNewOrder(userId);
                    var newOrder = _ordersRepository.GetOpenUserOrder(userId.UserId);
                    return Created("", newOrder);
                }
                // 3a. if yes, return the order id
                return Ok(order);
            }
            return NotFound("This user does not exist.");

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

        //api/Order/checkout/{orderId}
        [HttpPut("checkout/{orderId}")]
        public IActionResult UpdateOrderStatusToComplete(int orderId)
        {
            var checkIncompleteOrder = _ordersRepository.VerifyIncompleteOrderExists(orderId);
            if (checkIncompleteOrder == true)
            {
                var completeOrder = _ordersRepository.CompleteOrder(orderId);
                _rubbishRepository.RubbishNoLongerAvailableAfterOrderComplete(orderId);
                return Ok(completeOrder);
            }
            else
            {
                var checkForCompletedOrder = _ordersRepository.VerifyCompletedOrderExists(orderId);
                if (checkForCompletedOrder == true)
                {
                    return Ok("This order has already been completed. No further action necessary.");
                }
                return NotFound("The requested order does not exist."); }
        }

        //api/Order/
        [HttpPost]
        [Authorize]
        public IActionResult CreateNewOrder(Order orderToAdd)
        {
            var isValidUser = _usersRepository.GetUserById(orderToAdd.UserId);
            if (isValidUser != null)
            {
                var currentOrder = _ordersRepository.CheckForCurrentOrder(orderToAdd);
                if (currentOrder == null)
                {
                    var newOrder = _ordersRepository.AddNewOrder(orderToAdd);
                    return Created("", newOrder);
                }
            }
            return NotFound("That user does not exist.");
        }

        //api/Order/AddItem
        [HttpPost("AddItem")]
        [Authorize]
        public IActionResult AddItemToOrder(LineItem lineItemToAdd)
        {
            var order = _ordersRepository.CheckForValidOrderId(lineItemToAdd.OrderId);
            var checkOrderIsActive = _ordersRepository.CheckIfOrderIsActive(lineItemToAdd.OrderId);
            if (order && checkOrderIsActive != null)
            {
                var rubbish = _rubbishRepository.CheckIfRubbishIsAvailable(lineItemToAdd.RubbishId);
                var itemAlreadyInCart = _ordersRepository.CheckForProductIdOnCurrentOrder(lineItemToAdd);
                if (rubbish != null)
                {
                    if (itemAlreadyInCart == null)
                    {
                        var newLineItem = _ordersRepository.AddNewLineItem(lineItemToAdd);
                        return Ok(newLineItem);
                    }
                    return BadRequest("This item is already in the cart.  Only unique items can be used for new line items.");
                }
                return NotFound("That piece of rubbish is no longer available.");
            }
            return NotFound("An open order was not found");
        }

        // api/Order/deleteItem/{lineItemId}
        [HttpDelete("deleteItem/{lineItemId}")]
        [Authorize]
        public IActionResult DeleteItemFromOrder(int lineItemId)
        {
            var isValidLine = _ordersRepository.GetLineItemById(lineItemId);
            if (isValidLine!= null)
            {
                var deletedLine = _ordersRepository.DeleteLine(lineItemId);
                return Ok("The line item has been successfully deleted.");
            }
            return NotFound("That line does not exist and could not be deleted");
        }

        // api/Order/{orderId}/updatePayment/{paymentTypeId}
        [HttpPut("{orderId}/updatePayment/{paymentTypeId}")]
        public IActionResult UpdatePaymentTypeForOrder(int orderId, int paymentTypeId)
        {
            var checkOrderIsActive = _ordersRepository.CheckIfOrderIsActive(orderId);
            if (checkOrderIsActive != null)
            {
                var order = _ordersRepository.UpdateOrderWithNewPaymentType(orderId, paymentTypeId);
                return Ok("Payment on Order Updated Successfully");
            }
            return NotFound("That order does not exist");
        }

    }
}