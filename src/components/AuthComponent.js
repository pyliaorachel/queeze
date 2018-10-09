import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthComponent extends Component {
  constructor(props) {
    super(props);

    if (props.auth.token === '') {
      if (props.location.pathname !== '/login' && props.location.pathname !== '/register')
        props.history.push('/login');
    } else {
      if (props.location.pathname === '/login' || props.location.pathname === '/register')
        props.history.push('/');
    }
  }
};

export default AuthComponent;