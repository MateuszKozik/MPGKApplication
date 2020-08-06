import React, { Component } from "react";
import AddConnectionButton from "./AddConnectionButton";
import { connect } from "react-redux";
import {
	getConnections,
	deleteConnection
} from "../../actions/connectionActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class ConnectionList extends Component {
	componentDidMount() {
		this.props.getConnections();
	}

	onDeleteClick = (id) => {
		this.props.deleteConnection(id);
	};

	render() {
		const { connections } = this.props.connection;
		return (
			<div className="container">
				<h1 className="display-4 text-center mt-2">Powiązania</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddConnectionButton />
					</div>
				</div>

				<table className="table mt-4">
					<thead>
						<tr>
							<th>Nazwa</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						{connections.map((connection) => (
							<tr key={connection.connectionId}>
								<td>{connection.name}</td>
								<td>
									<Link
										to={`/connections/update/${connection.connectionId}`}
										className="btn btn-primary my-1"
									>
										Edytuj
									</Link>
									<button
										onClick={this.onDeleteClick.bind(
											this,
											connection.connectionId
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
		);
	}
}

ConnectionList.propTypes = {
	connection: PropTypes.object.isRequired,
	getConnections: PropTypes.func.isRequired,
	deleteConnection: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	connection: state.connection
});

export default connect(mapStateToProps, { getConnections, deleteConnection })(
	ConnectionList
);
