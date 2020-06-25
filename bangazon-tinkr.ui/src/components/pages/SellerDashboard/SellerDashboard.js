import './SellerDashboard.scss';
import PropTypes from 'prop-types';
import React from 'react';
import productData from '../../../helpers/data/productData';

class SellerDashboard extends React.Component {
  state = {
    totalSales: 0,
    totalSalesThisMonth: 0,
  }

  static propTypes = {
    userId: PropTypes.number,
  }

  componentDidMount() {
    this.getTotalSalesByUserId();
    this.getTotalSalesThisMonth();
  }

  getTotalSalesByUserId = () => {
    const { userId } = this.props;
    productData.getTotalSales(userId)
      .then((totalSales) => {
        this.setState({ totalSales });
      })
      .catch((err) => console.error('error from get total sales', err));
  }

  getTotalSalesThisMonth = () => {
    const { userId } = this.props;
    productData.getTotalSalesThisMonth(userId)
      .then((totalSalesThisMonth) => {
        this.setState({ totalSalesThisMonth });
      })
      .catch((err) => console.error('error from get total sales this month', err));
  }

  render() {
    const { totalSales, totalSalesThisMonth } = this.state;
    return (
      <div className="SellerDashboard">
        <h1>Seller Dashboard</h1>
        <h3>Total Sales: ${totalSales} </h3>
        <h3>Total Sales This Month: ${totalSalesThisMonth}</h3>
        <h3>Average Sale Per Item: </h3>
        <h3>Total Inventory by Category: </h3>
        <h3>Orders that require shipping: </h3>
      </div>
    );
  }
}

export default SellerDashboard;
