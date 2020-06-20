import React from 'react';
import ProductCard from '../../shared/ProductCard/ProductCard';

import productData from '../../../helpers/data/productData';

import './Products.scss';
import orderData from '../../../helpers/data/orderData';

class Products extends React.Component {
  state = {
    products: [],
    userId: 5,
    orderId: 0,
  }

  getProducts = () => {
    productData.getProducts()
      .then((products) => {
        this.setState({ products });
      })
      .catch((err) => console.error('error from get products', err));
  }

  // the below function should call the method in api that will get open order, or create new order and return orderId
  // this will allow to pass the order Id property to the products so new line items can be created.
  getOrder = () => {
    const { userId } = this.state;
    orderData.getUserOrder(userId)
      .then((order) => {
        if (order === null) {
          // create a new order...
        }
        this.setState({ orderId: order.orderId });
      })
      .catch((err) => console.error('error from get order', err));
  }

  componentDidMount() {
    this.getProducts();
    this.getOrder();
  }

  renderProductView = () => {
    const { products } = this.state;
    if (products.length !== 0) {
      return (
        products.filter((product) => product.isAvailable)
          .map((product) => <ProductCard key={product.rubbishId} product={product}/>)
      );
    }
    return (
      <h3>There are currently no items available.</h3>
    );
  }

  render() {
    return (
      <div className="Products">
        <h1>All Products</h1>
        <div className="card-group">
          {this.renderProductView()}
        </div>
      </div>
    );
  }
}

export default Products;
