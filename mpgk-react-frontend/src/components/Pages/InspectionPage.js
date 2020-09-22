import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getInspectionsByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import PropTypes from "prop-types";
import Timer from "../Common/Timer";
import FormatDate from "../Common/FormatDate";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./../../consts/themeConsts";
import {
	Typography,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
	Table,
	TableBody
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";

class InspectionPage extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getInspectionsByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	render() {
		const { classes } = this.props;
		const { inspectionsList } = this.props.inspection;
		const actualInspections = inspectionsList.filter(
			(inspections) => inspections.overdue === false
		);
		const overdueInspections = inspectionsList.filter(
			(inspections) => inspections.overdue
		);

		return (
			<>
				{actualInspections &&
					actualInspections.map((inspection, i) => (
						<Grid key={i} container className={classes.form}>
							<Grid item xs={12}>
								<Typography variant="h5">Aktualny przegląd</Typography>
							</Grid>
							<Grid item xs={false} md={2} />
							<Grid item xs={12} md={8}>
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>
													<Typography>
														<b>Nazwa przeglądu</b>
													</Typography>
												</TableCell>
												<TableCell>
													<Typography>
														<b>Pozostały czas</b>
													</Typography>
												</TableCell>
												<TableCell>
													<Typography>
														<b>Status</b>
													</Typography>
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow>
												<TableCell>
													<Typography>
														<Link
															style={{
																color: "#000",
																textDecoration: "none"
															}}
															to={`/inspections/list/${inspection.connection.connectionId}/execute`}
														>
															{inspection.connection.name}
														</Link>
													</Typography>
												</TableCell>
												<TableCell>
													<Typography>
														<Timer date={inspection.endTime} />
													</Typography>
												</TableCell>
												<TableCell>
													<Typography>
														{inspection.inspectionStatus === "Wykonany" ? (
															<CheckCircleIcon
																fontSize="large"
																color="primary"
															/>
														) : (
															<CancelIcon fontSize="large" color="primary" />
														)}
													</Typography>
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</Grid>
							<Grid item xs={false} md={2} />
						</Grid>
					))}

				{overdueInspections && overdueInspections.length > 0 && (
					<Grid container className={classes.form}>
						<Grid item xs={12}>
							<Typography variant="h5">Zaległe przeglądy</Typography>
						</Grid>
						<Grid item xs={false} md={2} />
						<Grid item xs={12} md={8}>
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>
												<Typography>
													<b>Nazwa przeglądu</b>
												</Typography>
											</TableCell>
											<TableCell>
												<Typography>
													<b>Data zakończenia</b>
												</Typography>
											</TableCell>
											<TableCell>
												<Typography>
													<b>Status</b>
												</Typography>
											</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{overdueInspections &&
											overdueInspections.map((overdue, i) => (
												<TableRow key={i}>
													<TableCell>
														<Typography>
															<Link
																style={{
																	color: "#000",
																	textDecoration: "none"
																}}
																to={`/inspections/list/${overdue.connection.connectionId}/overdue/${overdue.endTime}`}
															>
																{overdue.connection.name}
															</Link>
														</Typography>
													</TableCell>
													<TableCell>
														<Typography component="div">
															<FormatDate date={overdue.endTime} />
														</Typography>
													</TableCell>
													<TableCell>
														<Typography>
															<ErrorIcon fontSize="large" color="secondary" />
														</Typography>
													</TableCell>
												</TableRow>
											))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item xs={false} md={2} />
					</Grid>
				)}
			</>
		);
	}
}

InspectionPage.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspectionsByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection
});

const mapDispatchToProps = (dispatch) => {
	return {
		getInspectionsByConnection: (connectionId, history) => {
			dispatch(getInspectionsByConnection(connectionId, history));
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		}
	};
};

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(styles)(InspectionPage));
