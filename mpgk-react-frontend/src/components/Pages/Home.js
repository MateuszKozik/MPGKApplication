import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createOnDemandInspections } from "../../actions/taskActions";
import { getHomePageConnections } from "../../actions/connectionActions";
import Timer from "../Common/Timer";
import FormatDate from "../Common/FormatDate";

class Home extends Component {
	componentDidMount() {
		this.props.getHomePageConnections();
	}

	render() {
		const { homePageConnections } = this.props.connection;
		const onDemandConnections = homePageConnections.filter(
			(onDemand) => onDemand.connection.inspectionType.name === "Na żądanie"
		);
		const periodicConnections = homePageConnections.filter(
			(periodic) => periodic.connection.inspectionType.name !== "Na żądanie"
		);
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
									{periodic.active || periodic.overdueCount > 0 ? (
										<>
											<td>
												{periodic.active || periodic.overdueCount > 0 ? (
													<Link
														to={`/inspections/list/${periodic.connection.connectionId}`}
													>
														{periodic.connection.name}
													</Link>
												) : (
													<Link
														to={`/inspections/list/${periodic.connection.connectionId}/activity`}
													>
														{periodic.connection.name}
													</Link>
												)}
											</td>
											<td>
												{periodic.inspectionStatus === "Wykonany" ? (
													<p>Wykonany</p>
												) : (
													<p>W trakcie</p>
												)}
											</td>

											<td>
												{periodic.overdueCount > 0 ? (
													<p>Zaległych: {periodic.overdueCount}</p>
												) : null}
											</td>
											<td>
												{periodic.active && (
													<>
														Od <FormatDate date={periodic.startTime} /> Do
														<FormatDate date={periodic.endTime} />
													</>
												)}
											</td>
											<td>
												<Timer date={periodic.endTime} />
											</td>
										</>
									) : null}
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
									{(onDemand.connection.device.status === true &&
										onDemand.connection.status === true) ||
									onDemand.overdueCount > 0 ||
									onDemand.active === true ? (
										<>
											<td>
												{onDemand.active === true ||
												onDemand.overdueCount > 0 ? (
													<Link
														to={`/inspections/list/${onDemand.connection.connectionId}`}
													>
														{onDemand.connection.name}
													</Link>
												) : (
													<Link
														to={`/inspections/list/${onDemand.connection.connectionId}/activity`}
													>
														{onDemand.connection.name}
													</Link>
												)}
											</td>
											<td>
												{onDemand.active === true ? (
													<>
														{onDemand.inspectionStatus === "Wykonany" ? (
															<p>Wykonany</p>
														) : (
															<p>W trakcie</p>
														)}
													</>
												) : (
													<p>Nierozpoczęty</p>
												)}
											</td>

											<td>
												{onDemand.overdueCount > 0 ? (
													<p>Zaległych: {onDemand.overdueCount}</p>
												) : null}
											</td>
											<td>
												{onDemand.active === true && (
													<>
														Od <FormatDate date={onDemand.startTime} /> Do
														<FormatDate date={onDemand.endTime} />
													</>
												)}
											</td>
											<td>
												{onDemand.active === false ? (
													<button
														onClick={() => {
															this.props.createOnDemandInspections(
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
										</>
									) : null}
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
	createOnDemandInspections: (connectionId, history) => {
		dispatch(createOnDemandInspections(connectionId, history));
	},
	getHomePageConnections: () => {
		dispatch(getHomePageConnections());
	}
});

const mapStateToProps = (state) => ({
	connection: state.connection,
	homePageConnections: state.connection
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
