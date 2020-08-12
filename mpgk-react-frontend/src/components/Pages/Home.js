import React, { Component } from "react";
import { connect } from "react-redux";
import { getConnections } from "../../actions/connectionActions";
import { Link } from "react-router-dom";
import { createOnDemandOverviews } from "../../actions/taskActions";

class Home extends Component {
	componentDidMount() {
		this.props.getConnections();
	}

	render() {
		const { connections } = this.props.connection;
		return (
			<div className="container mt-3">
				<div className="table-responsive mt-2">
					<table className="table ">
						<thead>
							<tr>
								<th></th>
								<th>
									<b>OEC - Przeglądy okresowe</b>
								</th>
								<th>Wykonany</th>
								<th>W trakcie</th>
								<th>Niewykonany</th>
								<th>Czas do zakończenia</th>
							</tr>
						</thead>
						<tbody>
							{connections
								.filter(
									(connection) => connection.overviewType.name !== "Na żądanie"
								)
								.map((connection, i) => (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>
											<Link to={`/overviews/list/${connection.connectionId}`}>
												{connection.name}
											</Link>
										</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								))}
						</tbody>
					</table>
					<table className="table ">
						<thead>
							<tr>
								<th></th>
								<th>
									<b>OEC - Przeglądy okresowe na żądanie</b>
								</th>
								<th>Wykonany</th>
								<th>W trakcie</th>
								<th>Niewykonany</th>
								<th>Czas do zakończenia</th>
							</tr>
						</thead>
						<tbody>
							{connections
								.filter(
									(connection) => connection.overviewType.name === "Na żądanie"
								)
								.map((connection, i) => (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>
											<Link to={`/overviews/list/${connection.connectionId}`}>
												{connection.name}
											</Link>
										</td>
										<td></td>
										<td></td>
										<td></td>
										<td>
											<button
												onClick={() =>
													this.props.createOnDemandOverviews(
														connection.connectionId,
														this.props.history
													)
												}
												className="btn btn-primary"
											>
												Rozpocznij
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<h4>Lista wykonawców</h4>
					</div>
					<div className="col-md-6">
						<Link to="/performers-list" className="btn btn-block btn-primary">
							Pokaż
						</Link>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<h4>Wymiana butli z azotem</h4>
					</div>
					<div className="col-md-6">
					<Link to="/nitrogen-list" className="btn btn-block btn-primary">
							Pokaż
						</Link>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6">
						<h4>Rejestr płynów roboczych ORC</h4>
					</div>
					<div className="col-md-6">
						<Link
							to="/new-fluid-registry"
							className="btn btn-block btn-primary"
						>
							Otwórz
						</Link>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-6 offset-md-6">
						<button className="btn btn-block btn-primary">
							Filtruj/Szukaj
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	getConnections: () => {
		dispatch(getConnections());
	},
	createOnDemandOverviews: (connectionId, history) => {
		dispatch(createOnDemandOverviews(connectionId, history));
	}
});

const mapStateToProps = (state) => ({
	connection: state.connection
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
