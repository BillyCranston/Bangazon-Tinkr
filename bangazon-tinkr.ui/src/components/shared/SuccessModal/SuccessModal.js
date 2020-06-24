import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    isOpen,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="dark" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Success!</ModalHeader>
        <ModalBody>
          You have added a new item to your cart. Click on your cart when you are ready to check out!
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
