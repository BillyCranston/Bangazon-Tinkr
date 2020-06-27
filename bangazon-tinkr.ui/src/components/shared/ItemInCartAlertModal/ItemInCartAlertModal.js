import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const ItemInCartAlertModal = (props) => {
  const {
    buttonLabel,
    className,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="dark" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Stop!</ModalHeader>
        <ModalBody>
          You already have added that item to your cart. All items on this site are unique.  Please try searching for a new item if you want to continue shopping.  Otherwise, click on your cart when you are ready to check out!
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={toggle}>Close and keep Shopping</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ItemInCartAlertModal;
