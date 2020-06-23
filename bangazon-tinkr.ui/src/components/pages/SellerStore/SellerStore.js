import React from 'react';
import ProductCard from '../../shared/ProductCard/ProductCard';
import productData from '../../../helpers/data/productData';
import userData from '../../../helpers/data/userData';
import orderData from '../../../helpers/data/orderData';

import './SellerStore.scss';

class SellerStore extends React.Component {
  state = {
    products: [],
    seller: {},
    orderId: 0,
    currentUserId: 3,
  }

  getSellerByUserId = () => {
    const { sellerId } = this.props.match.params;
    userData.getUser(sellerId)
      .then((seller) => {
        this.setState({ seller });
      })
      .catch((err) => console.error('error from get seller by user id', err));
  }

  getProductsByUserId = () => {
    const { sellerId } = this.props.match.params;
    productData.getProductsByUserId(sellerId)
      .then((products) => {
        this.setState({ products });
      })
      .catch((err) => console.error('error from get products by user id', err));
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
    this.getSellerByUserId();
    this.getProductsByUserId();
    this.getCurrentOrder();
  }

  renderSellerProducts = () => {
    const { products } = this.state;
    if (products.length !== 0) {
      return (
        products.filter((product) => product.isAvailable)
          .map((product) => <ProductCard key={product.rubbishId} product={product} addProductToCart={this.addProductToCart} />)
      );
    }
    return (
      <h3>This seller currently has no items available for sale.</h3>
    );
  }

  renderSellerStore = () => {
    const { seller } = this.state;
    if (seller.type === 'Seller' || seller.type === 'BuyerAndSeller') {
      return (
        <div className="sellerStoreDetails">
          <h1>Seller Store</h1>
          <h2>{seller.firstName} {seller.lastName}</h2>
          <h2>{seller.city}, {seller.state}</h2>
          <div className="seller-card-group">
            {this.renderSellerProducts()}
          </div>
        </div>
      );
    }
    return (
      <h2>This user does not have a store.</h2>
    );
  }

  render() {
    return (
      <div className="SellerStore">
        {this.renderSellerStore()}
      </div>
    );
  }
}

export default SellerStore;
