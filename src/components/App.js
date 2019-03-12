// @flow
import React from 'react';
import { Route, Switch } from 'react-router';
import AuthRoute from './custom_routes/AuthRoute';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import FlashMessages from './utility/flash/FlashMessages';
import AuthorizedApp from './AuthorizedApp';
import Footer from './footer/Footer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <FlashMessages />
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <AuthRoute path="/" component={AuthorizedApp} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
