import React, { Component } from 'react';
import '../styles/index.scss';

export default class NavBar extends Component {

    render() {
        return (
            <React.Fragment>
                <header>
                    <nav>
                        <ul>
                            <li className="active">Начало</li>
                            <li className="right_float">
                                Нямате регистрация? <button id="registration">Регистрация</button>
                            </li>
                            <li className="right_float">
                                Не сте влезнали в профила си? <button id="login">Вход</button>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <h1>Присъедини се сега!</h1>
                </main>
            </React.Fragment>
            // <nav>
            //     <div className="navWide">
            //         <div className="wideDiv">
            //             <a href="#">Link 1</a>
            //             <a href="#">Link 2</a>
            //             <a href="#">Link 3</a>
            //         </div>
            //     </div>
            //     <div className="navNarrow">
            //         <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
            //         <div className="narrowLinks">
            //             <a href="#" onClick={this.burgerToggle}>Link 1</a>
            //             <a href="#" onClick={this.burgerToggle}>Link 2</a>
            //             <a href="#" onClick={this.burgerToggle}>Link 3</a>
            //         </div>
            //     </div>
            // </nav>
        );
    }

    burgerToggle() {
        let linksEl = document.querySelector('.narrowLinks') as HTMLElement;
        if (linksEl!.style.display === 'block') {
            linksEl!.style.display = 'none';
        } else {
            linksEl!.style.display = 'block';
        }
    }
}

// ReactDOM.render(<NavComponent />, document.querySelector('navbar'));