import './SellerDashboard.scss';
import PropTypes from 'prop-types';
import React from 'react';
import productData from '../../../helpers/data/productData';
import InventoryProductCard from '../../shared/InventoryProductCard/InventoryProductCard';

class SellerDashboard extends React.Component {
  state = {
    totalSales: 0,
    totalSalesThisMonth: 0,
    averageSale: 0,
    categories: [],
    products: [],
  }

  static propTypes = {
    userId: PropTypes.number,
  }

  componentDidMount() {
    this.getTotalSalesByUserId();
    this.getTotalSalesThisMonth();
    this.getAverageSalePerItem();
    this.getCategories();
    this.getInventoryByUserId();
  }

  getCategories = () => {
    productData.getCategories()
      .then((categories) => this.setState({ categories }))
      .catch((err) => console.error('error from getCategories in Categories', err));
  }

  getInventoryByUserId = () => {
    const { userId } = this.props;
    productData.getInventoryByUserId(userId)
      .then((products) => this.setState({ products }))
      .catch((err) => console.error('error from getProductsByUserId in SellerDashboard', err));
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

  getAverageSalePerItem = () => {
    const { userId } = this.props;
    productData.getAverageSaleByUserId(userId)
      .then((averageSale) => {
        this.setState({ averageSale });
      })
      .catch((err) => console.error('error from get total sales this month', err));
  }

  splitInventoryByCategory = (categoryId) => {
    const { products } = this.state;
    const rubbishInThisCategory = [];
    for (let i = 0; i < products.length; i += 1) {
      // const productAlreadyExistsInCategory = Array.Exists(rubbishInThisCategory, (element) => element.key === products[i].key);
      if (products[i].categoryId === categoryId) {
        rubbishInThisCategory.push(products[i]);
      }
    }
    if (rubbishInThisCategory.length > 0) {
      return rubbishInThisCategory.map((product) => <InventoryProductCard key={product.rubbishId} product={product}/>);
    }
    return <p>No inventory available in this category.</p>;
  }

  showInventory = (categories) => (
    categories.map((category) => (
          <div key={category.categoryId}>
            <h2>{category.name}</h2>
            <div className="card-group">
              {this.splitInventoryByCategory(category.categoryId)}
            </div>
          </div>
    ))
  )

  render() {
    const {
      totalSales,
      totalSalesThisMonth,
      averageSale,
      categories,
    } = this.state;
    return (
      <div className="SellerDashboard">
        <h1>Seller Dashboard</h1>
        <h3>Total Sales: ${totalSales} </h3>
        <h3>Total Sales This Month: ${totalSalesThisMonth}</h3>
        <h3>Average Sale Per Item:${averageSale} </h3>
        <div className="InventoryByCategory">
          <h3>Total Inventory by Category</h3>
          {this.showInventory(categories)}
        </div>
        <h3>Orders that require shipping: </h3>
      </div>
    );
  }
}

export default SellerDashboard;
