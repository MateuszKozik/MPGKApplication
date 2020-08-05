import React, { Component } from "react";
import AddPersonButton from "./AddPersonButton";
import { connect } from "react-redux";
import { getPersons, deletePerson } from "../../actions/personActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class PersonList extends Component {
    componentDidMount() {
        this.props.getPersons();
    }

    onDeleteClick = (personId) => {
        this.props.deletePerson(personId);
    };

    render() {
        const { persons } = this.props.person;
        return (
            <div className="container mt-2">
                <h1 className="display-4 text-center mt-2">Osoby</h1>
                <div className="row">
                    <div className="col-md-4 my-1">
                        <AddFluidButton />
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>Imię</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {persons.map((person) => (
                                <tr key={person.personId}>
                                    <td>{person.name}</td>
                                    <td>
                                        <Link
                                            to={`/persons/update/${person.personId}`}
                                            className="btn btn-primary my-1"
                                        >
                                            Edytuj
                                        </Link>
                                        <button
                                            onClick={this.onDeleteClick.bind(
                                                this,
                                                person.personId
                                            )}
                                            className="btn btn-danger ml-2 my-1"
                                        >
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

PersonList.propTypes = {
    Person: PropTypes.object.isRequired,
    getPersons: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    person: state.person
});

export default connect(mapStateToProps, { getPersons, deletePerson })(PersonList);