import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getInspectionByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import InspectionItem from "../Common/InspectionItem";

class Inspection extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getInspectionByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	render() {
		const { actualInspection } = this.props.inspection;
		return (
			<div className="container mt-2">
				{actualInspection.map((inspectionList, k) => (
					<div className="row mt-3" key={k}>
						<div className="col-md-12 my-2">
							<h4>{inspectionList.activityGroup.name}</h4>
						</div>

						{inspectionList.inspections.map((inspection, i) => (
							<InspectionItem
								key={i}
								{...inspection}
								showEmsr={inspectionList.showEmsr}
								showSetting={inspectionList.showSetting}
								connectionId={this.props.match.params.connectionId}
							/>
						))}
					</div>
				))}
			</div>
		);
	}
}

Inspection.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspectionByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection
});

export default connect(mapStateToPros, {
	getInspectionByConnection,
	clearInspectionsListState
})(Inspection);
