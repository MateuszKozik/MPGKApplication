import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getOverviewByConnection,
	clearOverviewsListState
} from "../../actions/overviewActions";
import OverviewItem from "../Common/OverviewItem";

class Overview extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getOverviewByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearOverviewsListState();
	}

	render() {
		const { actualOverview } = this.props.overview;
		return (
			<div className="container mt-2">
				{actualOverview.map((overviewList, k) => (
					<div className="row mt-3" key={k}>
						<div className="col-md-12 my-2">
							<h4>{overviewList.activityGroup.name}</h4>
						</div>

						{overviewList.overviews.map((overview, i) => (
							<OverviewItem
								key={i}
								{...overview}
								showEmsr={overviewList.showEmsr}
								showSetting={overviewList.showSetting}
								connectionId={this.props.match.params.connectionId}
							/>
						))}
					</div>
				))}
			</div>
		);
	}
}

Overview.propTypes = {
	overview: PropTypes.object.isRequired,
	getOverviewByConnection: PropTypes.func.isRequired,
	clearOverviewsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	overview: state.overview
});

export default connect(mapStateToPros, {
	getOverviewByConnection,
	clearOverviewsListState
})(Overview);
