import React from 'react';

import ProductCard from '../../shared/ProductCard/ProductCard';

import productData from '../../../helpers/data/productData';

import './Categories.scss'

class Categories extends React.Component {
  state = {
    categories: [],
    products: []
  }

  getCategories = () => {
    productData.getCategories()
      .then((categories) => this.setState({ categories }))
      .catch((err) => console.error('error from getCategories in Categories', err));
  }

  getProducts = () => {
    productData.getProducts()
      .then((products) => this.setState({ products }))
      .catch((err) => console.error('error from getProducts in Categories', err));
  }

  showCategories = (categories) => {
    return (
      categories.map((category) => {
        return (
          <div key={category.categoryId}>
            <h2>{category.name}</h2>
            <div className="card-group">
              {this.getThreeRubbishes(category.categoryId)}
            </div>
          </div>
      )})
    );
  }

  getThreeRubbishes = (categoryId) => {
    const { products } = this.state;
    const rubbishInThisCategory = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].categoryId === categoryId) {
        rubbishInThisCategory.push(products[i]);
      }
    }

    if (rubbishInThisCategory.length > 0 && rubbishInThisCategory.length < 3) {
      return rubbishInThisCategory.map((product) => <ProductCard key={product.rubbishId} product={product} addProductToCart={this.addProductToCart} />);
    } else if (rubbishInThisCategory.length > 3) {
      const firstThree = rubbishInThisCategory.slice(0,3);
      return firstThree.map((product) => <ProductCard key={product.rubbishId} product={product} addProductToCart={this.addProductToCart} />);
    } else {
      return <p>Sorry, nothing in this category at the moment</p>
    }
    /* productData.getProductsByCategory(categoryId)
      .then((products) => {
        // console.log(products, categoryId);
        if (products.length > 0) {
          return <p>{categoryId}, {products[0].name}</p>;
        } else {
          return <p>Nothing in this category yet</p>
        }
      })
      .catch((error) => console.error(error)); */
  }

  componentDidMount() {
    this.getCategories();
    this.getProducts();
  }
  
  render() {
    const { categories } = this.state;
    return (
      <div className="Categories">
        <h1>All Categories</h1>
        {this.showCategories(categories)}
      </div>
    )
  }
}

export default Categories;