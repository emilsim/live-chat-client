import { Component } from "react";
import React from "react";
import "../styles/index.scss"

export default class NoAccess extends Component {

    render() {
        return (
            <html lang="id" dir="ltr">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="description" content="" />
                    <meta name="author" content="" />

                    <title>Неоторизиран достъп</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" />
                </head>

                <body className="py-5 noAccess">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-2 text-center">
                                <p><i className="fa fa-exclamation-triangle fa-5x"></i><br />Статус код: 401</p>
                            </div>
                            <div className="col-md-10">
                                <h3>Ооопс!!!! </h3>
                                <p>Трябва да се оторизирате, за да имате достъп до чата</p>
                                <button className="btn btn-danger" onClick={() => window.history.back()}>Назад</button>
                            </div>
                        </div>
                    </div>
                </body>

            </html>
        );
    }
}