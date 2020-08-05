import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPerson, updatePerson } from "../../actions/personActions";

class UpdatePerson extends Component {
    constructor() {
        super();

        this.state = {
            personId: "",
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

    componentDidMount() {
        const { personId } = this.props.match.params;
        this.props.getPerson(personId, this.props.history);
    }

    componentDidUpdate(props) {
        if (this.props.person !== props.person) {
            const { personId, name, surname } = this.props.person;
            this.setState({
                personId: personId,
                name: name,
                surname: surname
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

        const updatePerson = {
            personId: this.state.personId,
            name: this.state.name,
            surname: this.state.surname
        };

        this.props.updatePerson(
            this.state.personId,
            updatePerson,
            this.props.history
        );
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="container mt-2">
                <h1 className="h2 mb-4">Edytuj osobę</h1>
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
                                {errors.surname && (
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

UpdatePerson.propTypes = {
    getPerson: PropTypes.func.isRequired,
    Person: PropTypes.object.isRequired,
    updatePerson: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    person: state.person.person,
    errors: state.errors
});

export default connect(mapStateToProps, { getPerson, updatePerson })(UpdatePerson);
