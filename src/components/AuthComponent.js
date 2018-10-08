import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthComponent extends Component {
  constructor(props) {
    super(props);

    if (this.props.auth.token === '') {
      if (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/register')
        this.props.history.push('/login');
    } else {
      if (this.props.location.pathname === '/login' || this.props.location.pathname === '/register')
        this.props.history.push('/');
    }
  }
};

export default AuthComponent;