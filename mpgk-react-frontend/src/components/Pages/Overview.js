import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOverviewsByConnection } from "../../actions/overviewActions";
import OverviewItem from "../Common/OverviewItem";

class Overview extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getOverviewsByConnection(connectionId, this.props.history);
	}

	render() {
		const { overviewsList } = this.props.overview;

		return (
			<div className="container mt-2">
				{overviewsList.map((overviewList, k) => (
					<div className="row mt-3" key={k}>
						<div className="col-md-12 my-2">
							<h4>{overviewList.activityGroup.name}</h4>
						</div>

						{overviewList.overviews.map((overview, i) => (
							<OverviewItem key={i} {...overview} />
						))}
					</div>
				))}
			</div>
		);
	}
}

Overview.propTypes = {
	overview: PropTypes.object.isRequired,
	getOverviewsByConnection: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	overview: state.overview
});

export default connect(mapStateToPros, { getOverviewsByConnection })(Overview);
