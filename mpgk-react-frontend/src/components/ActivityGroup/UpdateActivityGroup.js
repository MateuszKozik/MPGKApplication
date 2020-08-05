import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroup, updateGroup } from "../../actions/activityGroupActions";

class UpdateActivityGroup extends Component {
    constructor() {
        super();

        this.state = {
            groupId: "",
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
        const { groupId } = this.props.match.params;
        this.props.getGroup(groupId, this.props.history);
    }

    componentDidUpdate(props) {
        if (this.props.group !== props.group) {
            const { groupId, name } = this.props.group;
            this.setState({
                groupId: groupId,
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

        const updateActivityGroup = {
            groupId: this.state.groupId,
            name: this.state.name
        };

        this.props.updateActivityGroup(
            this.state.groupId,
            updateActivityGroup,
            this.props.history
        );
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="container mt-2">
                <h1 className="h2 mb-4">Edytuj grupę czynności</h1>
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

UpdateActivityGroup.propTypes = {
    getGroup: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    updateGroup: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    group: state.group.group,
    errors: state.errors
});

export default connect(mapStateToProps, { getGroup, updateGroup })(UpdateActivityGroup);
