import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { addPerson } from "../../actions/personActions";

class AddPerson extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            surname: "",
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

        const newPerson = {
            name: this.state.name,
            surname: this.state.surname
        };
        this.props.addPerson(newPerson, this.props.history);
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
                <h1 className="h2 mb-4">Dodaj osobę</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <label>Imię</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.name
                                    })}
                                    name="name"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.name}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Nazwisko</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.surname
                                    })}
                                    name="surname"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.surname}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.surname}
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

addPerson.propTypes = {
    addPerson: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addPerson })(AddPerson);
