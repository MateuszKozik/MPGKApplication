import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getInspectionByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import InspectionItem from "../Common/InspectionItem";
import { Button, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { tableStyles } from "./../../consts/themeConsts";
import { generateInspectionReport } from "../../actions/pdfGeneratorActions";

class Inspection extends Component {
	state = {
		active: "NIE"
	};

	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getInspectionByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	handleCommonChange = (value) => {
		this.setState({ active: value });
	};

	render() {
		const { classes } = this.props;
		const { actualInspection } = this.props.inspection;
		const { connectionId } = this.props.match.params;

		return (
			<>
				{actualInspection && actualInspection[0] && (
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
										actualInspection[0].startTime,
										actualInspection[0].endTime,
										"Raport"
									);
								}}
							>
								Drukuj
							</Button>
						</Grid>
					</Grid>
				)}
				{actualInspection &&
					actualInspection.map((inspectionList, k) => (
						<Grid key={k} container className={classes.container}>
							<Grid item xs={12}>
								<Typography variant="h5" align="center">
									{inspectionList.activityGroup.name}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								{inspectionList &&
									inspectionList.inspections.map((inspection, i) => (
										<InspectionItem
											key={i}
											handleCommonChange={this.handleCommonChange}
											value={this.state.active}
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

Inspection.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspectionByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired,
	generateInspectionReport: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getInspectionByConnection: (connectionId, history) => {
			dispatch(getInspectionByConnection(connectionId, history));
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		},
		generateInspectionReport: (connectionId, startTime, endTime, fileName) => {
			dispatch(
				generateInspectionReport(connectionId, startTime, endTime, fileName)
			);
		}
	};
};

const mapStateToPros = (state) => {
	return {
		inspection: state.inspection
	};
};

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(tableStyles)(Inspection));
