import React from 'react';
import PropTypes from 'prop-types';
import './InventoryProductCard.scss';

class InventoryProductCard extends React.Component {
  static propTypes = {
    product: PropTypes.object,
  }

  render() {
    const { product } = this.props;
    return (
      <div className="InventoryProductCard col-3">
        <div className="card border-dark mb-3">
        {/* <img src="..." className="card-img-top cardImage" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
            <p className="card-text">{product.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default InventoryProductCard;
