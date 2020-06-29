import React from 'react';

class CheckoutTableRow extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <tr>
        <td>{product.rubbishName}</td>
        <td>${product.rubbishPrice}.00</td>
      </tr>
    );
  }
}

export default CheckoutTableRow;
