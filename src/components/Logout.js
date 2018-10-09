import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import Header from './Header';
import * as consts from '../utils/const';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className='appContainer'>
        <Header details='Logout' />

        <h1>{ consts.TITLE }</h1>
        <h2>Logging out...</h2>
      </div>
    );
  }
}

export default Logout;