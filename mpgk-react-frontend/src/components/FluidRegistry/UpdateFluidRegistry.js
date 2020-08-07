import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import {
	getFluidRegistry,
	updateFluidRegistry
} from "../../actions/fluidRegistryActions";

class UpdateFluidRegistry extends Component {
	constructor() {
		super();

		this.state = {
			registryId: "",
			quantity: "",
			datetime: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		const { registryId } = this.props.match.params;
		this.props.getFluidRegistry(registryId, this.props.history);
	}

	componentDidUpdate(props, state, snapshot) {
		if (this.props.fluidRegistry !== props.fluidRegistry) {
			const { registryId, quantity, datetime } = this.props.fluidRegistry;

			this.setState({
				registryId: registryId,
				quantity: quantity,
				datetime: datetime
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const updatedFluidRegistry = {
			registryId: this.state.registryId,
			quantity: this.state.quantity,
			datetime: this.state.datetime
		};

		this.props.updateFluidRegistry(
			this.state.registryId,
			updatedFluidRegistry,
			this.props.history
		);
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

		return (
			<div className="container mt-2">
				<h1 className="h2 mb-4">Edytuj resjestr płynu</h1>
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
								<label>Czas wykonania</label>
								<input
									className="form-control"
									name="datetime"
									type="datetime-local"
									onChange={this.onChange}
									value={this.state.datetime}
								/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 text-center">
							<button type="submit" className="btn btn-primary">
								Zapisz
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

UpdateFluidRegistry.propTypes = {
	getFluidRegistry: PropTypes.func.isRequired,
	fluidRegistry: PropTypes.object.isRequired,
	updateFluidRegistry: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	fluidRegistry: state.fluidRegistry.fluidRegistry,
	errors: state.errors
});

export default connect(mapStateToProps, {
	getFluidRegistry,
	updateFluidRegistry
})(UpdateFluidRegistry);
