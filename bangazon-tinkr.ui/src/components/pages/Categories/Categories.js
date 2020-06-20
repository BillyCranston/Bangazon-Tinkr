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

  showCategories = (categories) => {
    console.log(categories.map((category) => category.name));
    return (
      categories.map((category) => <h2>{category.name}</h2>)
    );
  }

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
        {/* this.getThreeRubbishes(5) */}
        {categories[0] ? this.showCategories(categories) : ''}
      </div>
    )
  }
}

export default Categories;