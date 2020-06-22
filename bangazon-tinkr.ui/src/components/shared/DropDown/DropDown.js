import React, { useState } from 'react';

class DropDown extends React.Component { 
  
  state = { 
    selectedSearchType: ''
  }

  render() {
    const {dropDownChanged} = this.props;
    const {viewChanged} = this.props;
    return (
            <select className="form-control" value={this.state.selectedSearchType} id="searchOptions" onChange={dropDownChanged} onKeyDown={viewChanged}>
              <option id="productOption" value="product" defaultValue>Products</option>
              <option id="productOption" value="seller">Seller</option>
            </select>
    );
  }
}

export default DropDown;