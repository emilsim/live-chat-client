import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import '../styles/form.scss';
import '../styles/index.scss';


interface LoginState {
    backRedirect: boolean,
    registrationRedirect: boolean,
}

export default class Login extends Component<{}, LoginState>{

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { backRedirect: false, registrationRedirect: false }
    }

    setBackRedirect = () => {
        this.setState({
            backRedirect: true,
        })
    }

    setRegistrationRedirect = () => {
        this.setState({
            registrationRedirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.backRedirect) {
            return <Redirect to='/home' />
        }
        if (this.state.registrationRedirect) {
            return <Redirect to='/registration' />
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.renderRedirect()}
                <header>
                    <nav>
                        <ul>
                            <li>
                                <button id="back_button" onClick={this.setBackRedirect}>
                                    <img src="back_icon.png" alt="Back" />
                                </button>
                            </li>
                            <li className="right_float">
                                Нямате регистрация?
                                <button id="registration" onClick={this.setRegistrationRedirect}>Регистрация</button>
                            </li>
                            <li className="active">Вход</li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <img src="robotPlusText2.png" alt="Robot plus text" />
                    <form id="form" method="POST" action="/login">
                        <h2>Форма за вход</h2>
                        <label htmlFor="nickname"
                        >Nickname:
                    <input name="nickname" id="nickname" type="text" placeholder="Nickname" />
                        </label>
                        <label htmlFor="password"
                        >Парола:
                    <input name="password" id="password" type="password" placeholder="Password" />
                        </label>
                        <button>Вход</button>
                    </form>
                </main>
            </React.Fragment>
        );
    }

}