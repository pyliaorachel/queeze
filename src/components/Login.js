import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import Header from '../components/Header';
import Alert from '../components/Alert';
import * as consts from '../utils/const';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class Login extends AuthComponent {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage(msg) {
    this.setState({
      errorMessage: msg,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const credentials = {
      username: this.refs.username.value.trim(),
      password: this.refs.password.value.trim(),
    };
    this.props.login(credentials)
      .then(result => {
        if (result === 1) {
          this.props.history.push('/');
        } else {
          this.showMessage(result);
        }
      });
  }

  render() {
    return (
      <div className='appContainer'>
        <Header details='Login' />

        <h1>{ consts.TITLE }</h1>
        <h2>Login</h2>

        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" required ref="username" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required ref="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>

        <Link to="/register">New user registration</Link>

        <Alert variant='danger' message={this.state.errorMessage} />
      </div>
    );
  }
}

export default Login;