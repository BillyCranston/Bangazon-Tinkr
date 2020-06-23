import React from 'react';

class DropDown extends React.Component {
  state = {
    selectedSearchType: '',
  }

  render() {
    const { dropDownChanged } = this.props;
    const { viewChanged } = this.props;
    return (
             <select className="homeDropDown" value={this.state.selectedSearchType} id="searchOptions" onChange={dropDownChanged} onKeyDown={viewChanged}>
               <option id="productOption" value="product">Products</option>
               <option id="productOption" value="seller" defaultValue>Seller</option>
             </select>
    );
  }
}

export default DropDown;
