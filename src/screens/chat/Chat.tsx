import React, { Component } from "react";
import NoAccess from "../common/NoAccess";
import io from "socket.io-client";
import axios from 'axios';
import { Message } from "../../models/message";
import { animateScroll } from "react-scroll";
import { RouteComponentProps } from "react-router";
import { withRouter } from 'react-router-dom'
import "../styles/index.scss"
import "../styles/chatPage.scss"
import Loading from "../common/Loading";

const chatUsersUrl = "http://localhost:8080/api/users";
const chatMessagesUrl = "http://localhost:8080/api/chat/global"; //chat name

interface ChatState {
    authorized: boolean,
    user: any,
    response: any,
    username: string,
    message: string,
    messages: Array<Message>,
    users: { [index: string]: string }
}

class Chat extends Component<RouteComponentProps<{}>, ChatState> {

    socket: SocketIOClient.Socket;

    constructor(props: Readonly<RouteComponentProps<{}>>) {
        super(props);
        const json = localStorage.getItem('user');
        let user = undefined;
        let authorized = false;
        if (json) {
            user = JSON.parse(json);
            let expiredIn = user.payload.exp * 1000;
            let seconds = (new Date()).getTime();
            authorized = expiredIn > seconds;
        }
        this.state = {
            authorized,
            user,
            response: false,
            username: '',
            message: '',
            messages: [],
            users: {}
        }

        this.socket = io('http://localhost:8080');
        if (authorized) {
            this.establishConnection();
        }
    }

    establishConnection = () => {

        this.socket.on('MESSAGE_RECEIVED', (data: any) => {
            const { senderId, senderName, message, createdAt } = data;
            const arr = [...this.state.messages, { senderId, senderName, message, createdAt }];
            this.setState({ messages: arr });
            this.scrollToBottom();
        });

        this.socket.on('USER_JOINED', ({ nickname, id }: any) => {
            if (!(id in this.state.users)) {
                const users = { ...this.state.users };
                users[id] = nickname;
                this.setState({ users })
            }
        });

        this.socket.on('USER_LEFT', (id: any) => {
            if (id in this.state.users) {
                let users = { ...this.state.users };
                delete users[id];
                this.setState({ users });
            }
        });

        this.socket.on('connect', () => {
            this.socket.emit("JOIN", this.state.user.payload);
        });
    }

    goToHome = () => {
        this.props.history.push('/home');
    }

    sendMessage = () => {
        const message = this.state.message.replace(/[\r\n\v]+/g, "");
        if (message) {
            // console.log(message);
            let data: Message = { senderId: this.state.user.payload.id, senderName: this.state.user.payload.nickname, message: this.state.message, createdAt: '' }
            this.socket.emit("SEND_MESSAGE", data);
            const arr = [...this.state.messages, data];
            this.setState({ messages: arr, message: '' }, () => this.scrollToBottom());
        }
    }

    componentDidMount() {
        const json = localStorage.getItem('user');
        let user;
        if (json) {
            user = JSON.parse(json);
            const options = {
                headers: { 'authorization': user.id_token }
            };
            this.getMessages()!.then(() => {
                this.scrollToBottom();
            });
            axios.get(chatUsersUrl, options).then(res => {
                this.setState({ users: res.data });
            }).catch(err => {
                console.log("ERROR GET MESSAGES " + err)
            })
        }
    }

    getMessages = () => {
        const json = localStorage.getItem('user');
        let user;
        if (json) {
            user = JSON.parse(json);
            const createdAt = this.state.messages[0] ? this.state.messages[0].createdAt : null;
            const options = {
                params: { createdAt },
                headers: { 'authorization': user.id_token }
            };
            return axios.get(chatMessagesUrl, options)
                .then(res => {
                    const messages = [...res.data, ...this.state.messages]
                    this.setState({ messages });
                }).catch(err => {
                    console.log("ERROR GET MESSAGES " + err)
                })
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    scrollToBottom = () => {
        animateScroll.scrollToBottom({
            containerId: "chat_content"
        });
    }

    onScroll = (e: any) => {
        let element = e.target
        if (element.scrollTop === 0) {
            setTimeout(() => {
                this.getMessages();
                element.scrollTop = 1700;
            }, 1500)
        }
    }

    render() {
        if (!this.state.authorized) {
            localStorage.removeItem('user');
        }

        if (this.state.authorized) {
            return (
                <body id="chat_page">
                    <header>
                        <nav>
                            <ul id="participants">
                                <li className="current_user">{this.state.user.payload.nickname}</li>
                                {Object.values(this.state.users).map((nickname, i) => {
                                    if (nickname && nickname !== this.state.user.payload.nickname) {
                                        return (
                                            <li key={i} className="chat_user">{nickname}</li>
                                        )
                                    } else {
                                        return null;
                                    }
                                })}
                            </ul>
                        </nav>
                    </header>

                    <main>
                        <section id="chat">
                            <div id="chat_name">
                                <button id="back_button" onClick={this.goToHome}><img src="back_icon.png" alt="Back" /></button>
                                <div id="chat_title">Глобален чат</div>
                            </div>

                            <div id="chat_content" onScroll={this.onScroll} data-simplebar>
                                <Loading />
                                {this.state.messages.map((message, i) => {
                                    if (message.senderId === this.state.user.payload.id) {
                                        return (
                                            <div key={i} className="message_me">
                                                <span className="user_nickname">{message.senderName}</span>
                                                <span className="answer">{message.message}</span>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={i} className="message">
                                                <span className="user_nickname">{message.senderName}</span>
                                                <span className="answer">{message.message}</span>
                                            </div>
                                        )
                                    }
                                }
                                )}
                            </div>
                            <div id="message_typer">
                                <textarea name="message_area" id="message" onKeyPress={(e) => e.key === 'Enter' ? this.sendMessage() : null} placeholder="Въведете съощение" value={this.state.message.replace(/[\r\n\v]+/g, "")} onChange={ev => this.setState({ message: ev.target.value })} ></textarea>
                                <div id="button_sender">
                                    <button onClick={this.sendMessage} id="btn"><img src="send_button.png" alt="Send button" /></button>
                                </div>
                            </div>
                        </section>
                    </main>
                </body>
            )
        } else {
            return (<NoAccess />);
        }
    }
}

export default withRouter(Chat);
