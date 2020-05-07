import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFluid, updateFluid } from "../../actions/fluidActions";

class UpdateFluid extends Component {
    constructor() {
        super();

        this.state = {
            fluidId: "",
            name: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const { fluidId } = this.props.match.params;
        this.props.getFluid(fluidId, this.props.history);
    }

    componentDidUpdate(props) {
        if (this.props.fluid !== props.fluid) {
            const { fluidId, name } = this.props.fluid;
            this.setState({
                fluidId: fluidId,
                name: name
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors };
        } else {
            return null;
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const updatedFluid = {
            fluidId: this.state.fluidId,
            name: this.state.name
        };

        this.props.updateFluid(
            this.state.fluidId,
            updatedFluid,
            this.props.history
        );
    }

    render() {
        const { errors } = this.props;
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

UpdateFluid.propTypes = {
    getFluid: PropTypes.func.isRequired,
    fluid: PropTypes.object.isRequired,
    updateFluid: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    fluid: state.fluid.fluid,
    errors: state.errors
});

export default connect(mapStateToProps, { getFluid, updateFluid })(UpdateFluid);
