import React, { Component } from "react";
import { connect } from "react-redux";
import { getOverviews, deleteOverview } from "../../actions/overviewActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddButton from "../Common/AddButton";

class OverviewList extends Component {
	componentDidMount() {
		this.props.getOverviews();
	}

	onDeleteClick = (overviewId) => {
		this.props.deleteOverview(overviewId);
	};

	render() {
		const { overviews } = this.props.overview;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Przeglądy</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/overviews/add"
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
								<th>Parametry</th>
								<th>Uwagi</th>
								<th>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{overviews.map((overview) => (
								<tr key={overview.overviewId}>
									<td>{overview.status}</td>
									<td>{overview.startTime}</td>
									<td>{overview.endTime}</td>
									<td>{overview.parameter}</td>
									<td>{overview.comment}</td>
									<td>
										<Link
											to={`/overviews/update/${overview.overviewId}`}
											className="btn btn-primary my-1"
										>
											Edytuj
										</Link>
										<button
											onClick={this.onDeleteClick.bind(
												this,
												overview.overviewId
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

OverviewList.propTypes = {
	overview: PropTypes.object.isRequired,
	getOverviews: PropTypes.func.isRequired,
	deleteOverview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	overview: state.overview
});

export default connect(mapStateToProps, { getOverviews, deleteOverview })(
	OverviewList
);
