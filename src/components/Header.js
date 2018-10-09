import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Navbar, Nav } from 'react-bootstrap';
import * as consts from '../utils/const';
import '../styles/App.css';

const styles = StyleSheet.create({
});

class Header extends Component {
  render() {
    return (
      <div className="appHeader">
        <Helmet
            title={consts.TITLE}
            titleTemplate={`%s - ${this.props.details}`}
        />

        <Navbar bg="light" variant="light" >
          <Navbar.Brand href="/">{ consts.TITLE }</Navbar.Brand>
          {
            (this.props.auth.token === '') ?
              null
            :
              (<Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <a href="/logout">Logout</a>
                </Navbar.Text>
              </Navbar.Collapse>)
          }
          </Navbar>
      </div>
    );
  }
}

export default Header;
