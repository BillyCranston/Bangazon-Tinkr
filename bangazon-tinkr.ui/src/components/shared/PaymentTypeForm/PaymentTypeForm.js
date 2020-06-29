import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import userData from '../../../helpers/data/userData';

class PaymentTypeForm extends React.Component {
  state = {
    modal: false,
    accountNumber: 0,
    accountType: '',
  };

  static props = {
    addNewPayment: PropTypes.func,
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  savePaymentEvent = (e) => {
    e.preventDefault();
    const { currentUserId } = this.props;
    const { accountNumber, accountType } = this.state;
    const newPaymentObj = {
      userId: currentUserId,
      accountNo: parseInt(accountNumber, 10),
      pmtType: accountType,
    };
    userData.addNewPaymentType(newPaymentObj)
      .then(() => {
        this.toggle();
        this.props.getPaymentTypes(currentUserId);
      })
      .catch((err) => console.error('error from save Payment', err));
  }

  changeAccountNumber = (e) => {
    this.setState({ accountNumber: e.target.value });
  }

  changeAccountType = (e) => {
    this.setState({ accountType: e.target.value });
  }

  render() {
    const { accountNumber, accountType } = this.state;
    return (
      <div>
        <Button color="dark" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} >
          <ModalHeader>Add New Payment</ModalHeader>
          <ModalBody>
            <h6>Enter your information below to add a new payment type:</h6>
            <form className="modalForm m-1">
                <div className="form-group">
                  <label htmlFor="accountNo">Account Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="accountNo"
                    placeholder=""
                    value={accountNumber}
                    onChange={this.changeAccountNumber}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="acctType">Account Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="acctType"
                    placeholder=""
                    value={accountType}
                    onChange={this.changeAccountType}
                    required
                  />
                </div>
              </form>
          </ModalBody>
          <ModalFooter>
            <Button color="dark" onClick={this.savePaymentEvent}>Save</Button>
            <Button color="outline-dark" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PaymentTypeForm;
