import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
    </Switch>
  </main>
);

export default Routes;
