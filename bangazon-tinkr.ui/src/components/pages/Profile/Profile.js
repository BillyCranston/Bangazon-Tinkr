import React from 'react';
import SellerDashboard from '../SellerDashboard/SellerDashboard';
import BuyerProfile from '../BuyerProfile/BuyerProfile';
import userData from '../../../helpers/data/userData';
import './Profile.scss';
import BuyerCard from '../../shared/BuyerCard/BuyerCard';
import SellerStore from '../SellerStore/SellerStore';

class Profile extends React.Component {
  state = {
    // TODO: The below user will need to be updated once user authentication is implemented.
    // TEST NOTE: For testing you may need to change the userId below to something different depending on your data.  The user will need to have rubbish inside a LineItem linked to a completed Order.
    userId: 2,
    user: {},
  }

  getUserById = () => {
    const { userId } = this.state;
    userData.getUser(userId)
      .then((user) => {
        this.setState({ user });
      })
      .catch((err) => console.error('error from get user', err));
  }

  componentDidMount() {
    this.getUserById();
  }

  renderSellerDashboard = () => {
    const { userId } = this.state;
    return (
      <SellerDashboard userId = { userId }/>
    );
  };

  renderBuyerProfile = () => {
    const { userId } = this.state;
    return (
      <BuyerProfile userId = { userId } />
    );
  }

  renderBuyerAndSellerProfile = () => {
    const { userId } = this.state;
    return (
      <BuyerProfile userId = { userId } />,
      <SellerStore userId = { userId } />
    );
  }

  renderSwitchProfile = () => {
    const { user } = this.state;
    switch (user.type) {
      case 'Buyer':
        return this.renderBuyerProfile();
      default:
        return this.renderSellerDashboard();
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="Profile">
        <h1>Profile Page</h1>
        <h2> First Name: {user.firstName}</h2>
        <h2> Last Name: {user.lastName}</h2>
        <h3> Address: {user.type}</h3>
        <h3> Account Creation: {user.dateCreated}</h3>
        <h3> Address: {user.streetAddress}</h3>
        <h3> City: {user.city}</h3>
        <h3> State: {user.state}</h3>
        <h3> Zip: {user.zip}</h3>
        <div className="row">
          {this.renderSwitchProfile(user.type)}
        </div>
      </div>
    );
  }
}

export default Profile;
