import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	getFluidRegistries,
	deleteFluidRegistry
} from "../../actions/fluidRegistryActions";
import AddButton from "../Common/AddButton";
import FormatDate from "../Common/FormatDate";

class FluidRegistryList extends Component {
	componentDidMount() {
		this.props.getFluidRegistries();
	}

	onDeleteClick(registryId) {
		this.props.deleteFluidRegistry(registryId);
	}

	render() {
		const { fluidRegistries } = this.props.fluidRegistry;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Rejestry płynów</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
							link="/fluid-registries/add"
							className="btn btn-info"
							message="Dodaj rejestr płynu"
						/>
					</div>
				</div>
				<div className="table-responsive mt-2">
					<table className="table ">
						<thead>
							<tr>
								<th>Ilość płynu [L]</th>
								<th>Czas wykonania</th>
								<th>Akcje</th>
							</tr>
						</thead>
						<tbody>
							{fluidRegistries.map((fluidRegistry) => (
								<tr key={fluidRegistry.registryId}>
									<td>{fluidRegistry.quantity}</td>
									<td><FormatDate date={fluidRegistry.datetime} datetime={true} /></td>
									<td>
										<Link
											to={`/fluid-registries/update/${fluidRegistry.registryId}`}
											className="btn btn-primary my-1"
										>
											Edytuj
										</Link>
										<button
											onClick={this.onDeleteClick.bind(
												this,
												fluidRegistry.registryId
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

const mapDispatchToProps = (dispatch) => ({
	getFluidRegistries: () => {
		dispatch(getFluidRegistries());
	},
	deleteFluidRegistry: (registryId) => {
		dispatch(deleteFluidRegistry(registryId));
	}
});

const mapStateToProps = (state) => ({
	fluidRegistry: state.fluidRegistry
});

export default connect(mapStateToProps, mapDispatchToProps)(FluidRegistryList);
