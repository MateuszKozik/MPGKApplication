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
import {
	Grid,
	Typography,
	Table,
	TableBody,
	TableContainer
} from "@material-ui/core";

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

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							{inspections[0] &&
								inspections[0].activityGroup &&
								inspections[0].activityGroup.connection.name}
						</Typography>
					</Grid>
					<Grid item xs={false} md={2} />
					<Grid item xs={12} md={8}>
						<TableContainer>
							<Table aria-label="collapsible table">
								<TableBody>
									{inspections && inspections.map((inspection, i) => (
										<Row key={i} row={inspection} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={2} />
				</Grid>
			</>
		);
	}
}

InspectionList.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspectionByConnectionAndStartTimeAndEndTime: PropTypes.func.isRequired,
	clearInspectionState: PropTypes.func.isRequired
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
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(InspectionList));
