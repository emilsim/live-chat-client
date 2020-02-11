import { Component } from "react";
import React from "react";
import "../styles/notFound.scss"
import { RouteComponentProps } from "react-router";

export default class NotFound extends Component<RouteComponentProps<{}>, {}> {


    goToHome = () => {
        this.props.history.push('/home');
    }

    render() {
        return (
            <body>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <img id="404" src="notFound.png" alt="404"></img>
                        </div>
                        <h2>Оопс! Тази страница не може да бъде намерена</h2>
                        <p>Страницата, която се опитвате да отворите, не съществува</p>
                        <button onClick={this.goToHome} >Начална страница</button>
                    </div>
                </div>
            </body>

        );
    }
}