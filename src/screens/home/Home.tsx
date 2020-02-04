import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import NavBar from '../common/navbar';
import '../styles/home.scss';

interface IHomeState {
    users?: any[],
    loading: boolean,
    registrationRedirect: boolean,
    loginRedirect: boolean,
}

export default class Home extends Component<{}, IHomeState> { //Component<Props, State>

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { loading: false, registrationRedirect: false, loginRedirect: false };
    }

    setRegistrationRedirect = () => {
        this.setState({
            registrationRedirect: true
        })
    }

    setLoginRedirect = () => {
        this.setState({
            loginRedirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.registrationRedirect) {
            return <Redirect to='/registration' />
        }
        if (this.state.loginRedirect) {
            return <Redirect to='/login' />
        }
    }



    onClick = (event: any) => {
        this.setState({ loading: true });
        axios.get("http://localhost:8080/api/users")
            .then((users: any) => {
                console.log(users);
                this.setState({ users: users.data, loading: false });
            }).catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render() {
        const { users, loading } = this.state;
        return (
            <React.Fragment>
                {this.renderRedirect()}
                <header>
                    <nav>
                        <ul>
                            <li className="active">Начало</li>
                            <li className="right_float">
                                Нямате регистрация? <button id="registration" onClick={this.setRegistrationRedirect}>Регистрация</button>
                            </li>
                            <li className="right_float">
                                Не сте влезнали в профила си? <button id="login" onClick={this.setLoginRedirect}>Вход</button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h1>Присъедини се сега!</h1>
                </main>

                <div>
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
                </div>
            </React.Fragment>
        );
    }
}

class Loading extends Component {
    render() {
        return <div>Lodaing...</div>
    }
}