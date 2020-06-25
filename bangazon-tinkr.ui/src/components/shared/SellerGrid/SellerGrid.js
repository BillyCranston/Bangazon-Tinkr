import React from 'react';
import SellerCard from '../SellerCard/SellerCard';

import './SellerGrid.scss';

class SellerGrid extends React.Component {
  state = {
    sellers: [],
  }

  renderSellerView = () => {
    const { sellers } = this.props;
    if (sellers.length !== 0) {
      return (
        sellers.filter((seller) => seller.firstName)
          .map((seller) => <SellerCard key={seller.userId} seller={seller} />)
      );
    }
    return (
      <h3>There are currently no Sellers available.</h3>
    );
  }

  render() {
    return (
      <div className="Sellers">
        <h1>Sellers</h1>
        <div className="card-group">
          {this.renderSellerView()}
        </div>
      </div>
    );
  }
}

export default SellerGrid;
