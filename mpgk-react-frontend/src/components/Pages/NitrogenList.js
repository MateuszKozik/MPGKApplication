import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getActionsByName,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import PropTypes from "prop-types";
import FormatDate from "../Common/FormatDate";

class NitrogenList extends Component {
	componentDidMount() {
		this.props.getActionsByName(this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}

	render() {
		const { inspections } = this.props.inspection;

		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">
					Rejest wymiany butli z azotem w instalacji ORC
				</h1>
				<div className="table-responsive mt-2">
					<table className="table mt-4">
						<thead>
							<tr>
								<th>Nazwa</th>
								<th>Data i godzina</th>
								<th>Imię i nazwisko</th>
							</tr>
						</thead>
						<tbody>
							{inspections.map((inspection) => (
								<tr key={inspection.inspectionId}>
									<td>Wymiana butli</td>
									<td>
										<FormatDate date={inspection.endTime} datetime={true} />
									</td>
									<td>
										{inspection.person
											? inspection.person.name + " " + inspection.person.surname
											: null}
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

NitrogenList.propTypes = {
	inspection: PropTypes.object.isRequired,
	getActionsByName: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	inspection: state.inspection
});

export default connect(mapStateToProps, {
	getActionsByName,
	clearInspectionsListState
})(NitrogenList);
