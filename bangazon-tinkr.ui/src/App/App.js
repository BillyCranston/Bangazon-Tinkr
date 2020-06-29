import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase';
import MainNavbar from '../components/shared/MainNavbar/MainNavbar';
import Home from '../components/pages/Home/Home';
import Products from '../components/pages/Products/Products';
import Profile from '../components/pages/Profile/Profile';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import SingleProduct from '../components/pages/SingleProduct/SingleProduct';
import Categories from '../components/pages/Categories/Categories';
import SellerStore from '../components/pages/SellerStore/SellerStore';
import SearchedRubbish from '../components/pages/SearchedRubbish/SearchedRubbish';
import SearchedSeller from '../components/pages/SearchedSeller/SearchedSeller';
import Login from '../components/pages/Login/Login';
import OrderCheckout from '../components/pages/OrderCheckout/OrderCheckout';

import './App.scss';
import fbConnection from '../helpers/data/connection';
import userData from '../helpers/data/userData';

fbConnection();

// const PublicRoute = ({ component: Component, authed, ...rest }) => {
//   const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
//   return <Route {...rest} render={(props) => routeChecker(props)} />;
// };

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    registeredUser: {},
    firebaseUser: {},
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((firebaseUser) => {
      firebaseUser.user.getIdToken()
      // save the token to the session storage
        .then((token) => sessionStorage.setItem('token', token))
        .then(() => {
        // fetch call
          userData.GetUserByEmail(firebaseUser.email)
            .then((response) => {
              const registeredUser = response.data;
              if (firebaseUser) {
              // call out to api/user by firebase email, ? internalUserId: currentUserObj.id
              // pass this into the id space on my link
                this.setState({ authed: true, registeredUser });
              } else {
                this.setState({ authed: false });
              }
            });
        });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, registeredUser } = this.state;
    return (
    <div className="App">
      <Router>
        <MainNavbar authed={authed} registeredUserId={registeredUser?.id} />
        <Switch>
          <Route path="/" exact component={Home} authed={authed} />
          <Route
            path='/login'
            render={() => (authed ? (
                <Redirect to='/home' />
            ) : (
                <Login />
            ))
            }
          />
          <PrivateRoute path="/profile" exact component={Profile} authed={authed} userObj={registeredUser}/>
          <PrivateRoute path="/shoppingCart" exact component={ShoppingCart} authed={authed} />
          <Route path="/products" exact component={Products} authed={authed} />
          <Route path="/product/:productId" exact component={SingleProduct} authed={authed} />
          <Route path="/categories" exact component={Categories} authed={authed} />
          <Route path="/products/:sellerId" exact component={SellerStore} authed={authed} />
          <Route path="/products/search/:searchTerm" exact component={SearchedRubbish} authed={authed} />
          <Route path="/sellers/:searchTerm" exact component={SearchedSeller} authed={authed} />
          <PrivateRoute path="/checkout" exact component={OrderCheckout} authed={authed} />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
