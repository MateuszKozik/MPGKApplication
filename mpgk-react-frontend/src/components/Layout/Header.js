import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
                <Link className="navbar-brand" to="/">
                    MPGK
                </Link>

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
                            <Link className="nav-link" to="/devices">
                                Urządzenia
                            </Link>
                        </li>
                        <li className="navbar-nav mr-auto">
                            <Link className="nav-link" to="/fluids">
                                Płyny
                            </Link>
                        </li>
                        <li className="navbra-nav mr-auto">
                            <Link className="nav-link" to="/overview-types">
                                Rodzaje przeglądów
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
