import React from 'react';

import ProductCard from '../../shared/ProductCard/ProductCard';

import productData from '../../../helpers/data/productData';
import orderData from '../../../helpers/data/orderData';

import './Categories.scss'

class Categories extends React.Component {
  state = {
    categories: [],
    products: [],
    currentUserId: 3,
    order: {},
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

  getCurrentOrder = () => {
    const { currentUserId } = this.state;
    const orderObj = { userId: currentUserId };
    orderData.getOpenUserOrder(orderObj)
      .then((newOrder) => {
        this.setState({ order: newOrder });
      })
      .catch((err) => console.error('error from getCurrentOrder', err));
  }

  addProductToCart = (productId) => {
    const { order } = this.state;
    const itemObj = { rubbishId: productId, orderId: order.orderId };
    orderData.addItemToOrder(itemObj)
      // once we are removing items from availability we can add additional function in .then section below:
      .then()
      .catch((err) => console.error('error from addProductToCart', err));
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
  }
  
  showCategories = (categories) => (
      categories.map((category) => (
          <div key={category.categoryId}>
            <h2>{category.name}</h2>
            <div className="card-group">
              {this.getThreeRubbishes(category.categoryId)}
            </div>
          </div>
      ))
    )

  componentDidMount() {
    this.getCategories();
    this.getProducts();
    this.getCurrentOrder();
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