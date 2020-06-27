import React from 'react';

import orderData from '../../../helpers/data/orderData';
import userData from '../../../helpers/data/userData';

class ProductToShip extends React.Component {
  state = {
    orderInfo: {},
    userWhoOrdered: {},
  }

  getCompletedOrder = () => {
    const { product } = this.props;
    orderData.getCompletedOrderByProductId(product.rubbishId)
      .then((order) => {
        this.setState({ orderInfo: order });
        this.getUserWhoOrdered(order.orderId);
      })
      .catch((err) => console.error('err from get completed order', err));
  };

    getUserWhoOrdered = (orderId) => {
      userData.getUserByOrderId(orderId)
        .then((user) => {
          this.setState({ userWhoOrdered: user });
        })
        .catch((err) => console.error('error from get user who order', err));
    }

    componentDidMount() {
      this.getCompletedOrder();
    }

    render() {
      const { orderInfo, userWhoOrdered } = this.state;
      const { product } = this.props;
      return (
        <div className="ProductToShipCard">
          <div className="card border-dark mb-3">
          {/* <img src="..." className="card-img-top cardImage" alt="..." /> */}
            <div className="card-body" id={orderInfo.orderId}>
              <h3>Tinkr Item Sold: {product.name}</h3>
              <h3>Order Completed: {orderInfo.dateCompleted}</h3>
              <h3>Deliver To: {userWhoOrdered.firstName} {userWhoOrdered.lastName}</h3>
              <h3>Address: {userWhoOrdered.streetAddress}</h3>
              <h3>City/State: {userWhoOrdered.city}, {userWhoOrdered.state}</h3>
              <h3>Zip: {userWhoOrdered.zip}</h3>
            </div>
          </div>
        </div>
      );
    }
}

export default ProductToShip;
