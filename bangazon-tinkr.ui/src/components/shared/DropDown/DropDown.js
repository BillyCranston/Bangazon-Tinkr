import React, { useState } from 'react';

class DropDown extends React.Component { 
  
  state = { 
    selectedSearchType: ''
  }

  saveSearchType = (e) => {
    this.setState({selectedSearchType: e.target.value})
    console.log(e.target.value)
  }
  

  render() {
    return (
            <select className="form-control" value={this.state.selectedSearchType} id="searchOptions" onChange={this.saveSearchType}>
              <option defaultValue>Choose An Option</option>
              <option id="productOption" value="product">Products</option>
              <option id="productOption" value="seller">Seller</option>
            </select>
    );
  }
}

export default DropDown;