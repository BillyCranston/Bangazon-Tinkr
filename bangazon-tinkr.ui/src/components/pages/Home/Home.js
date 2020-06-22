import React from 'react';
import Dropdown from '../../shared/DropDown/DropDown';
import './Home.scss';
import SearchInput from '../../shared/SearchInput/SearchInput';

class Home extends React.Component {
  state = {
    selectedSearchType: '',
    searchTerm: '',
  }

  // function to search based on input of search bar. WIP
  searchTermChanged = (onChangeEvent) => {
    this.setState({ searchTerm: onChangeEvent.target.value });

    if (this.state.selectedSearchType === 'product') {
      const filteredProducts = this.state.originalProducts.filter((product) => {
        const filteredProductNameBySearch = product.name.includes(onChangeEvent.target.value);
        return filteredProductNameBySearch;
      });
      this.setState({ filteredRubbish: filteredProducts });
      this.selectedSearchType.router.push('/product/');
      // need to create a separate component to list Sellers
    } else if (this.state.selectedSearchType === 'seller') {
      // originalUsers will be an empty array in the State of the new Sellers component
      const filteredSellers = this.state.originalUsers.filter((user) => {
        const filteredSellerNameBySearch = user.name.includes(onChangeEvent.target.value);
        return filteredSellerNameBySearch;
      });
      this.setState({ filteredUsers: filteredSellers });
      this.selectedSearchType.router.push('/user/');
    }
  }

  // only works for console logging the value of 'Seller'. Likely an issue with the dropdown setup
  saveSearchType = (e) => {
    this.setState({ selectedSearchType: e.target.value });
    console.log(e.target.value);
  }

  // WIP
  SearchCategory = (e) => {
    this.setState({ selectedSearchType: e.target.value });
    if (e.keyCode === 13) {
      // this.selectedSearchType.router.push(`/product/`);
    }
  }

  render() {
    return (
      <div className="Home d-flex justify-content-center align-items-center">
        <div className=" home-container container d-flex justify-content-center align-items-center">
          <div className="row">
            <div className=" home-content col d-flex justify-content-center align-items-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Rubbish Refurbished</h1>
                <p className="lead">Tinkr is the place for amazing antiques, rustic relics, fantastic finds, broken bits, and everything in between. Simply search by name or category to find your next fix. </p>
              </div>
            </div>
            </div>
            <div className=" home-content col d-flex justify-content-center align-items-center">
              <div className="input-group mb-3">
                  <div className="input-group-append">
                  <SearchInput
                    searchTermChanged={this.searchTermChanged}
                  />
                  <Dropdown
                    dropDownChanged={this.saveSearchType}
                    viewChanged={this.SearchCategory}
                  />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
