import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getInspections,
	deleteInspection
} from "../../actions/inspectionActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddButton from "../Common/AddButton";
import FormatDate from "../Common/FormatDate";

class InspectionList extends Component {
	componentDidMount() {
		this.props.getInspections();
	}

	onDeleteClick = (inspectionId) => {
		this.props.deleteInspection(inspectionId);
	};

	render() {
		const { inspections } = this.props.inspection;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Przeglądy</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/inspections/add"
							className="btn btn-info"
							message="Dodaj przegląd"
						/>
					</div>
				</div>
				<div className="table-responsive mt-2">
					<table className="table ">
						<thead>
							<tr>
								<th>Status</th>
								<th>Czas rozpoczęcia</th>
								<th>Czas wykonania</th>
								<th>Czas zakończenia</th>
								<th>Parametry</th>
								<th>Uwagi</th>
								<th>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{inspections.map((inspection) => (
								<tr key={inspection.inspectionId}>
									<td>{inspection.status}</td>
									<td><FormatDate date={inspection.startTime} datetime={true} /></td>
									<td><FormatDate date={inspection.datetime} datetime={true} /></td>
									<td><FormatDate date={inspection.endTime} datetime={true} /></td>
									<td>{inspection.parameter}</td>
									<td>{inspection.comment}</td>
									<td>
										<Link
											to={`/inspections/update/${inspection.inspectionId}`}
											className="btn btn-primary my-1"
										>
											Edytuj
										</Link>
										<button
											onClick={this.onDeleteClick.bind(
												this,
												inspection.inspectionId
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

InspectionList.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspections: PropTypes.func.isRequired,
	deleteInspection: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	inspection: state.inspection
});

export default connect(mapStateToProps, { getInspections, deleteInspection })(
	InspectionList
);
