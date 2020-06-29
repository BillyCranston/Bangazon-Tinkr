import React from 'react';
import { Table } from 'reactstrap';

import './BuyerCard.scss';

class BuyerCard extends React.Component {
  render() {
    const { currentOrder } = this.props;
    return (
      <div className="BuyerCard">
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>OrderId</th>
              <th>DateCompleted</th>
              <th>Shipped Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{currentOrder.orderId}</td>
              <td>{currentOrder.dateCompleted}</td>
              <td>{currentOrder.isShipped}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BuyerCard;
