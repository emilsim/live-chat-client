import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Router, withRouter } from 'react-router-dom'
import NavBar from '../common/navbar';
import '../styles/home.scss';
import Chat from '../common/Chat';
import { RouterProps, RouteComponentProps } from 'react-router';

interface IHomeState {
    users?: any[],
    loading: boolean,
    authenticated: boolean,
    user?: any,
}

class UnauthemticatedHome extends Component<RouteComponentProps<{}>, IHomeState> { //Component<Props, State>

    constructor(props: any) {
        super(props);
        var authenticated = false;
        var payload;

        const json = localStorage.getItem('user');
        if (json) {
            var user = JSON.parse(json || "");
            var expiredIn = user.payload.exp * 1000;
            var seconds = (new Date()).getTime();
            authenticated = expiredIn > seconds;
            payload = user.payload;
        }

        this.state = { loading: false, authenticated, user: payload };
    }

    goToRegistration = () => {
        this.props.history.push('/registration');
    }

    goToLogin = () => {
        this.props.history.push('/login');
    }

    // onClick = (event: any) => {
    //     this.setState({ loading: true });
    //     axios.get("http://localhost:8080/api/users")
    //         .then((users: any) => {
    //             console.log(users);
    //             this.setState({ users: users.data, loading: false });
    //         }).catch((err) => {
    //             console.log(err);
    //             this.setState({ loading: false });
    //         });
    // }

    logout = () => {
        localStorage.removeItem('user');
        this.setState( { authenticated: false, user: undefined });
    }

    render() {
        const { users, loading, authenticated, user } = this.state;
        return (
            <React.Fragment>
                <header>
                    <nav>
                        <ul>
                            <li className="active">Начало</li>
                            {!authenticated && 
                            <li className="right_float">
                                Нямате регистрация? <button id="registration" onClick={this.goToRegistration}>Регистрация</button>
                            </li>}
                            {!authenticated && 
                            <li className="right_float">
                                Не сте влезнали в профила си? <button id="login" onClick={this.goToLogin}>Вход</button>
                            </li>
                            }
                            {authenticated && 
                            <li className="right_float">
                                Здравейте {user.nickname} <button id="login" onClick={this.logout}>Изход</button>
                            </li>
                            }
                        </ul>
                    </nav>
                </header>
                <main>
                    <h1>Присъедини се сега!</h1>
                    {<Chat chatTitle={"Глобален чат"} chatAddress={"global"} />}
                </main>

                {/* <div>
                    <div>Home</div>
                    <button onClick={this.onClick}>Get users</button>
                    {loading && <Loading></Loading>}
                    {users &&
                        users.forEach(u => {
                            return <div>
                                {u.id}
                            </div>
                        })
                    }
                </div> */}
            </React.Fragment>
        );
    }
}

class Loading extends Component {
    render() {
        return <div>Lodaing...</div>
    }
}

export default withRouter(UnauthemticatedHome);