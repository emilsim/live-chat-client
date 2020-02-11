import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom'
import Result from '../common/Result';
import jwt_decode from 'jwt-decode';
import '../styles/form.scss';
import '../styles/index.scss';

const url = "http://localhost:8080/api/login"


interface LoginState {
    backRedirect: boolean,
    registrationRedirect: boolean,
    nickname: string,
    password: string,
    result: string,
    color: string,
}

export default class Login extends Component<RouteComponentProps<{}>, LoginState>{

    constructor(props: Readonly<RouteComponentProps<{}>>) {
        super(props);
        this.state = {
            backRedirect: false,
            registrationRedirect: false,
            nickname: "",
            password: "",
            result: "",
            color: "",
        }
    }

    goToRegistration = () => {
        this.props.history.push('/registration');
    }

    goBack = () => {
        this.props.history.push('/home');
    }

    onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const { nickname, password } = this.state;
        axios({
            method: 'post', url: url, headers: { "Content-Type": "application/json" },
            data: { nickname: nickname, password: password }
        })
            .then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    const token = res.data['id_token']
                    const decoded = jwt_decode(token);

                    localStorage.setItem('user', JSON.stringify({ 'id_token': token, 'payload': decoded }));
                    this.goBack()
                } else {
                    const error = new Error(res.data)
                    throw error;
                }
            }).catch((err) => {
                console.error(err)
                this.setState({ result: `Неуспешен опит за вход в системата`, color: "#FF0000" })
            })
    }

    handleNickname = (e: any) => {
        const newNickname = e.target.value
        this.setState(prevState => ({ nickname: newNickname }))
    }

    handlePassword = (e: any) => {
        const newPassword = e.target.value
        this.setState(prevState => ({ password: newPassword }))
    }

    render() {
        const { result, color } = this.state;
        return (
            <React.Fragment>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <button id="back_button" onClick={this.goBack}>
                                    <img src="back_icon.png" alt="Back" />
                                </button>
                            </li>
                            <li className="right_float">
                                Нямате регистрация?
                                <button id="registration" onClick={this.goToRegistration}>Регистрация</button>
                            </li>
                            <li className="active">Вход</li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <img src="robotPlusText2.png" alt="Robot plus text" />
                    <form id="form" onSubmit={this.onSubmit}>
                        <Result resultText={result} colorHex={color} />
                        <h2>Форма за вход</h2>
                        <label htmlFor="nickname"
                        >Nickname:
                        <input name="nickname" id="nickname" type="text" placeholder="Nickname" onChange={this.handleNickname} required />
                        </label>
                        <label htmlFor="password"
                        >Парола:
                        <input name="password" id="password" type="password" placeholder="Password" onChange={this.handlePassword} required />
                        </label>
                        <button>Вход</button>
                    </form>
                </main>
            </React.Fragment>
        );
    }

}