import React from 'react';

import orderData from '../../../helpers/data/orderData';

import './ProductCard.scss';

class ProductCard extends React.Component {
  // static propTypes = {
  //   product: productShape.productShape,
  // }

  // componentDidMount() {
  //   const { product } = this.props;
  // }

  addProductToCart = () => {
    const itemObj = { productId: '', orderId: '' };
    orderData.addItemToOrder(itemObj);
  }

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
            <btn className="card-link btn btn-dark">Add To Cart</btn>
            <btn href="#" className="card-link btn btn-outline-dark">More Info...</btn>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
