import React, { Component } from "react";
import { connect } from "react-redux";
import { getFluidRegistries } from "../../actions/fluidRegistryActions";
import AddButton from "../Common/AddButton";

class FluidRegistry extends Component {
	componentDidMount() {
		this.props.getFluidRegistries();
	}

	render() {
		const { fluidRegistries } = this.props.fluidRegistry;
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Rejestry płynów</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddButton
								link="/new-fluid-registry/add"
								className="btn btn-info"
								message="Dodaj płyn roboczy"
							/>
						</div>
				</div>
				<div className="table-responsive mt-2">
					<table className="table ">
						<thead>
							<tr>
								<th>Miejsce dodania</th>
								<th>Rodzaj czynnika</th>
								<th>Ilość [litry]</th>
								<th>Data i godzina</th>
								<th>Imię i nazwisko</th>
							</tr>
						</thead>
						<tbody>
							{fluidRegistries.map((fluidRegistry) => (
								<tr key={fluidRegistry.registryId}>
									<td>
										{fluidRegistry.fluidPlace
											? fluidRegistry.fluidPlace.name
											: null}
									</td>
									<td>
										{fluidRegistry.fluid ? fluidRegistry.fluid.name : null}
									</td>
									<td>{fluidRegistry.quantity}</td>
									<td>{fluidRegistry.datetime}</td>
									<td>
										{fluidRegistry.person
											? fluidRegistry.person.name +
											  " " +
											  fluidRegistry.person.surname
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

const mapStateToProps = (state) => ({
	fluidRegistry: state.fluidRegistry
});

const mapDispatchToProps = (dispatch) => ({
	getFluidRegistries: () => {
		dispatch(getFluidRegistries());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(FluidRegistry);
