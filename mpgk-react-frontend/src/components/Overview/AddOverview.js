import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { addOverview } from "../../actions/overviewActions";

class AddOverview extends Component {
    constructor() {
        super();

        this.state = {
            status: "",
            startTime: "",
            endTime: "",
            parameter: "",
            comment: "",
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

        const newOverview = {
            status: this.state.status,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            parameter: this.state.parameter,
            comment: this.state.comment
        };
        this.props.addOverview(newOverview, this.props.history);
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
            <div className="container mt-2">
                <h1 className="h2 mb-4">Dodaj przegląd</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <label>Status</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.status
                                    })}
                                    name="status"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.status}
                                />
                                {errors.status && (
                                    <div className="invalid-feedback">
                                        {errors.status}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Czas rozpoczęcia</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.startTime
                                    })}
                                    name="startTime"
                                    type="datetime-local"
                                    onChange={this.onChange}
                                    value={this.state.startTime}
                                />
                                {errors.startTime && (
                                    <div className="invalid-feedback">
                                        {errors.startTime}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Czas wykonania</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.endTime
                                    })}
                                    name="endTime"
                                    type="datetime-local"
                                    onChange={this.onChange}
                                    value={this.state.endTime}
                                />
                                {errors.endTime && (
                                    <div className="invalid-feedback">
                                        {errors.endTime}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Parametry</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.parameter
                                    })}
                                    name="parameter"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.parameter}
                                />
                                {errors.parameter && (
                                    <div className="invalid-feedback">
                                        {errors.parameter}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Uwagi</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.comment
                                    })}
                                    name="comment"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.comment}
                                />
                                {errors.comment && (
                                    <div className="invalid-feedback">
                                        {errors.comment}
                                    </div>
                                )}
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

AddOverview.propTypes = {
    addOverview: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addOverview })(AddOverview);
