import React from 'react';
import SearchInput from '../../shared/SearchInput/SearchInput';
import productData from '../../../helpers/data/productData';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import './Products.scss';
import Dropdown from '../../shared/DropDown/DropDown';

class Products extends React.Component {
  state = {
    filteredRubbish: [],
    originalProducts: [],
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

  componentDidMount() {
    this.getProducts();
    this.getRubbishByName();
  }

  render() {
    return (
      <>
        <ProductGrid
          products={this.state.filteredProducts}
        />
      </>
    );
  }
}

export default Products;
