import React from 'react';
import Dropdown from '../../shared/DropDown/DropDown';
import Products from '../Products/Products';
import './Home.scss';
import SearchInput from '../../shared/SearchInput/SearchInput';

class Home extends React.Component {
  state = {
    selectedSearchType: "",
    searchTerm: "",
  }
  
  searchTermChanged = (onChangeEvent) => {
    this.setState({searchTerm: onChangeEvent.target.value});
    if (this.state.selectedSearchType === "product") {
      var filteredProducts = this.state.originalProducts.filter((product) => {
        return product.name.includes(onChangeEvent.target.value);
    
      });
      this.setState({filteredProducts: filteredProducts});
      this.selectedSearchType.router.push("/product/") //where does this go
    } else if (this.state.selectedSearchType === "seller") {
      // filter the users
    }
  }

  saveSearchType = (e) => {
    this.setState({selectedSearchType: e.target.value})
    console.log(e.target.value)
    
  }

  SearchCategory = (e) => {
      this.props.history.push(`/products/search/${this.state.searchTerm}`)
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
                  />
                  <button onClick={this.SearchCategory}>Search</button>
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
