import React from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';

class ProductCard extends React.Component {
  // static propTypes = {
  //   product: productShape.productShape,
  // }

  // componentDidMount() {
  //   const { product } = this.props;
  // }

  render() {
    const { product } = this.props;
    return (
      <div className="ProductCard col-3">
        <div className="card border-dark mb-3">
        {/* <img src="..." className="card-img-top cardImage" alt="..." /> */}
          <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
            <p className="card-text">{product.description}</p>
          </div>
          <div className="card-footer">
            <a href="#" className="card-link btn btn-dark">Add To Cart</a>
            <Link to={`/product/${product.rubbishId}`} className="card-link btn btn-outline-dark">More Info...</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
