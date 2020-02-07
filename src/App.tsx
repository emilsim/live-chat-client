import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Registration from './screens/registration/Registration';
import Login from './screens/login/Login';
import axios from 'axios';
import Home from './screens/home/Home';
import UnauthemticatedHome from './screens/home/UnauthenticatedHome';


class App extends Component {
  render() {
    return (
      //<Header>
      <Switch>
        <Route exact path='/home' component={UnauthemticatedHome} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat" component={Chat} />
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

class NoAccess extends Component {
  render() {
    return (
      <div>401 _|_</div>
    );
  }
}

class Chat extends Component {
  render() {
    let authorized = false;
    let user;
    const json = localStorage.getItem('user');
    if (json) {
      user = JSON.parse(json);
      var expiredIn = user.payload.exp * 1000;
      var seconds = (new Date()).getTime();
      authorized = expiredIn > seconds;
    }

    if (!authorized) {
      localStorage.removeItem('user');
    }

    

    if (authorized) {
      // var axiosRequestionConfig: any = {
      //   headers: {
      //     'Authorization': user['id_token']
      //   }
      // };
      
      // axios.get("http://localhost:8080/api/users/" + user.payload.id, axiosRequestionConfig)
      //       .then((data: any) => {
      //           console.log(data);
      //       }).catch((err) => {
      //           console.log(err);
      //       });

      return <div>
        Добре дошли в чата!
      </div>
    } else {
      return <NoAccess></NoAccess>
    }
  }
}



export default App;
