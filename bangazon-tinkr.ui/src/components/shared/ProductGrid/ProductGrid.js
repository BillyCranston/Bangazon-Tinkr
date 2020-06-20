import React from 'react';
import ProductCard from '../../shared/ProductCard/ProductCard';
import productData from '../../../helpers/data/productData';


import './ProductGrid.scss';

class ProductGrid extends React.Component {

  renderProductView = () => {
    const { products } = this.props;
    if (products.length !== 0) {
      return (
        products.filter((product) => product.isAvailable)
          .map((product) => <ProductCard key={product.rubbishId} product={product}/>)
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

export default ProductGrid;