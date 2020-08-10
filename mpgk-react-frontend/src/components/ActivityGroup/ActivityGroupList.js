import React, { Component } from "react";
import { connect } from "react-redux";
import { getGroups, deleteGroup } from "../../actions/activityGroupActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddButton from "../Common/AddButton";

class ActivityGroupList extends Component {
	componentDidMount() {
		this.props.getGroups();
	}

	onDeleteClick = (groupId) => {
		this.props.deleteGroup(groupId);
	};

	render() {
		const { groups } = this.props.group;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Grupy czynności</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/groups/add"
							className="btn btn-info"
							message="Dodaj grupę"
						/>
					</div>
				</div>
				<div className="table-responsive mt-2">
					<table className="table ">
						<thead>
							<tr>
								<th>Nazwa</th>
								<th>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{groups.map((group) => (
								<tr key={group.groupId}>
									<td>{group.name}</td>
									<td>
										<Link
											to={`/groups/update/${group.groupId}`}
											className="btn btn-primary my-1"
										>
											Edytuj
										</Link>
										<button
											onClick={this.onDeleteClick.bind(this, group.groupId)}
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

ActivityGroupList.propTypes = {
	group: PropTypes.object.isRequired,
	getGroups: PropTypes.func.isRequired,
	deleteGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	group: state.group
});

export default connect(mapStateToProps, { getGroups, deleteGroup })(
	ActivityGroupList
);
