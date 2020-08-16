import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	createOnDemandOverviews,
	getPeriodicConnections,
	getOnDemandConnections
} from "../../actions/taskActions";
import Timer from "../Common/Timer";
import FormatDate from "../Common/FormatDate";

class Home extends Component {
	componentDidMount() {
		this.props.getPeriodicConnections();
		this.props.getOnDemandConnections();
	}

	render() {
		const { periodicConnections } = this.props.connection;
		const { onDemandConnections } = this.props.connection;
		return (
			<div className="container mt-3">
				<div className="table-responsive mt-2">
					<table className="table ">
						<thead>
							<tr>
								<th>
									<b>OEC - Przeglądy okresowe</b>
								</th>
								<th>Status</th>
								<th>Zaległe</th>
								<th>Plan</th>
								<th>Czas do końca</th>
							</tr>
						</thead>
						<tbody>
							{periodicConnections.map((periodic, i) => (
								<tr key={i}>
									<td>
										<Link
											to={`/overviews/list/${periodic.connection.connectionId}`}
										>
											{periodic.connection.name}
										</Link>
									</td>
									<td>
										{periodic.status === "Wykonany" ? (
											<p>Wykonany</p>
										) : (
											<p>W trakcie</p>
										)}
									</td>

									<td>
										{periodic.overdudeCount > 0 ? (
											<p>Zaległych: {periodic.overdudeCount}</p>
										) : null}
									</td>
									<td>
										Od <FormatDate date={periodic.startTime} /> Do
										<FormatDate date={periodic.endTime} />
									</td>
									<td>
										<Timer date={periodic.endTime} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<table className="table ">
						<thead>
							<tr>
								<th>
									<b>OEC - Przeglądy okresowe na żądanie</b>
								</th>
								<th>Status</th>
								<th>Zaległe</th>
								<th>Plan</th>
								<th>Czas do końca</th>
							</tr>
						</thead>
						<tbody>
							{onDemandConnections.map((onDemand, i) => (
								<tr key={i}>
									<td>
										<Link
											to={`/overviews/list/${onDemand.connection.connectionId}`}
										>
											{onDemand.connection.name}
										</Link>
									</td>
									<td>
										{onDemand.status === "Wykonany" ? (
											<p>Wykonany</p>
										) : (
											<p>W trakcie</p>
										)}
									</td>

									<td>
										{onDemand.overdudeCount > 0 ? (
											<p>Zaległych: {onDemand.overdudeCount}</p>
										) : null}
									</td>
									<td>
										Od <FormatDate date={onDemand.startTime} /> Do
										<FormatDate date={onDemand.endTime} />
									</td>
									<td>
										{onDemand.button ? (
											<button
												onClick={() => {
													this.props.createOnDemandOverviews(
														onDemand.connection.connectionId,
														this.props.history
													);
													window.location.reload(false);
												}}
												className="btn btn-primary"
											>
												Rozpocznij
											</button>
										) : (
											<Timer date={onDemand.endTime} />
										)}
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
	createOnDemandOverviews: (connectionId, history) => {
		dispatch(createOnDemandOverviews(connectionId, history));
	},
	getPeriodicConnections: () => {
		dispatch(getPeriodicConnections());
	},
	getOnDemandConnections: () => {
		dispatch(getOnDemandConnections());
	}
});

const mapStateToProps = (state) => ({
	connection: state.connection,
	periodicConnections: state.connection,
	onDemandConnections: state.connection
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
