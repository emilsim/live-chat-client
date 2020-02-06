import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import '../styles/form.scss';
import '../styles/index.scss';
import Result from '../common/Result';

const url = "http://192.168.1.2:8080/api/login"


interface LoginState {
    backRedirect: boolean,
    registrationRedirect: boolean,
    nickname: string,
    password: string,
    result: string,
    color: string,
}

export default class Login extends Component<{}, LoginState>{

    constructor(props: Readonly<{}>) {
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

    onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const { nickname, password } = this.state;
        axios({
            method: 'post', url: url, headers: { "Content-Type": "application/json" },
            data: { nickname: nickname, password: password }
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    // this.props.history.push('/home');
                    this.setBackRedirect()
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
        this.setState(prevState => ({ nickname: newNickname }),
            () => console.log(this.state.nickname))
    }

    handlePassword = (e: any) => {
        const newPassword = e.target.value
        this.setState(prevState => ({ password: newPassword }),
            () => console.log(this.state.password))
    }

    render() {
        const { result, color } = this.state;
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