import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getActivity, updateActivity } from "../../actions/activityActions";

class UpdateActivity extends Component {
    constructor() {
        super();

        this.state = {
            activityId: "",
            name: "",
            type: "",
            emsr: "",
            setting: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const { activityId } = this.props.match.params;
        this.props.getActivity(activityId, this.props.history);
    }

    componentDidUpdate(props) {
        if (this.props.activity !== props.activity) {
            const { activityId, name, type, emsr, setting } = this.props.activity;
            this.setState({
                activityId: activityId,
                name: name,
                type: type,
                emsr: emsr,
                setting: setting
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

        const updatedActivity = {
            activityId: this.state.activityId,
            name: this.state.name,
            type: this.state.type,
            emsr: this.state.emsr,
            setting: this.state.setting
        };

        this.props.updateActivity(
            this.state.activityId,
            updateActivity,
            this.props.history
        );
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="container mt-2">
                <h1 className="h2 mb-4">Edytuj czynność</h1>
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
                            <div className="form-group">
                                <label>Rodzaj</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.type
                                    })}
                                    name="type"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.type}
                                />
                                {errors.type && (
                                    <div className="invalid-feedback">
                                        {errors.type}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>EMSR</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.emsr
                                    })}
                                    name="emsr"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.emsr}
                                />
                                {errors.emsr && (
                                    <div className="invalid-feedback">
                                        {errors.emsr}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Nastawa</label>
                                <input
                                    className={classNames("form-control", {
                                        "is-invalid": errors.setting
                                    })}
                                    name="setting"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.setting}
                                />
                                {errors.setting && (
                                    <div className="invalid-feedback">
                                        {errors.setting}
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

UpdateActivity.propTypes = {
    getActivity: PropTypes.func.isRequired,
    activity: PropTypes.object.isRequired,
    updateActivity: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    activity: state.activity.activity,
    errors: state.errors
});

export default connect(mapStateToProps, { getActivity, updateActivity })(UpdateActivity);
