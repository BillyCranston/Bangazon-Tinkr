import './SellerDashboard.scss';
import PropTypes from 'prop-types';
import React from 'react';
import productData from '../../../helpers/data/productData';

class SellerDashboard extends React.Component {
  state = {
    totalSales: 0,
  }

  static propTypes = {
    userId: PropTypes.number,
  }

  componentDidMount() {
    this.getTotalSalesByUserId();
  }

  getTotalSalesByUserId = () => {
    const { userId } = this.props;
    productData.getTotalSales(userId)
      .then((totalSales) => {
        this.setState({ totalSales });
      })
      .catch((err) => console.error('error from get total sales', err));
  }

  render() {
    const { totalSales } = this.state;
    return (
      <div className="SellerDashboard">
        <h1>Seller Dashboard</h1>
        <h3>Total Sales: ${totalSales} </h3>
        <h3>Total Sales This Month: </h3>
        <h3>Average per item: </h3>
        <h3>Total Inventory by Category: </h3>
        <h3>Orders that require shipping: </h3>
      </div>
    );
  }
}

export default SellerDashboard;
