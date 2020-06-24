import React from 'react';
import PropTypes from 'prop-types';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import ProductCard from '../../shared/ProductCard/ProductCard';
// import ItemInCartAlertModal from '../../shared/ItemInCartAlertModal/ItemInCartAlertModal';

import productData from '../../../helpers/data/productData';
import orderData from '../../../helpers/data/orderData';
import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
    currentUserId: 3,
    order: {},
    currentLineItems: [],
    originalProducts: [],
  }

  static propTypes = {
    searchTermChanged: PropTypes.func,
    saveSearchType: PropTypes.func,
    SearchCategory: PropTypes.func,
  }

  getProducts = () => {
    productData.getProducts()
      .then((productsFromAPI) => {
        this.setState({
          originalProducts: productsFromAPI,
        });
      })
      .catch((err) => console.error('error from get products', err));
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
      if (lineItem) {
        return 'Item already in cart';
      }
      return orderData.addItemToOrder(itemObj)
        // once we are removing items from availability we can add additional function in .then section below:
        .then(() => {
          return 'Item added successfully';
        })
        .catch((err) => console.error('error from addProductToCart', err));
    }

    getCurrentOrderDetails = (orderId) => {
      orderData.getUserOrder(orderId)
        .then((newOrder) => {
          this.setState({ currentLineItems: newOrder.lineItems });
        })
        .catch((err) => console.error('error from get order', err));
    }

    checkForItemInCart = (productId) => {
      // get all line items for current order
      // check if the line items contain the current product id the user wishes to add to cart
      const { currentLineItems } = this.state;
      const lineItemExists = currentLineItems.some((x) => x.productId === productId);
      // if the item is already in cart, pop up a modal and do not run add item to order
      console.log('What returned?', lineItemExists);
      return lineItemExists;
      // if item is not in cart, run the additemtoorder function
    };

  renderProductView = () => {
    const { products } = this.state;
    if (products.length !== 1) {
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
    <>
      <ProductGrid
        products={this.state.originalProducts}
      />
    </>
    );
  }
}

export default Products;
