import React from 'react';
import CheckoutTableRow from '../../shared/CheckoutTableRow/CheckoutTableRow';
import userData from '../../../helpers/data/userData';
import PaymentTypeForm from '../../shared/PaymentTypeForm/PaymentTypeForm';
import orderData from '../../../helpers/data/orderData';

class OrderCheckout extends React.Component {
  state = {
    products: [],
    user: {},
    order: {},
    itemTotal: 0,
    orderTax: 0,
    shipping: 0,
    paymentTypes: [],
    selectedPaymentType: 0,
    checkoutStatus: 'Incomplete',
  }

  // *Checkout Procedure */
  // TODO: when the user clicks the checkout button, they should be presented with an option to checkout - COMPLETE - sends to checkout view
  // TODO: render checkout view -
  //      1) table generated for list items, - COMPLETE
  //      2) order total information, - COMPLETE
  //      3) load user information too - COMPLETE
  // Prompt user to verify their payment information, pre-populate their default? - Select Drop down included - COMPLETE
  //      TODO:  Need to add event that changes state on selection
  // TODO: if none is available then they should be prompted to enter their payment information
  // TODO: submit button should not be able to be clicked until payment has been selected
  // TODO: once submitted the application should complete the following tasks:
  //   1. check that items in cart are still available
  //   2. update the order to complete
  //   3. mark all order items as unavailable
  // notify user the order is completed

  componentDidMount() {
    this.setState({
      products: this.props.location.state.products,
      user: this.props.location.state.user,
      order: this.props.location.state.order,
      itemTotal: this.props.location.state.itemTotal,
      orderTax: this.props.location.state.orderTax,
      shipping: this.props.location.state.shipping,
    });
    this.getPaymentTypes(this.props.location.state.user.userId);
  }

  getPaymentTypes = (userId) => {
    userData.getAllPaymentTypes(userId)
      .then((result) => {
        this.setState({ paymentTypes: result });
      })
      .catch((err) => console.error('error from getPaymentTypes', err));
  }

  savePaymentTypeEntry = (e) => {
    e.preventDefault();
    this.setState({ selectedPaymentType: e.target.value });
  }

  completeOrder = (e) => {
    e.preventDefault();
    const { order, selectedPaymentType } = this.state;
    orderData.updatePayment(order.orderId, selectedPaymentType)
      .then(() => {
        orderData.completeOrder(order.orderId)
          .then(() => {
            this.setState({ checkoutStatus: 'Completed' });
          })
          .catch((err) => console.error('error from complete order', err));
      })
      .catch((err) => console.error('error from update payment', err));
  }

  renderCheckoutList = () => {
    const { products } = this.state;
    if (products.length !== 0) {
      return (
        products.map((product) => <CheckoutTableRow product={product} />)
      );
    } return <div>Still nothing in your cart, maybe grab a few things?</div>;
  }

  renderCartSummary = () => {
    const {
      itemTotal,
      shipping,
      orderTax,
      selectedPaymentType,
    } = this.state;

    return (
      <div className="col-4">
      <h2 className="mb-3">Cart Summary:</h2>
      <table className="w-100">
        <tbody>
          <tr>
            <td>Items:</td>
            <td>${itemTotal}.00</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td>${shipping}.00</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>${orderTax}</td>
          </tr>
          <tr>
            <td><hr></hr></td>
            <td><hr></hr></td>
          </tr>
          <tr>
            <td><strong>Order Total:</strong></td>
            <td><strong>${itemTotal + shipping + orderTax}.00</strong></td>
          </tr>
        </tbody>
      </table>
      { (selectedPaymentType === 0)
        ? <div className="btn btn-sm btn-dark disabled p-3">Checkout</div>
        : <div className="btn btn-sm btn-dark p-3" onClick={this.completeOrder}>Checkout</div> }
    </div>
    );
  }

  renderCheckoutInProgress = () => {
    const {
      user,
      paymentTypes,
      selectedPaymentType,
    } = this.state;

    return (
    <div className="row">

          <div className="col-4">
            <h2>Purchase Details</h2>
            <table>
              <tbody>
              <th>Prouduct Name</th>
              <th>Price</th>
              {this.renderCheckoutList()}
            </tbody>
            </table>
          </div>

          <div className="col-4">
            <h2>Payment and Shipping</h2>
            <div className="row"><h6>Payment:</h6></div>
            <div className="row">
              <select className="form-control" value={selectedPaymentType} onChange={this.savePaymentTypeEntry}>
                <option defaultValue>Select a Payment...</option>
                { paymentTypes.map((p) => <option key={p.paymentTypeId} value={p.paymentTypeId}>{p.pmtType}     {p.accountNo}</option>)}
              </select>
            </div>
            <PaymentTypeForm buttonLabel={'Add New Payment'} currentUserId={user.userId} getPaymentTypes={this.getPaymentTypes}/>
            {/* <div className="row btn btn-sm btn-outline-dark disabled">Add New Payment</div> */}
            <h6 className="row">Shipping Information:</h6>
            <div className="row">
            <div className="col-6">
            <div className="row">{user.streetAddress}</div>
            <div className="row">{user.city}, {user.state}  {user.zip}</div>
            <div className="row btn-sm btn btn-outline-dark disabled">Change Address</div>
            </div>
            <image className="col-6">Some cool map image</image>
            </div>
          </div>

          { this.renderCartSummary() }

        </div>
    );
  }

  renderCompletedOrderStatus = () => {
    return (
      <h3>You have completed an order!</h3>
    )
  }

  render() {
    const { checkoutStatus } = this.state;
    return (
      <div className="orderCheckout">
        { (checkoutStatus === 'Incomplete') ? this.renderCheckoutInProgress() : this.renderCompletedOrderStatus() }
      </div>
    );
  }
}

export default OrderCheckout;
