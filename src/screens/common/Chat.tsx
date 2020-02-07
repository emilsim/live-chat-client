import React, { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default class Chat extends Component<{ chatTitle: ReactNode, chatAddress: ReactNode }, {}> {

    constructor(props: Readonly<{ chatTitle: any, chatAddress: any }>) {
        super(props)
    }

    logout = () => {
        localStorage.removeItem('user');
        this.setState( { authenticated: false, user: undefined });
    }

    render() {
        return (
            <div id="chats">
                <Link to={`/chat`}>
                    <section>{this.props.chatTitle}</section>
                </Link>
            </div>
        )
    }
}