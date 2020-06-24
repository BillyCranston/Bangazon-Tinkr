import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ProductCard.scss';
import ModalExample from '../SuccessModal/SuccessModal';
import ItemInCartAlertModal from '../ItemInCartAlertModal/ItemInCartAlertModal';

class ProductCard extends React.Component {
  // state = {
  //   success: '',
  // }

  static propTypes = {
    addProductToCart: PropTypes.func,
  }

  addProductToCartEvent = (e) => {
    e.preventDefault();
    const { product, addProductToCart } = this.props;
    const result = addProductToCart(product.rubbishId);
    if (result === 'Item already in cart') {
      return <ItemInCartAlertModal isOpen={true} />;
    } return <ModalExample isOpen={true} buttonLabel="Add To Cart" className="success-modal"/>;
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
            <div className="modal-holder btn btn-dark" onClick={this.addProductToCartEvent}>Add To Cart</div>
              {/* <ModalExample buttonLabel="Add To Cart" className="success-modal"/> */}
            <Link to={`/product/${product.rubbishId}`} className="card-link btn btn-outline-dark">More Info...</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
