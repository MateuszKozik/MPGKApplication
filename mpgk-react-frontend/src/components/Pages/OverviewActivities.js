import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getActivitiesByConnection } from "../../actions/activityActions";

class OverviewActivities extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getActivitiesByConnection(connectionId, this.props.history);
	}

	render() {
		const { homePageActivities } = this.props.activity;

		return (
			<div className="container mt-2">
				{homePageActivities.map((activitiesList, i) => (
					<div className="row mt-3 " key={i}>
						<div className="col-md-12 my-2">
							<h4>{activitiesList.activityGroup.name}</h4>
						</div>

						{activitiesList.activities.map((activity, j) => (
							<div key={j} className="row p-2 my-2 border-bottom ">
								<div className="col-md-12 my-2 text-justify">
									{activity.name}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		);
	}
}

OverviewActivities.propTypes = {
	activity: PropTypes.object.isRequired,
	getActivitiesByConnection: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	activity: state.activity
});

export default connect(mapStateToPros, { getActivitiesByConnection })(
	OverviewActivities
);
