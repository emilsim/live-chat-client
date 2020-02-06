import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { User } from '../../models/user';
import Result from '../common/Result';
import '../styles/index.scss';
import '../styles/form.scss';

const url = "http://192.168.1.2:8080/api/user"

interface RegistrationState {
    backRedirect: boolean,
    loginRedirect: boolean,
    user: User,
    result: string,
    color: string
}

export default class Registration extends Component<{}, RegistrationState> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            backRedirect: false,
            loginRedirect: false,
            user: {
                firstName: "",
                lastName: "",
                nickname: "",
                email: "",
                password: ""
            },
            result: "",
            color: "",
        };
    }

    setBackRedirect = () => {
        this.setState({
            backRedirect: true,
        })
    }

    setLoginRedirect = () => {
        this.setState({
            loginRedirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.backRedirect) {
            return <Redirect to='/home' />
        }
        if (this.state.loginRedirect) {
            return <Redirect to='/login' />
        }
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        console.log(`Form submitted`)
        const user = JSON.stringify(this.state.user)
        console.log(user)
        axios({ method: 'post', url: url, headers: { "Content-Type": "application/json" }, data: user })
            .then((res) => {
                this.setState({ result: `Успешно се регистрирахте в системата, ${this.state.user.firstName}`, color: "#808000" });
                setTimeout(this.setLoginRedirect, 3000);
            }).catch((err) => this.setState({ result: `Неуспешно се регистрирахте в системата, ${this.state.user.firstName}`, color: "#FF0000" }))

        event.preventDefault()
    }

    handleUsername = (e: any) => {
        const { firstName, lastName, email, password } = this.state.user
        // this.state.user.nickname = e.target.value
        const newNickname = e.target.value
        this.setState(prevState => ({ user: { firstName, lastName, email, password, nickname: newNickname } }),
            () => console.log(this.state.user))
    }

    handleFirstName = (e: any) => {
        const { nickname, lastName, email, password } = this.state.user
        const newFirstName = e.target.value
        this.setState(prevState => ({ user: { firstName: newFirstName, lastName, email, password, nickname } }),
            () => console.log(this.state.user))
    }

    handleLastName = (e: any) => {
        const { nickname, firstName, email, password } = this.state.user
        const newLastName = e.target.value
        this.setState(prevState => ({ user: { firstName, lastName: newLastName, email, password, nickname } }),
            () => console.log(this.state.user))
    }

    handleEmail = (e: any) => {
        const { nickname, firstName, lastName, password } = this.state.user
        const newEmail = e.target.value
        this.setState(prevState => ({ user: { firstName, lastName, email: newEmail, password, nickname } }),
            () => console.log(this.state.user))
    }

    handlePassword = (e: any) => {
        const { nickname, firstName, lastName, email } = this.state.user
        const newPassword = e.target.value
        this.setState(prevState => ({ user: { firstName, lastName, email, password: newPassword, nickname } }),
            () => console.log(this.state.user))
    }

    render() {
        const { result, color } = this.state
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
                            <li className="active">Регистрация</li>
                            <li className="right_float">
                                Не сте влезнали в профила си?
                                <button id="login" onClick={this.setLoginRedirect}>Вход</button>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <img src="robotPlusText.png" alt="Robot plus text" />
                    <form id="form" onSubmit={this.handleSubmit} >
                        {result && <Result resultText={result} colorHex={color} />}
                        <h2>Регистрационна форма</h2>
                        <label htmlFor="name">Име:<input id="name" type="text" name="firstName" placeholder="First name" onChange={this.handleFirstName} required /></label>
                        <label htmlFor="lastName">Фамилия:<input id="lastName" type="text" name="lastName" placeholder="Last name" onChange={this.handleLastName} /></label>
                        <label htmlFor="nickname">Nickname:<input id="nickname" type="text" name="username" placeholder="Nickname" onChange={this.handleUsername} required /></label>
                        <label htmlFor="email">E-mail:<input id="email" type="email" name="email" placeholder="Email" onChange={this.handleEmail} required /></label>
                        <label htmlFor="password">Парола:<input id="password" type="password" name="password" placeholder="Password" onChange={this.handlePassword} required /></label>
                        <button>Регистрация</button>
                    </form>
                </main>
            </React.Fragment >
        )
    }

}