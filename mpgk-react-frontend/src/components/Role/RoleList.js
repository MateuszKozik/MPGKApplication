import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRoles, deleteRole } from "../../actions/roleActions";
import AddButton from "../Common/AddButton";

class RoleList extends Component {
	componentDidMount() {
		this.props.getRoles();
	}

	onDeleteClick = (name) => {
		this.props.deleteRole(name);
	};

	render() {
		const { roles } = this.props.role;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Uprawnienia</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/roles/add"
							className="btn btn-info"
							message="Dodaj uprawnienie"
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
							{roles.map((role) => (
								<tr key={role.name}>
									<td>{role.name}</td>
									<td>
										<button
											onClick={this.onDeleteClick.bind(this, role.name)}
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

RoleList.propTypes = {
	role: PropTypes.object.isRequired,
	getRoles: PropTypes.func.isRequired,
	deleteRole: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	role: state.role
});

export default connect(mapStateToProps, { getRoles, deleteRole })(RoleList);
