import React, { Component } from 'react';
import UnauthemticatedHome from './UnauthenticatedHome';
import AuthenticatedHome from './AuthenticatedHome';
import axios from 'axios';

const url = "http://192.168.1.2:8080/api/checkToken"

interface HomeState {
    authenticated: boolean,
    user?: any,
}

export default class Home extends Component<{}, HomeState>{

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            authenticated: false,
        };
    }

    componentDidMount = () => {
        this.isAuthenticated();
    }

    isAuthenticated = () => {

        const json = localStorage.getItem('user');
        if (json) {
            var user = JSON.parse(json || "");
            var expiredIn = user.payload.exp * 1000;
            var seconds = (new Date()).getTime();
            console.log('kur ' + expiredIn)
            console.log('kur ' + seconds)
            if (expiredIn > seconds) {
                console.log('success')
                this.setState({ authenticated: true, user })
            };
        }


    }

    render() {
        return this.state.authenticated ? <AuthenticatedHome user={this.state.user} /> : <UnauthemticatedHome />
    }
}