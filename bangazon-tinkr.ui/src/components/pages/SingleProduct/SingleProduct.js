/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import productData from '../../../helpers/data/productData';
import orderData from '../../../helpers/data/orderData';

import './SingleProduct.scss';
import userData from '../../../helpers/data/userData';

class SingleProduct extends React.Component {
  state = {
    rubbish: {},
    seller: {},
    order: {},
    currentUserId: 3,
  }

  getSellerByRubbishId = () => {
    const rubbishId = this.props.match.params.productId;
    userData.getUserByRubbishId(rubbishId)
      .then((response) => this.setState({ seller: response }))
      .catch((err) => console.error('error in get seller by rubbish id', err));
  }

  getRubbish = (rubbishId) => {
    productData.getRubbishById(rubbishId)
      .then((response) => this.setState({ rubbish: response }))
      .catch((err) => console.error('error in get rubbish', err));
  }

  componentDidMount() {
    const rubbishId = this.props.match.params.productId;
    this.getRubbish(rubbishId);
    this.getSellerByRubbishId();
    this.getCurrentOrder();
  }

  getCurrentOrder = () => {
    const { currentUserId } = this.state;
    const orderObj = { userId: currentUserId };
    orderData.getOpenUserOrder(orderObj)
      .then((newOrder) => {
        this.setState({ order: newOrder });
      })
      .catch((err) => console.error('error from getCurrentOrder', err));
  }

  addProductToCart = (e) => {
    e.preventDefault();
    const { rubbish, order } = this.state;
    const itemObj = { rubbishId: rubbish.rubbishId, orderId: order.orderId };
    orderData.addItemToOrder(itemObj)
      // the below will take you back to the products page??
      .then(() => this.props.history.push('/products'))
      .catch((err) => console.error('error from addProductToCart', err));
  }

  render() {
    // const { rubbishId } = this.props.match.params;
    const { rubbish, seller } = this.state;
    return (
      <div className="SingleProduct container">
        <div className="row d-flex flex-wrap">
          <div className="col">
            <img src="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"/>
          </div>
          <div className="col">
            <h2>{rubbish.name}</h2>
            <Link to={`/products/${seller.userId}`}>Store: {seller.firstName} {seller.lastName}</Link>
            <p>{rubbish.description}</p>
            <p>{rubbish.isAvailable ? 'Still' : 'No longer'} available</p>
            <p>Price: ${rubbish.price}.00</p>
            <button onClick={this.addProductToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
