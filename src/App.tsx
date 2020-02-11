import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from './screens/registration/Registration';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Chat from './screens/chat/Chat';
import NotFound from './screens/common/NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}

export default App;
