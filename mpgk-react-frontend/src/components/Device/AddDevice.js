import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDevice } from "../../actions/deviceActions";
import classnames from "classnames";

class AddDevice extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            type: "",
            status: "",
            errors: {}
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

        this.props.addDevice(newDevice, this.props.history);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors };
        } else {
            return null;
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container mt-4">
                <h1 className="h2">Dodaj urządzenie</h1>
                <form onSubmit={this.onSubmit} className="mt-4">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <input
                                    className={classnames("form-control", {
                                        "is-invalid": errors.name
                                    })}
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    placeholder="Nazwa urządzenia"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
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
                                        className={classnames(
                                            "form-check-input",
                                            { "is-invalid": errors.status }
                                        )}
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
                                <div className="form-check">
                                    <input
                                        className={classnames(
                                            "form-check-input",
                                            {
                                                "is-invalid": errors.status
                                            }
                                        )}
                                        type="radio"
                                        name="status"
                                        value="false"
                                        checked={this.state.status === "false"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Nieaktywne
                                    </label>
                                    {errors.status && (
                                        <div className="invalid-feedback">
                                            {errors.status}
                                        </div>
                                    )}
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
                                        className={classnames(
                                            "form-check-input",
                                            {
                                                "is-invalid": errors.type
                                            }
                                        )}
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
                                <div className="form-check">
                                    <input
                                        className={classnames(
                                            "form-check-input",
                                            { "is-invalid": errors.type }
                                        )}
                                        type="radio"
                                        name="type"
                                        value="false"
                                        checked={this.state.type === "false"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Bez przeglądu
                                    </label>
                                    {errors.type && (
                                        <div className="invalid-feedback">
                                            {errors.type}
                                        </div>
                                    )}
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

AddDevice.propTypes = {
    addDevice: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});
export default connect(mapStateToProps, { addDevice })(AddDevice);
