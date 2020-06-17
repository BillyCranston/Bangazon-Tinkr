import React from 'react';

import './SingleProduct.scss';

class SingleProduct extends React.Component {
  render() {
    return (
      <div className="SingleProduct">
        <h1>Product Name</h1>
        {/* title, description, quantity available, price per unit, and a button labeled Add to Cart */}
        <p>Description</p>
        <p>Quantity available</p>
        <p>Price:</p>
        <button>Add to Cart</button>
      </div>
    );
  }
}

export default SingleProduct;
