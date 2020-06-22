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
    let demProducts = [];
    productData.getProductsByCategory(categoryId)
      .then((products) => {
        demProducts = products;
      })
      .catch((error) => console.error(error));
    console.log(demProducts);
    if (demProducts.length > 0) {
      return <p>{categoryId}, {demProducts[0].name}</p>;
    } else {
      return <p>Nothing in this category yet</p>
    }
    /* let domString = '';
    productData.getProductsByCategory(categoryId)
      .then((products) => {
        if (products.length > 0) {
          if (products.length > 3) {

            for (let i = 0; i < 3; i++) {
              domString += products[i].name;
            }
            return domString;
          } else {
            for (let i = 0; i < products.length; i++) {
              domString += products[i].name;
            }
            return domString;
          }
        } else {
          return 'Nothing in this category yet';
        }
      })
      .catch((err) => console.error(err)); */
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