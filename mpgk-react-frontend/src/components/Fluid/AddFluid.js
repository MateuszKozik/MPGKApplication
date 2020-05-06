import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { addFluid } from "../../actions/fluidActions";

class AddFluid extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
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

        const newFluid = {
            name: this.state.name
        };
        this.props.addFluid(newFluid, this.props.history);
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
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <label>Nazwa</label>
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

AddFluid.propTypes = {
    addFluid: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addFluid })(AddFluid);
