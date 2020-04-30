import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDevice } from "../../actions/deviceActions";

class UpdateDevice extends Component {
    constructor() {
        super();

        this.state = {
            id: "",
            name: "",
            status: "",
            type: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getDevice(id, this.props.history);
    }

    componentDidUpdate(props, state, snapshot) {
        if (this.props.device !== props.device) {
            const { id, name, status, type } = this.props.device;
            let editStatus;
            let editType;
            if (status === true) {
                editStatus = "true";
            } else {
                editStatus = "false";
            }
            if (type === true) {
                editType = "true";
            } else {
                editType = "false";
            }
            this.setState({
                id: id,
                name: name,
                status: editStatus,
                type: editType
            });
        }
    }

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
                                    value={this.state.name || ""}
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
                                <div className="form-check">
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
                                <div className="form-check">
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
                                <div className="form-check">
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
                                <div className="form-check">
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

UpdateDevice.propTypes = {
    getDevice: PropTypes.func.isRequired,
    device: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    device: state.device.device
});

export default connect(mapStateToProps, { getDevice })(UpdateDevice);
