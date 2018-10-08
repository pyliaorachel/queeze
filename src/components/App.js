import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthComponent from './AuthComponent';
import Header from './Header';
import * as consts from '../utils/const';
import '../styles/App.css';

const styles = StyleSheet.create({
  title: {
    color: '#000',
    maxWidth: 300,
    fontSize: 56,
  },
});

class App extends AuthComponent {
  render() {
    return (
      <div className='appContainer'>
        <div>
          <Header />
          <h1 className={css(styles.title)}>
            { consts.TITLE }
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
