import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary navbar-expand-lg fixed-top">
                <a className="navbar-brand" href="/">
                    MPGK
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mainmenu"
                    aria-controls="mainmenu"
                    aria-expanded="false"
                    aria-label="Navigation switch"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainmenu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/devices">
                                Urządzenia
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
