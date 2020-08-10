import React, { Component } from "react";
import { connect } from "react-redux";
import { getPersons } from "../../actions/personActions";
import PropTypes from "prop-types";



class PerformersList extends Component {
	componentDidMount() {
		this.props.getPersons();
	}


	render() {
		const { persons } = this.props.person;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Lista wykonawców</h1>			
				<div className="table-responsive mt-2">
					<table className="table mt-4">
						<thead>
							<tr>
								<th>Imię</th>
								<th>Nazwisko</th>
							</tr>
						</thead>
						<tbody>
							{persons.map((person) => (
								<tr key={person.personId}>
									<td>{person.name}</td>
									<td>{person.surname}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

PerformersList.propTypes = {
	person: PropTypes.object.isRequired,
	getPersons: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	person: state.person
});

export default connect(mapStateToProps, { getPersons })(
	PerformersList
);
