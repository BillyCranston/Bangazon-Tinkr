import React from 'react';

import productData from '../../../helpers/data/productData';

import './SingleProduct.scss';

class SingleProduct extends React.Component {
  state = {
    rubbish: {},
  }

  getRubbish = (rubbishId) => {
    productData.getRubbishById(rubbishId)
      .then((response) => /* console.log(response))// */this.setState({ rubbish: response }))
      .catch((err) => console.error('error in get rubbish', err));
  }

  componentDidMount() {
    const rubbishId = this.props.match.params.productId;
    this.getRubbish(rubbishId);
  }

  render() {
    // const { rubbishId } = this.props.match.params;
    const { rubbish } = this.state;
    return (
      <div className="SingleProduct">
        <h2>Product Name {rubbish.name}</h2>
        {/* title, description, quantity available, price per unit, and a button labeled Add to Cart */}
        <p>Description</p>
        <p>Quantity available</p>
        <p>Price:</p>
        <button>Add to Cart</button>
      </div>
    );
  }
}

export default SingleProduct;
