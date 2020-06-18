import React from 'react';
import ProductCard from '../../shared/ProductCard/ProductCard';
import productData from '../../../helpers/data/productData';
import userData from '../../../helpers/data/userData';

import './SellerStore.scss';

class SellerStore extends React.Component {
  state = {
    products: [],
    seller: {},
  }

  getSellerByUserId = (userId) => {
    userData.getUserById(userId)
      .then((seller) => {
        this.setState({ seller });
      })
      .catch((err) => console.error('error from get seller by user id', err));
  }

  getProductsByUserId = (userId) => {
    productData.getProductsByUserId(userId)
    .then((products) => {
      this.setState({ products });
    })
    .catch((err) => console.error('error from get products by user id', err));
  }

  // where to grab user Id from?
  componentDidMount(userId) {
    this.getSellerByUserId(userId);
    this.getProductsByUserId(userId);
  }

  render() {
    return (
      //
    );
  }

}

export default SellerStore;