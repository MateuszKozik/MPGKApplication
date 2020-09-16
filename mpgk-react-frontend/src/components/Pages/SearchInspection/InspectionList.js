import React, { Component } from "react";
import PropTypes from "prop-types";

import Row from "../SearchInspection/Row";

import { withStyles } from "@material-ui/core/styles";
import { tableStyles } from "./../../../consts/themeConsts";
import { connect } from "react-redux";
import {
	getInspectionByConnectionAndStartTimeAndEndTime,
	clearInspectionState
} from "../../../actions/inspectionActions";
import { Button, Grid, Typography } from "@material-ui/core";
import { generateInspectionReport } from "../../../actions/pdfGeneratorActions";

class InspectionList extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		const { startTime } = this.props.match.params;
		const { endTime } = this.props.match.params;
		this.props.getInspectionByConnectionAndStartTimeAndEndTime(
			connectionId,
			startTime,
			endTime,
			this.props.history
		);
	}

	componentWillUnmount() {
		this.props.clearInspectionState();
	}

	render() {
		const { inspections } = this.props.inspection;
		const { classes } = this.props;
		const { connectionId } = this.props.match.params;

		return (
			<>
				{inspections && inspections[0] && (
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
									this.props.generateInspectionReport(
										connectionId,
										inspections[0].startTime,
										inspections[0].endTime,
										"Raport"
									);
								}}
							>
								Drukuj
							</Button>
						</Grid>
					</Grid>
				)}

				{inspections &&
					inspections.map((inspectionList, k) => (
						<Grid key={k} container className={classes.container}>
							<Grid item xs={12}>
								<Typography variant="h5" align="center">
									{inspectionList.activityGroup.name}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								{inspectionList &&
									inspectionList.inspections.map((inspection, i) => (
										<Row
											key={i}
											{...inspection}
											showEmsr={inspectionList.showEmsr}
											showSetting={inspectionList.showSetting}
											connectionId={this.props.match.params.connectionId}
										/>
									))}
							</Grid>
						</Grid>
					))}
			</>
		);
	}
}

InspectionList.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspectionByConnectionAndStartTimeAndEndTime: PropTypes.func.isRequired,
	clearInspectionState: PropTypes.func.isRequired,
	generateInspectionReport: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		inspection: state.inspection
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getInspectionByConnectionAndStartTimeAndEndTime: (
			connectionId,
			starttime,
			endtime,
			history
		) => {
			dispatch(
				getInspectionByConnectionAndStartTimeAndEndTime(
					connectionId,
					starttime,
					endtime,
					history
				)
			);
		},
		clearInspectionState: () => {
			dispatch(clearInspectionState());
		},
		generateInspectionReport: (connectionId, startTime, endTime, fileName) => {
			dispatch(
				generateInspectionReport(connectionId, startTime, endTime, fileName)
			);
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(InspectionList));
