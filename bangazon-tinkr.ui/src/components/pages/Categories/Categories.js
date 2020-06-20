import React from 'react';

// import ProductCard from '../../shared/ProductCard/ProductCard';

import productData from '../../../helpers/data/productData';

import './Categories.scss'

class Categories extends React.Component {
  state = {
    categories: []
  }

  getCategories = () => {
    productData.getCategories()
      .then((categories) => this.setState({ categories }))
      .catch((err) => console.error('error from getCategories in Categories', err));
  }

  /* showCategories = () => {
    return (
      <h2>{this.state.categories[0].Name}</h2>
    )
  } */

  /* getThreeRubbishes = (categoryId) => {
    const domString = '';
    productData.getProductsByCategory(categoryId)
      .then((products) => {
        for (let i = 0; i < 3; i++) {
          domString += <ProductCard key={products[i].rubbishId} product={products[i]}/>;
          
        }
        return domString;
      })
      .catch((err) => console.error(err));
  } */

  componentDidMount() {
    this.getCategories();
  }
  
  render() {
    const { categories } = this.state;
    return (
      <div className="Categories">
        <h1>All Categories</h1>
        <h2>Appliances</h2>
        {/* this.getThreeRubbishes(5) */}
        <h2>{categories[0] ? categories[0].name : ''}</h2>
      </div>
    )
  }
}

export default Categories;