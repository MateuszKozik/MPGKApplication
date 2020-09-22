import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getActivitiesByConnection } from "../../actions/activityActions";
import { clearInspectionsListState } from "../../actions/inspectionActions";
import { Grid, Typography, Divider, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./../../consts/themeConsts";
import { generateActivityReport } from "../../actions/pdfGeneratorActions";

class InspectionActivities extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getActivitiesByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	render() {
		const { inspectionsList } = this.props.inspection;
		const { classes } = this.props;
		const { validToken, user } = this.props.security;
		const { authorities } = user;
		const { connectionId } = this.props.match.params;

		return (
			<>
				{inspectionsList && (
					<Grid
						container
						className={classes.form}
						style={{ textAlign: "left" }}
					>
						<Grid item xs={12}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									this.props.generateActivityReport(connectionId, "Czynności");
								}}
							>
								Drukuj
							</Button>
						</Grid>
					</Grid>
				)}

				{inspectionsList &&
					inspectionsList.map((activitiesList, i) => (
						<Grid key={i} container className={classes.form}>
							<Grid item xs={12}>
								<Typography variant="h5" align="center">
									{activitiesList.activityGroup.name}
								</Typography>
							</Grid>

							{activitiesList &&
								activitiesList.activities.map((activity, j) => (
									<Grid item xs={12} key={j}>
										<Grid container spacing={2} className={classes.container}>
											{validToken && user && authorities !== "ROLE_ADMIN" ? (
												<Grid item xs={12} md={8}>
													<Typography align="justify">
														{activity.name}
													</Typography>
												</Grid>
											) : (
												<Grid item xs={12} md={4}>
													<Typography align="justify">
														{activity.name}
													</Typography>
												</Grid>
											)}
											{validToken && user && authorities === "ROLE_ADMIN" ? (
												<Grid item xs={12} md={2}>
													{activity.type && (
														<Typography>{activity.type}</Typography>
													)}
												</Grid>
											) : null}
											<Grid item xs={12} md={2}>
												{activity.emsr && (
													<Typography>{activity.emsr}</Typography>
												)}
											</Grid>
											<Grid item xs={12} md={2}>
												{activity.setting && (
													<Typography>{activity.setting}</Typography>
												)}
											</Grid>
											{validToken && user && authorities === "ROLE_ADMIN" ? (
												<Grid item xs={12} md={2}>
													{activity.listItems && (
														<>
															<Typography>
																<b>Elementy listy:</b>
															</Typography>
															<Typography>{activity.listItems}</Typography>
														</>
													)}
												</Grid>
											) : null}
											<Grid item xs={12}>
												<Divider />
											</Grid>
										</Grid>
									</Grid>
								))}
						</Grid>
					))}
			</>
		);
	}
}

InspectionActivities.propTypes = {
	inspection: PropTypes.object.isRequired,
	getActivitiesByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired,
	generateActivityReport: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getActivitiesByConnection: (connectionId, history) => {
			dispatch(getActivitiesByConnection(connectionId, history));
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		},
		generateActivityReport: (connectionId, fileName) => {
			dispatch(generateActivityReport(connectionId, fileName));
		}
	};
};

const mapStateToPros = (state) => ({
	inspection: state.inspection,
	security: state.security
});

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(styles)(InspectionActivities));
