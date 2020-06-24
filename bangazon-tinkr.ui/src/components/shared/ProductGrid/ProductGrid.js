import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import orderData from '../../../helpers/data/orderData';
import Product from '../../pages/Products/Products';

import './ProductGrid.scss';

class ProductGrid extends React.Component {
  state = {
    currentUserId: 3,
    order: {},
    originalProducts: [],
  }
  getCurrentOrder = () => {
    const { currentUserId } = this.state;
    const orderObj = { userId: currentUserId };
    orderData.getOpenUserOrder(orderObj)
      .then((newOrder) => {
        this.setState({ order: newOrder });
      })
      .catch((err) => console.error('error from getCurrentOrder', err));
  }
  
  addProductToCart = (productId) => {
    const { order } = this.state;
    const itemObj = { rubbishId: productId, orderId: order.orderId };
    orderData.addItemToOrder(itemObj)
      // once we are removing items from availability we can add additional function in .then section below:
      .then()
      .catch((err) => console.error('error from addProductToCart', err));
  }

  renderProductView = () => {
    const { products } = this.props;
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
        <h1>Products</h1>
        <div className="card-group">
          {this.renderProductView()}
        </div>
      </div>
    );
  }
}

export default ProductGrid;
