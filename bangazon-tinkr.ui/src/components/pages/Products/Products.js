import React from 'react';
import ProductCard from '../../shared/ProductCard/ProductCard';

import './Products.scss';

class Products extends React.Component {
  render() {
    return (
      <div className="Products">
        <h1>All Products Component</h1>
        <ProductCard />
        <ProductCard />
      </div>
    );
  }
}

export default Products;
