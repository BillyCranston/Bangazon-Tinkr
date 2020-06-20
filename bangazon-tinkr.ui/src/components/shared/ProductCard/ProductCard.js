import React from 'react';
import PropTypes from 'prop-types';

import './ProductCard.scss';
import ModalExample from '../SuccessModal/SuccessModal';

class ProductCard extends React.Component {
  static propTypes = {
    addProductToCart: PropTypes.func,
  }

  addProductToCartEvent = (e) => {
    e.preventDefault();
    const { product, addProductToCart } = this.props;
    addProductToCart(product.rubbishId);
  };

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
            <div className="modal-holder" onClick={this.addProductToCartEvent}>
              <ModalExample buttonLabel="Add To Cart" className="success-modal"/>
            </div>
            <a href="#" className="card-link btn btn-outline-dark">More Info...</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
