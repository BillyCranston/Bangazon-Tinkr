import React from 'react';
import { Link } from 'react-router-dom';

import authRequests from '../../../helpers/data/auth';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .registerUser(user)
      .then(() => {
        this.props.history.push('/trainers');
      });
  }
}