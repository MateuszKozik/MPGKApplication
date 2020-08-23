import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getOverdueByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import InspectionItem from "../Common/InspectionItem";

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
		const { overdueInspection } = this.props.inspection;
		return (
			<div className="container mt-2">
				{overdueInspection.map((inspectionList, k) => (
					<div className="row mt-3" key={k}>
						<div className="col-md-12 my-2">
							<h4>{inspectionList.activityGroup.name}</h4>
						</div>

						{inspectionList.inspections.map((inspection, i) => (
							<InspectionItem
								key={i}
								{...inspection}
								connectionId={this.props.match.params.connectionId}
							/>
						))}
					</div>
				))}
			</div>
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

export default connect(mapStateToPros, {
	getOverdueByConnection,
	clearInspectionsListState
})(OverdueInspection);
