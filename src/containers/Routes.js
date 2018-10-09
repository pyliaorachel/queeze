import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Quiz from './Quiz';
import QuizForm from './QuizForm';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route exact path="/quiz/create" component={QuizForm} />
      <Route path="/quiz/:quizName/edit" render={(props) => <QuizForm edit {...props} />} />
      <Route path="/quiz/:quizName" component={Quiz} />
    </Switch>
  </main>
);

export default Routes;
