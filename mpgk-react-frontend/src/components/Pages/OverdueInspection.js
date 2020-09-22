import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getOverdueByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import InspectionItem from "../Common/InspectionItem";
import { Button, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./../../consts/themeConsts";
import { generateInspectionReport } from "../../actions/pdfGeneratorActions";

class OverdueInspection extends Component {
	state = {
		active: "NIE"
	};

	componentDidMount() {
		const { connectionId } = this.props.match.params;
		const { endtime } = this.props.match.params;
		this.props.getOverdueByConnection(
			connectionId,
			endtime,
			this.props.history
		);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	handleCommonChange = (value) => {
		this.setState({ active: value });
	};

	render() {
		const { classes } = this.props;
		const { overdueInspection } = this.props.inspection;
		const { connectionId } = this.props.match.params;

		return (
			<>
				{overdueInspection && overdueInspection[0] && (
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
										overdueInspection[0].startTime,
										overdueInspection[0].endTime,
										"Raport"
									);
								}}
							>
								Drukuj
							</Button>
						</Grid>
					</Grid>
				)}

				{overdueInspection && overdueInspection.length > 0 ? (
					overdueInspection.map((inspectionList, k) => (
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
					))
				) : (
					<Typography
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: 20
						}}
						variant="h5"
					>
						Trwa wczytywanie..
					</Typography>
				)}
			</>
		);
	}
}

OverdueInspection.propTypes = {
	inspection: PropTypes.object.isRequired,
	getOverdueByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired,
	generateInspectionReport: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection
});

const mapDispatchToProps = (dispatch) => {
	return {
		getOverdueByConnection: (connectionId, history) => {
			dispatch(getOverdueByConnection(connectionId, history));
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

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(styles)(OverdueInspection));
