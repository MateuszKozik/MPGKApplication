import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOverviewsByConnection } from "../../actions/overviewActions";

class Overview extends Component {
	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getOverviewsByConnection(connectionId, this.props.history);
	}

	selectInput(type) {
		switch (type) {
			case "Pole tekstowe":
				return <input type="text" className="form-control" name="parametr" />;
			case "Zaznaczenie":
				return (
					<input type="checkbox" className="form-control" name="parametr" />
				);
			case "Zakres liczb":
				return <input type="number" className="form-control" name="parametr" />;
			case "Pole wyboru":
				return (
					<div className="form-check">
						<label>TAK</label>
						<input type="radio" name="parametr" value="TAK" />
						<label>NIE</label>
						<input type="radio" name="parametr" value="NIE" />
					</div>
				);
			default:
				return <input type="text" className="form-control" name="comment" />;
		}
	}

	render() {
		const { overviewsList } = this.props.overview;

		return (
			<div className="container mt-2">
				{overviewsList.map((overviewList, k) => (
					<div key={k}>
						<h4>{overviewList.activityGroup.name}</h4>
						<div className="table-responsive mt-2">
							<table className="table ">
								<thead>
									<tr>
										<th>Zadanie</th>
										<th>Parametr</th>
										<th>Komentarz</th>
										<th>Zapisz</th>
									</tr>
								</thead>
								<tbody>
									{overviewList.overviews.map((overview, i) => (
										<tr key={i}>
											<td>{overview.activity.name}</td>
											<td>{this.selectInput(overview.activity.type)}</td>
											<td>
												<input
													type="text"
													className="form-control"
													name="comment"
												/>
											</td>
											<td>
												<button className="btn btn-primary">Zapisz</button>
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
