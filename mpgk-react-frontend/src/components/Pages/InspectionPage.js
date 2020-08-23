import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getInspectionsByConnection,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import PropTypes from "prop-types";
import Timer from "../Common/Timer";
import FormatDate from "../Common/FormatDate";
import { Link } from "react-router-dom";

class InspectionPage extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getInspectionsByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	render() {
		const { inspectionsList } = this.props.inspection;
		const actualInspections = inspectionsList.filter(
			(inspections) => inspections.overdue === false
		);
		const overdueInspections = inspectionsList.filter(
			(inspections) => inspections.overdue
		);

		return (
			<div className="container">
				{actualInspections.map((inspection, i) => (
					<div key={i} className="row">
						<div className="col-md-12 my-4">
							<h4>Przegląd aktualny</h4>
						</div>
						<div className="col-md-4 ">
							<p>
								<b>Nazwa przegłądu</b>
							</p>
						</div>
						<div className="col-md-4 ">
							<p>
								<b>Czas do końca</b>
							</p>
						</div>
						<div className="col-md-4">
							<p>
								<b>Status</b>
							</p>
						</div>

						<div className="col-md-4">
							<Link
								to={`/inspections/list/${inspection.connection.connectionId}/execute`}
							>
								{inspection.connection.name}
							</Link>
						</div>
						<div className="col-md-4">
							<Timer date={inspection.endTime} />
						</div>
						<div className="col-md-4">
							<p>{inspection.inspectionStatus} </p>
						</div>
					</div>
				))}
				{overdueInspections.length > 0 && (
					<div className="row">
						<div className="col-md-12 my-4">
							<h4>Przeglądy zaległy</h4>
						</div>
						<div className="col-md-4 ">
							<p>
								<b>Nazwa przegłądu</b>
							</p>
						</div>
						<div className="col-md-4 ">
							<p>
								<b>Data zakończenia</b>
							</p>
						</div>
						<div className="col-md-4">
							<p>
								<b>Status</b>
							</p>
						</div>
					</div>
				)}

				{overdueInspections.map((overdue, i) => (
					<div key={i} className="row">
						<div className="col-md-4">
							<Link
								to={`/inspections/list/${overdue.connection.connectionId}/overdue/${overdue.endTime}`}
							>
								{overdue.connection.name}
							</Link>
						</div>
						<div className="col-md-4">
							<FormatDate date={overdue.endTime} />
						</div>
						<div className="col-md-4">
							<p>Zaległy </p>
						</div>
					</div>
				))}
			</div>
		);
	}
}

InspectionPage.propTypes = {
	inspection: PropTypes.object.isRequired,
	getInspectionsByConnection: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection
});

export default connect(mapStateToPros, {
	getInspectionsByConnection,
	clearInspectionsListState
})(InspectionPage);
