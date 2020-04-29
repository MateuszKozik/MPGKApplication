import React, { Component } from "react";

class AddDevice extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            type: "true",
            status: "true"
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newDevice = {
            name: this.state.name,
            type: this.state.type,
            status: this.state.status
        };

        console.log(newDevice);
    }

    render() {
        return (
            <div className="container mt-4">
                <h1 className="h2">Dodaj urządzenie</h1>
                <form onSubmit={this.onSubmit} className="mt-4">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.onChange}
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
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        value="true"
                                        checked={this.state.status === "true"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Aktywne
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        value="false"
                                        checked={this.state.status === "false"}
                                        onChange={this.onChange}
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
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="true"
                                        checked={this.state.type === "true"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Z przeglądem
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="false"
                                        checked={this.state.type === "false"}
                                        onChange={this.onChange}
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

export default AddDevice;
