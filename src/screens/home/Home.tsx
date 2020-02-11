import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import ChatBox from '../common/ChatBox';
import { RouteComponentProps } from 'react-router';
import '../styles/home.scss';

interface HomeState {
    authenticated: boolean,
    user?: any,
}

class Home extends Component<RouteComponentProps<{}>, HomeState> {

    constructor(props: Readonly<RouteComponentProps<{}>>) {
        super(props);
        let authenticated = false;
        let payload;

        const json = localStorage.getItem('user');
        if (json) {
            let user = JSON.parse(json || "");
            let expiredIn = user.payload.exp * 1000;
            let seconds = (new Date()).getTime();
            authenticated = expiredIn > seconds;
            payload = user.payload;
        }

        this.state = { authenticated, user: payload };
    }

    goToRegistration = () => {
        this.props.history.push('/registration');
    }

    goToLogin = () => {
        this.props.history.push('/login');
    }

    logout = () => {
        localStorage.removeItem('user');
        this.setState({ authenticated: false, user: undefined });
    }

    render() {
        const { authenticated, user } = this.state;
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
                    {<ChatBox chatTitle={"Глобален чат"} chatAddress={"global"} />}
                </main>
            </React.Fragment>
        );
    }
}

export default withRouter(Home);