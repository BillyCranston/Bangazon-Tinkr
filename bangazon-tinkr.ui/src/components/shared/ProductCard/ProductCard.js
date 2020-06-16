import React from 'react';

import './ProductCard.scss';

class ProductCard extends React.Component {
  render() {
    return (
      <div className="ProductCard">
        <h1>Product Card</h1>
        <div className="card col-3">
        <img src="..." class="card-img-top cardImage" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Product Name</h5>
            <h6 className="card-subtitle mb-2 text-muted">Product Price</h6>
            <p className="card-text">Brief Description of the item for purchase.</p>
            <a href="#" className="card-link btn btn-success">Add To Cart</a>
            <a href="#" className="card-link btn btn-primary">More Info...</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
