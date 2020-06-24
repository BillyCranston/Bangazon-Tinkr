import './SellerDashboard.scss';
import PropTypes from 'prop-types';
import React from 'react';

class SellerDashboard extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    return (
      <div className="SellerPortal">
        <h1>Seller Portal</h1>
        <h3>Total Sales: </h3>
        <h3>Total Sales This Month: </h3>
        <h3>Average per item: </h3>
        <h3>Total Inventory by Category: </h3>
        <h3>Orders that require shipping: </h3>
      </div>
    );
  }
}

export default SellerDashboard;
