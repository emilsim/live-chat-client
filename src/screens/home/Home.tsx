import React, { Component } from 'react';
import UnauthemticatedHome from './UnauthenticatedHome';
import AuthenticatedHome from './AuthenticatedHome';
import axios from 'axios';

const url = "http://192.168.1.2:8080/api/checkToken"

interface HomeState {
    authenticated: boolean,
}

export default class Home extends Component<{}, HomeState>{

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            authenticated: false,
        }
        this.isAuthenticated();
    }

    isAuthenticated = () => {
        axios.get(url)
            .then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    this.setState({ authenticated: true })
                }
            })
    }

    render() {
        return this.state.authenticated ? <AuthenticatedHome /> : <UnauthemticatedHome />
    }
}