import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getOverdueByConnection,
	clearOverviewsListState
} from "../../actions/overviewActions";
import OverviewItem from "../Common/OverviewItem";

class OverdueOverview extends Component {
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
		this.props.clearOverviewsListState();
	}

	render() {
		const { overdueOverview } = this.props.overview;
		return (
			<div className="container mt-2">
				{overdueOverview.map((overviewList, k) => (
					<div className="row mt-3" key={k}>
						<div className="col-md-12 my-2">
							<h4>{overviewList.activityGroup.name}</h4>
						</div>

						{overviewList.overviews.map((overview, i) => (
							<OverviewItem
								key={i}
								{...overview}
								connectionId={this.props.match.params.connectionId}
							/>
						))}
					</div>
				))}
			</div>
		);
	}
}

OverdueOverview.propTypes = {
	overview: PropTypes.object.isRequired,
	getOverdueByConnection: PropTypes.func.isRequired,
	clearOverviewsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	overview: state.overview
});

export default connect(mapStateToPros, {
	getOverdueByConnection,
	clearOverviewsListState
})(OverdueOverview);
