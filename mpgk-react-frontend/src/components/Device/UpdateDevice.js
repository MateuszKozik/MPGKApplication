import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class UpdateDevice extends Component {
    render() {
        return (
            <div className="container mt-4">
                <h1 className="h2">Edytuj urządzenie</h1>
                <form onSubmit={this.onSubmit} className="mt-4">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    placeholder="Nazwa urządzenia"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group ">
                                <label>Status urządzenia</label>
                                <br />
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        value="true"
                                    />
                                    <label className="form-check-label">
                                        Aktywne
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        value="false"
                                    />
                                    <label className="form-check-label">
                                        Nieaktywne
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <label>Typ urządzenia</label>
                                <br />
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="true"
                                    />
                                    <label className="form-check-label">
                                        Z przeglądem
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="false"
                                    />
                                    <label className="form-check-label">
                                        Bez przeglądu
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-primary">
                                Zapisz
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UpdateDevice;
