import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
	getFluidPlaces,
	deleteFluidPlace
} from "../../actions/fluidPlaceActions";
import AddButton from "../Common/AddButton";

class FluidPlaceList extends Component {
	componentDidMount() {
		this.props.getFluidPlaces();
	}

	onDeleteClick = (placeId) => {
		this.props.deleteFluidPlace(placeId);
	};

	render() {
		const { fluidPlaces } = this.props.fluidPlace;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Miejsca dodania płynów</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/fluid-places/add"
							className="btn btn-info"
							message="Dodaj miejsce dodania czynnika"
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
							{fluidPlaces.map((fluidPlace) => (
								<tr key={fluidPlace.placeId}>
									<td>{fluidPlace.name}</td>
									<td>
										<Link
											to={`/fluid-places/update/${fluidPlace.placeId}`}
											className="btn btn-primary my-1"
										>
											Edytuj
										</Link>
										<button
											onClick={this.onDeleteClick.bind(
												this,
												fluidPlace.placeId
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

FluidPlaceList.propTypes = {
	fluidPlace: PropTypes.object.isRequired,
	getFluidPlaces: PropTypes.func.isRequired,
	deleteFluidPlace: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	getFluidPlaces: () => {
		dispatch(getFluidPlaces());
	},
	deleteFluidPlace: (placeId) => {
		dispatch(deleteFluidPlace(placeId));
	}
});

const mapStateToProps = (state) => ({
	fluidPlace: state.fluidPlace
});

export default connect(mapStateToProps, mapDispatchToProps)(FluidPlaceList);
