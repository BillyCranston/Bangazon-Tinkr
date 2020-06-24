import React from 'react';

import './DropDownBtns.scss';

class DropDownBtns extends React.Component {
  state = {
    selectedSearchType: '',
  }

  render() {
    const { dropDownChanged } = this.props;
    return (
             <select className="homeDropDown" value={this.state.selectedSearchType} id="searchOptions" onChange={dropDownChanged}>
               <option id="productOption" value="product">Products</option>
               <option id="productOption" value="seller" defaultValue>Seller</option>
             </select>
    );
  }
}

export default DropDownBtns;
