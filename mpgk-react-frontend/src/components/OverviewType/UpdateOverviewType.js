import React, { Component } from "react";
import {
    updateOverviewType,
    getOverviewType
} from "../../actions/overviewTypeActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateOverviewType extends Component {
    constructor() {
        super();

        this.state = {
            typeId: "",
            name: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const { typeId } = this.props.match.params;
        this.props.getOverviewType(typeId, this.props.history);
    }

    componentDidUpdate(props) {
        if (this.props.overviewType !== props.overviewType) {
            const { typeId, name } = this.props.overviewType;
            this.setState({
                typeId: typeId,
                name: name
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors };
        }
        return null;
    }

    onSumbit(e) {
        e.preventDefault();

        const updatedOverviewType = {
            typeId: this.state.typeId,
            name: this.state.name
        };

        this.props.updateOverviewType(
            this.state.typeId,
            updatedOverviewType,
            this.props.history
        );
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="container mt-2">
                <form onSubmit={this.onSumbit}>
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

UpdateOverviewType.propTypes = {
    getOverviewType: PropTypes.func.isRequired,
    overviewType: PropTypes.object.isRequired,
    updateOverviewType: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    overviewType: state.overviewType.overviewType,
    errors: state.errors
});

export default connect(mapStateToProps, {
    getOverviewType,
    updateOverviewType
})(UpdateOverviewType);
