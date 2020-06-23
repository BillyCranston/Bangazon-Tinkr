import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavbar from '../components/shared/MainNavbar/MainNavbar';

import Home from '../components/pages/Home/Home';
import Products from '../components/pages/Products/Products';
import Profile from '../components/pages/Profile/Profile';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import SellerStore from '../components/pages/SellerStore/SellerStore';
import SearchedRubbish from '../components/pages/SearchedRubbish/SearchedRubbish';

import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

// const PrivateRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };

class App extends React.Component {
  state = {
    authed: false,
  }

  // componentDidMount() {
  //   // add authentication here when ready
  //   this.setState({ authed: true });
  // }

  // componentWillUnmount() {
  //   this.removeListener();
  // }

  render() {
    const { authed } = this.state;
    return (
    <div className="App">
      <Router>
        <MainNavbar authed={authed} />
        <Switch>
          <PublicRoute path="/" exact component={Home} authed={authed} />
          <PublicRoute path="/profile" exact component={Profile} authed={authed} />
          <PublicRoute path="/shoppingCart" exact component={ShoppingCart} authed={authed} />
          <PublicRoute path="/products" exact component={Products} authed={authed} />
          <PublicRoute path="/product/:productId" exact component={SingleProduct} authed={authed} />
          <PublicRoute path="/products/:sellerId" exact component={SellerStore} authed={authed} />
          <PublicRoute path="/products/search/:searchTerm" exact component={SearchedRubbish} authed={authed} />

        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
