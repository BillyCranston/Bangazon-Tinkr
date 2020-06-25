import React from 'react';
import { Link } from 'react-router-dom';

import './SellerCard.scss';

class SellerCard extends React.Component {
  render() {
    const { seller } = this.props;
    return (
      <div className='column col-4'>
        <div className="card sellerCards">
        <div className="card-header">
          <h4 className="card-title">{seller.firstName}</h4>
          <h5 className="card-meta">{seller.lastName}</h5>
        </div>
        <div className="card-body">{seller.city}, {seller.state} {seller.zip}</div>
        <div className="card-footer">
          <Link to={`/products/${seller.userId}`} className="card-link btn btn-dark">{seller.firstName}'s Store</Link>
        </div>
        </div>
      </div>
    );
  }
}

export default SellerCard;
