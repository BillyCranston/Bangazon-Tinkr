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

  getRubbishByName = (name) => {
    const { searchTerm } = this.props;
    productData.getRubbishByName(name)
    .then((response) => { 
      this.setState({
                    searchTerm: response
          });
    })
      .catch((err) => console.error('error from get search product', err));
  }

  componentDidMount() {
    const name = this.props.match.params.name
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

export default Products ;
