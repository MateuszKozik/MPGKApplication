import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getActivitiesByConnection } from "../../actions/activityActions";
import { Grid, Typography, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { tableStyles } from "./../../consts/themeConsts";

class InspectionActivities extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getActivitiesByConnection(connectionId, this.props.history);
	}

	render() {
		const { homePageActivities } = this.props.activity;
		const { classes } = this.props;
		return (
			<>
				{homePageActivities.map((activitiesList, i) => (
					<Grid key={i} container className={classes.form}>
						<Grid item xs={12}>
							<Typography variant="h5" align="center">
								{activitiesList.activityGroup.name}
							</Typography>
						</Grid>

						{activitiesList.activities.map((activity, j) => (
							<Grid item xs={12} key={j}>
								<Grid container spacing={2} className={classes.container}>
									<Grid item xs={12} md={8}>
										<Typography align="justify">{activity.name}</Typography>
									</Grid>
									<Grid item xs={12} md={2}>
										{activity.emsr && <Typography>{activity.emsr}</Typography>}
									</Grid>
									<Grid item xs={12} md={2}>
										{activity.setting && (
											<Typography>{activity.setting}</Typography>
										)}
									</Grid>
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
	activity: PropTypes.object.isRequired,
	getActivitiesByConnection: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getActivitiesByConnection: (connectionId, history) => {
			dispatch(getActivitiesByConnection(connectionId, history));
		}
	};
};

const mapStateToPros = (state) => ({
	activity: state.activity
});

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(tableStyles)(InspectionActivities));
