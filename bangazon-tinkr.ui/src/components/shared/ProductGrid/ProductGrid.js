import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import orderData from '../../../helpers/data/orderData';
import './ProductGrid.scss';

class ProductGrid extends React.Component {
  state = {
    products: [],
    orderId: 0,
    currentUserId: 3,
  }

  getCurrentOrder = () => {
    const { currentUserId } = this.state;
    const orderObj = { userId: currentUserId };
    orderData.getOpenUserOrder(orderObj)
      .then((newOrder) => {
        this.setState({ orderId: newOrder.orderId });
      })
      .catch((err) => console.error('error from getCurrentOrder', err));
  }

  addProductToCart = (productId) => {
    const { orderId } = this.state;
    const itemObj = { rubbishId: productId, orderId };
    orderData.addItemToOrder(itemObj)
      .then()
      .catch((err) => console.error('error from addProductToCart', err));
  }
  componentDidMount() {
    this.getCurrentOrder();
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
