import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from './screens/home/UnauthenticatedHome';
import Registration from './screens/registration/Registration';
import Login from './screens/login/Login';


class App extends Component {
  render() {
    return (
      //<Header>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/404" component={NotFound} />
        {/* <SecureRoute path='/About' component={AboutScene} /> */}
        <Redirect to="/404" />
      </Switch>
      // </Header> 

    );
  }
}

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <section>

          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </section>
        {this.props.children}
      </React.Fragment>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div>About</div>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <div>404 _|_</div>
    );
  }
}

export default App;
