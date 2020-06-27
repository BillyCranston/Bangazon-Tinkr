import React from 'react';
import userData from '../../../helpers/data/userData';
import SellerGrid from '../../shared/SellerGrid/SellerGrid';

import './SearchSeller.scss';

class SearchSeller extends React.Component {
  state = {
    filteredSellers: [],
  }

  getSellerByInfo = () => {
    const sellerInfo = this.props.match.params.searchTerm;
    userData.getSellerByInfo(sellerInfo)
      .then((response) => {
        this.setState({
          filteredSellers: response,
        });
      })
      .catch((err) => console.error('error from get search seller', err));
  }

  componentDidMount() {
    const sellerInfo = this.props.match.params.searchTerm;
    this.getSellerByInfo(sellerInfo);
  }

  render() {
    return (
      <>
        <SellerGrid
          sellers={this.state.filteredSellers}
        />
      </>
    );
  }
}

export default SearchSeller;
