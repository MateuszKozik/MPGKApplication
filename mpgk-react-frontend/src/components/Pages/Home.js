import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createOnDemandInspections } from "../../actions/inspectionActions";
import { getHomePageConnections } from "../../actions/connectionActions";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./../../consts/themeConsts";
import Timer from "../Common/Timer";
import FormatDate from "../Common/FormatDate";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import {
	Grid,
	Typography,
	Table,
	TableBody,
	TableContainer,
	TableCell,
	Badge,
	TableRow,
	TableHead,
	Button
} from "@material-ui/core";

class Home extends Component {
	componentDidMount() {
		this.props.getHomePageConnections();
	}

	render() {
		const { classes } = this.props;
		const { homePageConnections } = this.props.connection;
		const onDemandConnections = homePageConnections.filter(
			(onDemand) => onDemand.connection.inspectionType.name === "Na żądanie"
		);
		const periodicConnections = homePageConnections.filter(
			(periodic) => periodic.connection.inspectionType.name !== "Na żądanie"
		);
		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={false} md={1} />
					<Grid item xs={12} md={10}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>
											<Typography>
												<b>OEC - Przeglądy okresowe</b>
											</Typography>
										</TableCell>
										<TableCell>
											<Typography>
												<b>Status</b>
											</Typography>
										</TableCell>
										<TableCell>
											<Typography align="center">
												<b>Plan</b>
											</Typography>
										</TableCell>
										<TableCell>
											<Typography align="center">
												<b>Pozostały czas</b>
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{periodicConnections &&
										periodicConnections.map((periodic, i) => {
											return (
												<TableRow key={i}>
													{periodic.active || periodic.overdueCount > 0 ? (
														<>
															<TableCell>
																<Typography>
																	{periodic.active ||
																	periodic.overdueCount > 0 ? (
																		<Link
																			style={{
																				color: "#000",
																				textDecoration: "none"
																			}}
																			to={`/inspections/list/${periodic.connection.connectionId}`}
																		>
																			{periodic.connection.name}
																		</Link>
																	) : (
																		<Link
																			style={{
																				color: "#000",
																				textDecoration: "none"
																			}}
																			to={`/inspections/list/${periodic.connection.connectionId}/activity`}
																		>
																			{periodic.connection.name}
																		</Link>
																	)}
																</Typography>
															</TableCell>
															<TableCell>
																<div
																	style={{
																		display: "flex",
																		alignItems: "center"
																	}}
																>
																	{periodic.inspectionStatus === "Wykonany" &&
																	periodic.active ? (
																		<CheckCircleIcon
																			fontSize="large"
																			color="primary"
																		/>
																	) : (
																		periodic.active && (
																			<CancelIcon
																				fontSize="large"
																				color="primary"
																			/>
																		)
																	)}

																	{periodic.overdueCount > 0 ? (
																		<Badge
																			badgeContent={periodic.overdueCount}
																			color="primary"
																		>
																			<ErrorIcon
																				fontSize="large"
																				color="secondary"
																			/>
																		</Badge>
																	) : null}
																</div>
															</TableCell>
															<TableCell align="center">
																<Typography component="div">
																	{periodic.active && (
																		<>
																			<FormatDate date={periodic.startTime} />
																			do
																			<FormatDate date={periodic.endTime} />
																		</>
																	)}
																</Typography>
															</TableCell>
															<TableCell align="center">
																<Typography>
																	<Timer date={periodic.endTime} />
																</Typography>
															</TableCell>
														</>
													) : null}
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={1} />
				</Grid>

				<Grid container className={classes.container} style={{ marginTop: 30 }}>
					<Grid item xs={false} md={1} />
					<Grid item xs={12} md={10}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>
											<Typography>
												<b>OEC - Przeglądy okresowe na żądanie</b>
											</Typography>
										</TableCell>
										<TableCell>
											<Typography>
												<b>Status</b>
											</Typography>
										</TableCell>
										<TableCell>
											<Typography align="center">
												<b>Plan</b>
											</Typography>
										</TableCell>
										<TableCell>
											<Typography align="center">
												<b>Pozostały czas</b>
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{onDemandConnections &&
										onDemandConnections.map((onDemand, i) => {
											return (
												<TableRow key={i}>
													{(onDemand.connection.device.status === true &&
														onDemand.connection.status === true) ||
													onDemand.overdueCount > 0 ||
													onDemand.active === true ? (
														<>
															<TableCell>
																<Typography>
																	{onDemand.active === true ||
																	onDemand.overdueCount > 0 ? (
																		<Link
																			style={{
																				color: "#000",
																				textDecoration: "none"
																			}}
																			to={`/inspections/list/${onDemand.connection.connectionId}`}
																		>
																			{onDemand.connection.name}
																		</Link>
																	) : (
																		<Link
																			style={{
																				color: "#000",
																				textDecoration: "none"
																			}}
																			to={`/inspections/list/${onDemand.connection.connectionId}/activity`}
																		>
																			{onDemand.connection.name}
																		</Link>
																	)}
																</Typography>
															</TableCell>
															<TableCell>
																<div
																	style={{
																		display: "flex",
																		alignItems: "center"
																	}}
																>
																	{onDemand.inspectionStatus === "Wykonany" &&
																	onDemand.active ? (
																		<CheckCircleIcon
																			fontSize="large"
																			color="primary"
																		/>
																	) : (
																		onDemand.active && (
																			<CancelIcon
																				fontSize="large"
																				color="primary"
																			/>
																		)
																	)}

																	{onDemand.overdueCount > 0 ? (
																		<Badge
																			badgeContent={onDemand.overdueCount}
																			color="primary"
																		>
																			<ErrorIcon
																				fontSize="large"
																				color="secondary"
																			/>
																		</Badge>
																	) : null}
																</div>
															</TableCell>
															<TableCell align="center">
																<Typography component="div">
																	{onDemand.active && (
																		<>
																			<FormatDate date={onDemand.startTime} />
																			do
																			<FormatDate date={onDemand.endTime} />
																		</>
																	)}
																</Typography>
															</TableCell>
															<TableCell align="center">
																<Typography>
																	{onDemand.active === false ? (
																		<Button
																			onClick={() => {
																				this.props.createOnDemandInspections(
																					onDemand.connection.connectionId,
																					this.props.history
																				);
																				window.location.reload(false);
																			}}
																			variant="contained"
																			color="primary"
																		>
																			Rozpocznij
																		</Button>
																	) : (
																		<Timer date={onDemand.endTime} />
																	)}
																</Typography>
															</TableCell>
														</>
													) : null}
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={1} />
				</Grid>

				<Grid container style={{ marginTop: 30, textAlign: "center" }}>
					<Grid item xs={2} />
					<Grid item xs={8}>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<Typography>
									<b>Lista wykonawców</b>
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<Link
									style={{ textDecoration: "none", color: "#fff" }}
									to="/performers-list"
								>
									<Button color="primary" variant="contained">
										Wyświetl
									</Button>
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container style={{ marginTop: 20, textAlign: "center" }}>
					<Grid item xs={2} />
					<Grid item xs={8}>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<Typography>
									<b>Wymiana butli z azotem</b>
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<Link
									style={{ textDecoration: "none", color: "#fff" }}
									to="/nitrogen-list"
								>
									<Button color="primary" variant="contained">
										Wyświetl
									</Button>
								</Link>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} />
				</Grid>

				<Grid container style={{ marginTop: 20, textAlign: "center" }}>
					<Grid item xs={2} />
					<Grid item xs={8}>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<Typography>
									<b>Rejestr płynów roboczych ORC</b>
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<Link
									style={{ textDecoration: "none", color: "#fff" }}
									to="/new-fluid-registry"
								>
									<Button color="primary" variant="contained">
										Wyświetl
									</Button>
								</Link>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} />
				</Grid>
				<Grid
					container
					style={{ marginTop: 20, textAlign: "center", marginBottom: 20 }}
				>
					<Grid item xs={2} />
					<Grid item xs={8}>
						<Grid container>
							<Grid item xs={12}>
								<Link
									style={{ textDecoration: "none", color: "#fff" }}
									to="/inspections"
								>
									<Button color="primary" variant="contained">
										Wyszukiwarka przeglądów
									</Button>
								</Link>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2} />
				</Grid>
			</>
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
	connection: state.connection
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Home));
