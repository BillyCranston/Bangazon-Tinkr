import React from 'react';
import ProductCard from '../../shared/ProductCard/ProductCard';

import productData from '../../../helpers/data/productData';

import './Products.scss';
import orderData from '../../../helpers/data/orderData';

class Products extends React.Component {
  state = {
    products: [],
    currentUserId: 3,
    order: {},
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

  // getCurrentOrder = () => {
  //   const { userId } = this.state;
  //   orderData.getUserOrder(userId)
  //     .then((order) => {
  //       if (order === null) {
  //         // create a new order...
  //       }
  //       this.setState({ orderId: order.orderId });
  //     })
  //     .catch((err) => console.error('error from get order', err));
  // }

  getCurrentOrder = () => {
    const { currentUserId } = this.state;
    const orderObj = { userId: currentUserId };
    orderData.getOpenUserOrder(orderObj)
      .then((newOrder) => {
        this.setState({ order: newOrder });
      })
      .catch((err) => console.error('error from getCurrentOrder', err));
  }

  componentDidMount() {
    this.getProducts();
    this.getCurrentOrder();
  }

    addProductToCart = (productId) => {
      const { order } = this.state;
      const itemObj = { rubbishId: productId, orderId: order.orderId };
      orderData.addItemToOrder(itemObj)
        .then(() => console.log('add Item worked??'))
        .catch((err) => console.error('error from addProductToCart', err));
    }

  renderProductView = () => {
    const { products } = this.state;
    if (products.length !== 0) {
      return (
        products.filter((product) => product.isAvailable)
          .map((product) => <ProductCard key={product.rubbishId} product={product} addProductToCart={this.addProductToCart} />)
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
