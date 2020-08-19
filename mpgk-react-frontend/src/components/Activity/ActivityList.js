import React, { Component } from "react";
import { connect } from "react-redux";
import { getActivities, deleteActivity } from "../../actions/activityActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddButton from "../Common/AddButton";

class ActivityList extends Component {
	componentDidMount() {
		this.props.getActivities();
	}

	onDeleteClick = (activityId) => {
		this.props.deleteActivity(activityId);
	};

	render() {
		const { activities } = this.props.activity;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Czynności</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/activities/add"
							className="btn btn-info"
							message="Dodaj czynność"
						/>
					</div>
				</div>
				<div className="table-responsive mt-2">
					<table className="table ">
						<thead>
							<tr>
								<th>Nazwa</th>
								<th>Typ pola</th>
								<th>EMSR</th>
								<th>Nastawa</th>
								<th>Elementy listy</th>
								<th>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{activities.map((activity) => (
								<tr key={activity.activityId}>
									<td>{activity.name}</td>
									<td>{activity.type}</td>
									<td>{activity.emsr}</td>
									<td>{activity.setting}</td>
									<td>{activity.listItems}</td>
									<td>
										<Link
											to={`/activities/update/${activity.activityId}`}
											className="btn btn-primary my-1"
										>
											Edytuj
										</Link>
										<button
											onClick={this.onDeleteClick.bind(
												this,
												activity.activityId
											)}
											className="btn btn-danger ml-2 my-1"
										>
											Usuń
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

ActivityList.propTypes = {
	activity: PropTypes.object.isRequired,
	getActivities: PropTypes.func.isRequired,
	deleteActivity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { getActivities, deleteActivity })(
	ActivityList
);
