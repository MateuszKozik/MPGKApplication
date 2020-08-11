import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { addNewFluidRegistry } from "../../actions/fluidRegistryActions";
import { getPersons } from "../../actions/personActions";
import { getFluidPlaces } from "../../actions/fluidPlaceActions";
import { getFluids } from "../../actions/fluidActions";

class AddWorkingFluid extends Component {
	constructor() {
		super();

		this.state = {
			quantity: "",
			personId: "",
			fluidId: "",
			placeId: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getPersons();
		this.props.getFluidPlaces();
		this.props.getFluids();
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		let newFluidRegistry = {
			quantity: this.state.quantity
		};

		if (this.state.personId !== "") {
			newFluidRegistry = {
				...newFluidRegistry,
				person: { personId: this.state.personId }
			};
		}
		if (this.state.fluidId !== "") {
			newFluidRegistry = {
				...newFluidRegistry,
				fluid: { fluidId: this.state.fluidId }
			};
		}
		if (this.state.placeId !== "") {
			newFluidRegistry = {
				...newFluidRegistry,
				fluidPlace: { placeId: this.state.placeId }
			};
		}
		this.props.addNewFluidRegistry(newFluidRegistry, this.props.history);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}

	render() {
		const { errors } = this.state;
		const { persons } = this.props.person;
		const { fluids } = this.props.fluid;
		const { fluidPlaces } = this.props.fluidPlace;

		return (
			<div className="container mt-2">
				<h1 className="h2 mb-4">Dodaj płyn roboczy</h1>
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="col-md-4 offset-md-4 text-center">
							<div className="form-group">
								<label>Ilość</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.quantity
									})}
									name="quantity"
									type="number"
									onChange={this.onChange}
									value={this.state.quantity}
								/>
								{errors.quantity && (
									<div className="invalid-feedback">{errors.quantity}</div>
								)}
							</div>
							<div className="form-group">
								<label>Osoba</label>
								<select
									name="personId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz osobę </option>
									{persons.map((person) => (
										<option key={person.personId} value={person.personId}>
											{person.name + " " + person.surname}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label>Miejsce dodania płynu</label>
								<select
									name="placeId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz miejsce </option>
									{fluidPlaces.map((fluidPlace) => (
										<option key={fluidPlace.placeId} value={fluidPlace.placeId}>
											{fluidPlace.name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label>Płyn</label>
								<select
									name="fluidId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz płyn </option>
									{fluids.map((fluid) => (
										<option key={fluid.fluidId} value={fluid.fluidId}>
											{fluid.name}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 text-center">
							<button type="submit" className="btn btn-primary" >
								Zapisz
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

AddWorkingFluid.propTypes = {
	addNewFluidRegistry: PropTypes.func.isRequired,
	getPersons: PropTypes.func.isRequired,
	getFluidPlaces: PropTypes.func.isRequired,
	getFluids: PropTypes.func.isRequired,
	person: PropTypes.object.isRequired,
	fluid: PropTypes.object.isRequired,
	fluidPlace: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	person: state.person,
	fluid: state.fluid,
	fluidPlace: state.fluidPlace,
	errors: state.errors
});

export default connect(mapStateToProps, {
	addNewFluidRegistry,
	getPersons,
	getFluidPlaces,
	getFluids
})(AddWorkingFluid);
