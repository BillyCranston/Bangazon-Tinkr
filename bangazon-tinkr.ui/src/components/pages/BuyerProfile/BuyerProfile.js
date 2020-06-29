import React from 'react';
import PropTypes from 'prop-types';

import BuyerCard from '../../shared/BuyerCard/BuyerCard';
import orderData from '../../../helpers/data/orderData';
import './BuyerProfile.scss';

class BuyerProfile extends React.Component {
  state = {
    currentOrders: [],
  }

  static propTypes = {
    userId: PropTypes.number,
  }

  getCurrentOrdersByUserId = () => {
    const { userId } = this.props;
    orderData.getAllUserOrders(userId)
      .then((response) => {
        this.setState({
          currentOrders: response,
        });
      })
      .catch((err) => console.error('error from get order', err));
  }

  componentDidMount() {
    this.getCurrentOrdersByUserId();
  }

  renderCurrentOrders() {
    const { currentOrders } = this.state;
    if (currentOrders.length !== 0) {
      return (
        currentOrders.filter((currentOrder) => currentOrder.orderId)
          .map((currentOrder) => <BuyerCard key={currentOrder.orderId} currentOrder={currentOrder} />)
      );
    }
    return (
      <h3>This user does not have any current orders.</h3>
    );
  }

  render() {
    return (
      <div className="BuyerProfile">
        <h2>Orders</h2>
        {this.renderCurrentOrders()}
      </div>
    );
  }
}

export default BuyerProfile;
