import React from 'react';

import ProductCard from '../../shared/ProductCard/ProductCard';

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
    return (
      categories.map((category) => {
        return (
          <div key={category.categoryId}>
            <h2>{category.name}</h2>
            {this.getThreeRubbishes(category.categoryId)}
          </div>
      )})
    );
  }

  getThreeRubbishes = (categoryId) => {
    let domString = '';
    productData.getProductsByCategory(categoryId)
      .then((products) => {
        // for (let i = 0; i < 3; i++) {
          // domString += <ProductCard key={products[i].rubbishId} product={products[i]}/>;
          products ? 
            domString += <ProductCard key={products[0].rubbishId} product={products[0]}/>
            :
            domString += 'Sorry, nothing here';
          
        // }
        return domString;
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getCategories();
  }
  
  render() {
    const { categories } = this.state;
    return (
      <div className="Categories">
        <h1>All Categories</h1>
        {categories[0] ? this.showCategories(categories) : ''}
      </div>
    )
  }
}

export default Categories;