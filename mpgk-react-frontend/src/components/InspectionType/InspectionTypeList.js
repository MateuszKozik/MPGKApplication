import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getInspectionTypes,
	deleteInspectionType
} from "../../actions/inspectionTypeActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddButton from "../Common/AddButton";

class InspectionTypeList extends Component {
	componentDidMount() {
		this.props.getInspectionTypes();
	}

	onDeleteClick = (typeId) => {
		this.props.deleteInspectionType(typeId);
	};

	render() {
		const { inspectionTypes } = this.props.inspectionType;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Rodzaje przeglądów</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/inspection-types/add"
							className="btn btn-info"
							message="Dodaj rodzaj przeglądu"
						/>
					</div>
				</div>
				<div className="table-responsive mt-2">
					<table className="table">
						<thead>
							<tr>
								<th>Nazwa</th>
								<th>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{inspectionTypes.map((inspectionType) => (
								<tr key={inspectionType.typeId}>
									<td>{inspectionType.name}</td>
									<td>
										<Link
											to={`/inspection-types/update/${inspectionType.typeId}`}
											className="btn btn-primary my-1"
										>
											Edytuj
										</Link>
										<button
											onClick={this.onDeleteClick.bind(
												this,
												inspectionType.typeId
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

InspectionTypeList.propTypes = {
	inspectionType: PropTypes.object.isRequired,
	getInspectionTypes: PropTypes.func.isRequired,
	deleteInspectionType: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	inspectionType: state.inspectionType
});

export default connect(mapStateToProps, {
	getInspectionTypes,
	deleteInspectionType
})(InspectionTypeList);
