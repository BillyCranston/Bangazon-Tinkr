import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropDown = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Search
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Rubbish</DropdownItem>
        <DropdownItem>Seller</DropdownItem>
        <DropdownItem>Buyer</DropdownItem>
        <DropdownItem  divider />
        <DropdownItem disabled>Order</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
}

export default DropDown;