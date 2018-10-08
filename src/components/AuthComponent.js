import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthComponent extends Component {
  constructor(props) {
    super(props);

    if (this.props.auth.token === '')
      this.props.history.push('/login');
    else
      this.props.history.push('/');
  }
};

export default AuthComponent;