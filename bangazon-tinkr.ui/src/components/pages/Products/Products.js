import React from 'react';
import PropTypes from 'prop-types';
import SearchInput from '../../shared/SearchInput/SearchInput';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import ProductCard from '../../shared/ProductCard/ProductCard';
import DropDownBtns from '../../shared/DropDownBtns/DropDownBtns';
import productData from '../../../helpers/data/productData';
import orderData from '../../../helpers/data/orderData';
import './Products.scss';

class Products extends React.Component {
  state = {
    products: [],
    currentUserId: 3,
    order: {},
    filteredRubbish: [],
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
          filteredRubbish: productsFromAPI,
          originalProducts: productsFromAPI,
        });
      })
      .catch((err) => console.error('error from get products', err));
  }

  getRubbishByName = () => {
    const { searchTerm } = this.props.match.params;
    productData.getRubbishByName(searchTerm)
      .then((response) => {
        this.setState({ searchTerm: response });
      })
      .catch((err) => console.error('error from get search product', err));
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

  componentDidMount() {
    this.getProducts();
    this.getCurrentOrder();
    this.getRubbishByName();
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

  // below should eventually render the products page to include a search bar and dropdown at the top, and a list of filtered product cards based on the search underneath
  render() {
    const { searchTermChanged, saveSearchType, SearchCategory } = this.props;
    return (
      <>
        <SearchInput searchTermChanged={searchTermChanged}/>
        <DropDownBtns dropDownChanged={saveSearchType} viewChanged={SearchCategory}/>
        <ProductGrid products={this.state.filteredProducts}/>
      </>
    );
  }
}

export default Products;
