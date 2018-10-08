import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Nav } from 'react-bootstrap';
import * as consts from '../utils/const';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class Header extends Component {
  render() {
    return (
      <div className='appContainer'>
        <Helmet
            title={consts.TITLE}
            titleTemplate={`%s - ${this.props.details}`}
        />
        <Nav>
          <Nav.Item>
            <Nav.Link href="/">{ consts.TITLE }</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default Header;
