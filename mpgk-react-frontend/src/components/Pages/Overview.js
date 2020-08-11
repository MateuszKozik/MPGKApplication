import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOverviewsByConnection } from "../../actions/overviewActions";

class Overview extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getOverviewsByConnection(connectionId, this.props.history);
	}

	render() {
		const { overviewsList } = this.props.overview;

		return (
			<div className="container mt-2">
				{overviewsList.map((overviewList) => (
					<div>
						<h4>{overviewList.activityGroup.name}</h4>
						<div className="table-responsive mt-2">
							<table className="table ">
								<thead>
									<tr>
										<th>Zadanie</th>
										<th>Patametr</th>
										<th>Komentarz</th>
									</tr>
								</thead>
								<tbody>
									{overviewList.overviews.map((overview, i) => (
										<tr key={i}>
											<td>{overview.activity.name}</td>
											<td>
												<input
													type="text"
													className="form-control"
													name="parametr"
												></input>
											</td>
											<td>
												<input
													type="text"
													className="form-control"
													name="comment"
												></input>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
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
