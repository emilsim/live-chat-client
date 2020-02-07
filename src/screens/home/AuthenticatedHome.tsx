import React, { Component } from 'react';

export default class AuthemticatedHome extends Component<any, any> {

    render() {
        return (
            <p>Hello {this.props.user.nickname}</p>
        )
    }

}