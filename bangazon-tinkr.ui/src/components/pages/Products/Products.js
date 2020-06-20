import React from 'react';
import SearchInput from '../../shared/SearchInput/SearchInput';
import productData from '../../../helpers/data/productData';
import ProductGrid from '../../shared/ProductGrid/ProductGrid';
import './Products.scss';
import ProductCard from '../../shared/ProductCard/ProductCard';
import Dropdown  from '../../shared/DropDown/DropDown';

class Products extends React.Component {
  state = {
    filteredProducts: [],
    originalProducts: [],
    searchTerm: ""
  }

  getProducts = () => {
    productData.getProducts()
      .then((productsFromAPI) => {
        this.setState({
          filteredProducts: productsFromAPI,
          originalProducts: productsFromAPI
         });
      })
      .catch((err) => console.error('error from get products', err));
  }

  componentDidMount() {
    this.getProducts();
  }

  searchTermChanged = (onChangeEvent) => {
    debugger;
    this.setState({searchTerm: onChangeEvent.target.value});
    var filteredProducts = this.state.originalProducts.filter((product) => {
      return product.name.includes(onChangeEvent.target.value);
    });
    this.setState({filteredProducts: filteredProducts});
  }

  render() {
    return (
      <>
        <SearchInput
          searchTermChanged={this.searchTermChanged}
        />
        <Dropdown />
        <ProductGrid
          products={this.state.filteredProducts}
        />
      </>
    );
  }
}

export default Products ;
