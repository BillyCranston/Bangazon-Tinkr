import React from 'react';
import './SearchInput.scss';
import productData from '../../../helpers/data/productData';
import Product from '../../pages/Products/Products';
class SearchInput extends React.Component {
  render() {
    const { searchTermChanged } = this.props;
    return (
      <>
      <input type="text" className="form-control" placeholder="Find something to Tinkr with..." aria-label="tinkrSearch" aria-describedby="basic-addon2" onChange={searchTermChanged} />
      <Product/>
      </>
    );
  }
}

export default SearchInput;