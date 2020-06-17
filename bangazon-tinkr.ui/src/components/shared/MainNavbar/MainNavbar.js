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
    const buildLogoutBtn = () => {
      if (userAuthed) {
        return (
          <li class="nav-item">
              <a class="nav-link" href="#">Logout</a>
          </li>
        );
      }
      return (
        <li></li>
      );
    };
    return (
      <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="/">
          <img src={logo} width="250" alt="TINKR"/>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse order-1" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item dropdown">
              <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Rubbish
              </div>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="/products">All Rubbish</a>
                <a class="dropdown-item" href="#">Appliances</a>
                <a class="dropdown-item" href="#">Cars</a>
                <a class="dropdown-item" href="#">Clothing</a>
                <a class="dropdown-item" href="#">Electronics</a>
                <a class="dropdown-item" href="#">Furniture</a>
                <a class="dropdown-item" href="#">Pallets</a>
                <a class="dropdown-item" href="#">Sporting Goods</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse order-2" id="navbarText2">
          <ul class="navbar-nav ml-auto nav2">
            <li class="nav-item">
              <a class="nav-link" href="/shoppingCart">Cart</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/profile">Profile</a>
            </li>
            { buildLogoutBtn() }
          </ul>
        </div>
      </nav>
    );
  }
}

export default MainNavbar;
