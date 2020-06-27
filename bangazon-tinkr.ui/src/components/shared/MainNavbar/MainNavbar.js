import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../images/navLogo.PNG';
import './MainNavbar.scss';

class MainNavbar extends React.Component {
  static propTypes = {
    userAuthed: PropTypes.bool,
  }

  logUserOut = (e) => {
    e.preventDefault();
    // TBD
  }

  render() {
    const { userAuthed } = this.props;
    const buildAuthedNav = () => {
      if (userAuthed) {
        return (

          <div className="collapse navbar-collapse order-2" id="navbarText2">
          <ul className="navbar-nav ml-auto nav2">
            <li className="nav-item">
              <a className="nav-link" href="/shoppingCart">Cart</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
        );
      }
      return (
        <div className="collapse navbar-collapse order-2" id="navbarText2">
          <ul className="navbar-nav ml-auto nav2">
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
          </ul>
        </div>
      );
    };
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="/">
          <img src={logo} width="250" alt="TINKR"/>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse order-1" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Rubbish
              </div>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/products">All Rubbish</a>
                <a className="dropdown-item" href="/categories">All Categories</a>
                <a className="dropdown-item" href="#">Appliances</a>
                <a className="dropdown-item" href="#">Cars</a>
                <a className="dropdown-item" href="#">Clothing</a>
                <a className="dropdown-item" href="#">Electronics</a>
                <a className="dropdown-item" href="#">Furniture</a>
                <a className="dropdown-item" href="#">Pallets</a>
                <a className="dropdown-item" href="#">Sporting Goods</a>
              </div>
            </li>
          </ul>
        </div>
            { buildAuthedNav() }
      </nav>
    );
  }
}

export default MainNavbar;
