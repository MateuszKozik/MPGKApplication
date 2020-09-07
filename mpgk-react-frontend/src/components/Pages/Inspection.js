import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getInspectionByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import InspectionItem from "../Common/InspectionItem";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { tableStyles } from "./../../consts/themeConsts";

class Inspection extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getInspectionByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	render() {
		const { classes } = this.props;
		const { actualInspection } = this.props.inspection;
		return (
			<>
				{actualInspection.map((inspectionList, k) => (
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

Inspection.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspectionByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getInspectionByConnection: (connectionId, history) => {
			dispatch(getInspectionByConnection(connectionId, history));
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
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
