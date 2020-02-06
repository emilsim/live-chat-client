import React, { Component, ReactNode } from 'react';

export default class Chat extends Component<{ chatTitle: ReactNode, chatAddress: ReactNode }, {}> {

    constructor(props: Readonly<{ chatTitle: any, chatAddress: any }>) {
        super(props)
    }

    render() {
        return (
            <div id="chats">
                <a href={`/chat/${this.props.chatAddress}`}>
                    <section>{this.props.chatTitle}</section>
                </a>
            </div>
        )
    }
}