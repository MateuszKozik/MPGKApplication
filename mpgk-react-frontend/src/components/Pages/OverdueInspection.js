import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getOverdueByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import InspectionItem from "../Common/InspectionItem";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { tableStyles } from "./../../consts/themeConsts";

class OverdueInspection extends Component {
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

	render() {
		const { classes } = this.props;
		const { overdueInspection } = this.props.inspection;
		return (
			<>
				{overdueInspection.map((inspectionList, k) => (
					<Grid key={k} container className={classes.container}>
						<Grid item xs={12}>
							<Typography variant="h5" align="center">
								{inspectionList.activityGroup.name}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							{inspectionList.inspections.map((inspection, i) => (
								<InspectionItem
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

OverdueInspection.propTypes = {
	inspection: PropTypes.object.isRequired,
	getOverdueByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
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
		}
	};
};

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(tableStyles)(OverdueInspection));
