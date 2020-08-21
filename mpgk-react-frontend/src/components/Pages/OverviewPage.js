import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getOverviewsByConnection,
	clearOverviewsListState
} from "../../actions/overviewActions";
import PropTypes from "prop-types";
import Timer from "../Common/Timer";
import FormatDate from "../Common/FormatDate";
import { Link } from "react-router-dom";

class OverviewPage extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getOverviewsByConnection(connectionId, this.props.history);
	}

	componentWillUnmount() {
		this.props.clearOverviewsListState();
	}

	render() {
		const { overviewsList } = this.props.overview;
		const actualOverviews = overviewsList.filter(
			(overviews) => overviews.overdue === false
		);
		const overdueOverviews = overviewsList.filter(
			(overviews) => overviews.overdue
		);

		return (
			<div className="container">
				{actualOverviews.map((overview, i) => (
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
								to={`/overviews/list/${overview.connection.connectionId}/execute`}
							>
								{overview.connection.name}
							</Link>
						</div>
						<div className="col-md-4">
							<Timer date={overview.endTime} />
						</div>
						<div className="col-md-4">
							<p>{overview.overviewStatus} </p>
						</div>
					</div>
				))}
				{overdueOverviews.length > 0 && (
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

				{overdueOverviews.map((overdue, i) => (
					<div key={i} className="row">
						<div className="col-md-4">
							<Link
								to={`/overviews/list/${overdue.connection.connectionId}/overdue/${overdue.endTime}`}
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

OverviewPage.propTypes = {
	overview: PropTypes.object.isRequired,
	getOverviewsByConnection: PropTypes.func.isRequired,
	clearOverviewsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	overview: state.overview
});

export default connect(mapStateToPros, {
	getOverviewsByConnection,
	clearOverviewsListState
})(OverviewPage);
