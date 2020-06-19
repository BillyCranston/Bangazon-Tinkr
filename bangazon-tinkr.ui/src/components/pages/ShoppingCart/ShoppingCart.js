import React from 'react';

import CartProductCard from '../../shared/CartProductCard/CartProductCard';

import './ShoppingCart.scss';
import orderData from '../../../helpers/data/orderData';

class ShoppingCart extends React.Component {
  state = {
    itemTotal: 20,
    shipping: 15,
    orderTax: 0,
    products: [],
    userId: 3,
    order: {},
  }

  // TODO:
  // Function to get order with details
  // Set order details to state
  // Pull total into the cart summary space allocated
  // Set line items to products array in state
  // Map over the products array to create the CartProductCard component
  // Grab the userId from authed user when authentication is complete
  // From the user information include the user's address

  getCurrentOrder = () => {
    const { userId } = this.state;
    orderData.getUserOrder(userId)
      .then((order) => {
        this.setState({ order });
        this.setState({ products: order.lineItems });
      })
      .catch((err) => console.error('error from get order', err));
  }

  componentDidMount() {
    this.getCurrentOrder();
  }

  renderCartItemView = () => {
    const { products } = this.state;
    if (products.length !== 0) {
      return (
        products.map((product) => <CartProductCard key={product.rubbishId} product={product}/>)
      );
    }
    return (
      <h3>There are currently no items available.</h3>
    );
  }

  render() {
    const {
      itemTotal,
      user,
      orderTax,
    } = this.state;

    return (
      <div className="ShoppingCart p-3">
        <h1 className="text-center mb-3">Shopping Cart</h1>
        <div className="row">
          <div className="col-8">
            <div className="row">
              {this.renderCartItemView()}
            </div>
          </div>
          <div className="col-4 mx-auto px-4">
            <div className="row">
              <h2 className="mb-3">Cart Summary:</h2>
              <table className="w-100">
                <tbody>
                  <tr>
                    <td>Items:</td>
                    <td>${itemTotal}.00</td>
                  </tr>
                  <tr>
                    <td>Shipping:</td>
                    <td>$15.00</td>
                  </tr>
                  <tr>
                    <td>Tax:</td>
                    <td>${orderTax}.00</td>
                  </tr>
                  <tr>
                    <td><hr></hr></td>
                    <td><hr></hr></td>
                  </tr>
                  <tr>
                    <td><strong>Order Total:</strong></td>
                    <td><strong>$343.99</strong></td>
                  </tr>
                </tbody>
              </table>
              <div className="btn btn-dark btn-block p-1 mx-0 my-3">Place Order</div>
              <div className="row">
                <img className="mapImage col" src="https://d26d74ht2k6aj1.cloudfront.net/images/street-map-sample.png"/>
                <div className="col">
                  <p>Street Address Sample</p>
                  <p>City, State  Zip Code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
