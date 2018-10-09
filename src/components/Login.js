import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, ButtonGroup, Row } from 'react-bootstrap';
import AuthComponent from './AuthComponent';
import Header from '../containers/Header';
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
    this.gotoRegistration = this.gotoRegistration.bind(this);
  }

  showMessage(msg) {
    this.setState({
      errorMessage: msg,
    });
  }

  onSubmit() {
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

  gotoRegistration() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div className='appContainer'>
        <Header details='Login' />

        <Row className="justify-content-md-center">
          <h2>Login</h2>
        </Row>

        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" required ref="username" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required ref="password" />
          </Form.Group>
        </Form>

        <Row className="justify-content-md-center">
          <ButtonGroup vertical className="mt-3">
            <Button variant="primary" type="submit" onClick={this.onSubmit}>
              Login
            </Button>
            <Button variant="link" onClick={this.gotoRegistration}>
              New user registration
            </Button>
          </ButtonGroup>
        </Row>

        <Alert variant='danger' message={this.state.errorMessage} />
      </div>
    );
  }
}

export default Login;