import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { addOverviewType } from "../../actions/overviewTypeActions";

class AddOverviewType extends Component {
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

        const newOverviewType = {
            name: this.state.name
        };

        this.props.addOverviewType(newOverviewType, this.props.history);
    }

    static getDerivedStateFromProps(nextProps, pervState) {
        if (nextProps.errors !== pervState.errors) {
            return { errors: nextProps.errors };
        }
        return null;
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
                                    className={classnames("form-control", {
                                        "is-invalid": errors.name
                                    })}
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
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

AddOverviewType.propTypes = {
    addOverviewType: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addOverviewType })(AddOverviewType);
