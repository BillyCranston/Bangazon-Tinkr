import React from 'react';
import SellerDashboard from '../SellerDashboard/SellerDashboard';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    // TODO: The below user will need to be updated once user authentication is implemented.
    user: {},
    userId: 3,
    order: {},
  }

  renderSellerDashboard = () => {
    const { user } = this.state;
    if (user.type !== 'buyer') {
      return (
        <SellerDashboard />
      );
    }
    return (
      <div></div>
    );
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
          {this.renderSellerDashboard()}
        </div>
      </div>
    );
  }
}

export default Profile;
