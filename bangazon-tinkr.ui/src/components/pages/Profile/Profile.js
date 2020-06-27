import React from 'react';
import SellerDashboard from '../SellerDashboard/SellerDashboard';
import userData from '../../../helpers/data/userData';
import './Profile.scss';

class Profile extends React.Component {
  state = {
    // TODO: The below user will need to be updated once user authentication is implemented.
    // TEST NOTE: For testing you may need to change the userId below to something different depending on your data.  The user will need to have rubbish inside a LineItem linked to a completed Order.
    userId: 3,
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
    const { user, userId } = this.state;
    if (user.type !== 'buyer') {
      return (
        <SellerDashboard userId = { userId }/>
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
