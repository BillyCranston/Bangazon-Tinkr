import React from 'react';

import CartProductCard from '../../shared/CartProductCard/CartProductCard';

import './ShoppingCart.scss';
import orderData from '../../../helpers/data/orderData';
import userData from '../../../helpers/data/userData';

class ShoppingCart extends React.Component {
  state = {
    itemTotal: 20,
    shipping: 15,
    orderTax: 0,
    products: [],
    // TODO: The below userId will need to be updated once user authentication is implemented.
    // TEST NOTE: For testing you may need to change the userId below to something different depending on your data.  The user will need to be valid along with their line items and item Ids.
    userId: 3,
    order: {},
    user: {},
  }

  // Function below gets the current order and details then sets the information into state of the component to be used in the rendering.
  getCurrentOrderDetails = (orderId) => {
    orderData.getUserOrder(orderId)
      .then((newOrder) => {
        this.setState({ products: newOrder.lineItems, itemTotal: newOrder.total });
      })
      .catch((err) => console.error('error from get order', err));
  }

  setCurrentOrder = () => {
    const { userId } = this.state;
    orderData.getOpenOrderByUserId(userId)
      .then((currentOrder) => {
        this.setState({ order: currentOrder });
        this.getCurrentOrderDetails(currentOrder.orderId);
      })
      .catch((err) => console.error('error from setCurrentOrder', err));
  }

  // Function below gets the users information so you can view the shipping address in the cart summary.
  getUserById = () => {
    const { userId } = this.state;
    userData.getUser(userId)
      .then((user) => {
        this.setState({ user });
      })
      .catch((err) => console.error('error from get user', err));
  }

  componentDidMount() {
    this.getUserById();
    this.setCurrentOrder();
  }

  // delete item function to be included here, the function will need to be provided to the products mapped below in the render.

  renderCartItemView = () => {
    const { products } = this.state;
    if (products.length !== 0) {
      return (
        products.map((product) => <CartProductCard key={product.rubbishId} product={product}/>)
      );
    }
    return (
      <h3>There are currently no items in your cart. Start shopping now!</h3>
    );
  }

  render() {
    const {
      itemTotal,
      user,
      orderTax,
      shipping,
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
                    <td>${shipping}.00</td>
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
                    <td><strong>${itemTotal + shipping + orderTax}.00</strong></td>
                  </tr>
                </tbody>
              </table>
              <div className="btn btn-dark btn-block p-1 mx-0 my-3">Place Order</div>
              <div className="row">
                <img className="mapImage col" src="https://d26d74ht2k6aj1.cloudfront.net/images/street-map-sample.png"/>
                <div className="col">
                  <p>{user.streetAddress}</p>
                  <p>{user.city}, {user.state}  {user.zip}</p>
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
