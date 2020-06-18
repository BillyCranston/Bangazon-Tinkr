import React from 'react';

import CartProductCard from '../../shared/CartProductCard/CartProductCard';

import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  render() {
    return (
      <div className="ShoppingCart p-3">
        <h1 className="text-center mb-3">Shopping Cart</h1>
        <div className="row">
          <div className="col-8">
            <div className="row">
              <CartProductCard />
              <CartProductCard />
              <CartProductCard />
              <CartProductCard />
              <CartProductCard />
            </div>
          </div>
          <div className="col-4 mx-auto px-4">
            <div className="row">
              <h2 className="mb-3">Cart Summary:</h2>
              <table className="w-100">
                <tbody>
                  <tr>
                    <td>Items:</td>
                    <td>$343.99</td>
                  </tr>
                  <tr>
                    <td>Shipping:</td>
                    <td>$15.00</td>
                  </tr>
                  <tr>
                    <td>Tax:</td>
                    <td>$0.00</td>
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
