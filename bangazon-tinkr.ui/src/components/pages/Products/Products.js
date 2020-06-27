import React from 'react';
import ProductCard from '../../shared/ProductCard/ProductCard';
// import ItemInCartAlertModal from '../../shared/ItemInCartAlertModal/ItemInCartAlertModal';
import SuccessModal from '../../shared/SuccessModal/SuccessModal';
import ItemInCartModal from '../../shared/ItemInCartAlertModal/ItemInCartAlertModal';

import productData from '../../../helpers/data/productData';
import orderData from '../../../helpers/data/orderData';
import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
    currentUserId: 3,
    order: {},
    success: '',
    currentLineItems: [],
  }

  getProducts = () => {
    productData.getProducts()
      .then((productsFromAPI) => {
        this.setState({
          products: productsFromAPI,
        });
      })
      .catch((err) => console.error('error from get products', err));
  }

  getCurrentOrderDetails = (orderId) => {
    orderData.getUserOrder(orderId)
      .then((newOrder) => {
        this.setState({ currentLineItems: newOrder.lineItems });
      })
      .catch((err) => console.error('error from get order', err));
  }

  getCurrentOrder = () => {
    const { currentUserId } = this.state;
    const orderObj = { userId: currentUserId };
    orderData.getOpenUserOrder(orderObj)
      .then((newOrder) => {
        this.setState({ order: newOrder });
        this.getCurrentOrderDetails(newOrder.orderId);
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
      const lineItem = this.checkForItemInCart(productId);
      if (lineItem === false) {
        orderData.addItemToOrder(itemObj)
          .then(() => {
            this.setState({ success: 'Item added successfully' });
            this.getCurrentOrder();
          })
          .catch((err) => console.error('error from addProductToCart', err));
      }
      this.setState({ success: 'Item already in cart' });
    }

    checkForItemInCart = (productId) => {
      const { currentLineItems } = this.state;
      const lineItemExists = currentLineItems.some((x) => x.rubbishId === productId);
      // if the item is already in cart, pop up a modal and do not run add item to order
      console.log('What returned?', lineItemExists);
      return lineItemExists;
      // if item is not in cart, run the additemtoorder function
    };

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

  renderSuccessView = () => {
    const { success } = this.state;
    if (success === 'Item added successfully') {
      return <div>Yay you bought yourself something!</div>;
    }
    if (success === 'Item already in cart') {
      return <div>Sorry, can't have more than one of those</div>;
    }
    return <div></div>;
  }

  render() {
    return (
      <div className="Products">
        <h1>All Products</h1>
        {this.renderSuccessView()}
        <div className="card-group">
        {this.renderProductView()}
      </div>
    </div>
    );
  }
}

export default Products;
