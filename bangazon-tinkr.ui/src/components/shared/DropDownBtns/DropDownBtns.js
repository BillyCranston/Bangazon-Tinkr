import React from 'react';

import './DropDownBtns.scss';

class DropDownBtns extends React.Component {
  state = {
    selectedSearchType: '',
  }

  render() {
    const { dropDownChanged } = this.props;
    
    return (
      <select className="homeDropDown" defaultValue={this.state.selectedSearchType} id="searchOptions" onChange={dropDownChanged}>
        <option id="productOption" value="DEFAULT" disabled>Choose an option...</option>
        <option id="productOption" value="products">Products</option>
        <option id="productOption" value="sellers" >Sellers</option>
      </select>
    );
  }
}

export default DropDownBtns;
