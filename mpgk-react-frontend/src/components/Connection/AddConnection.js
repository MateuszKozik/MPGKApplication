import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addConnection } from "../../actions/connectionActions";
import classnames from "classnames";
import { getInspectionTypes } from "../../actions/inspectionTypeActions";
import { getDevices } from "../../actions/deviceActions";

class AddConnection extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			status: "",
			typeId: "",
			deviceId: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getInspectionTypes();
		this.props.getDevices();
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		let newConnection = { name: this.state.name, status: this.state.status };
		if (this.state.deviceId !== "") {
			newConnection = {
				...newConnection,
				device: { deviceId: this.state.deviceId }
			};
		}
		if (this.state.typeId !== "") {
			newConnection = {
				...newConnection,
				inspectionType: { typeId: this.state.typeId }
			};
		}
		this.props.addConnection(newConnection, this.props.history);
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
		const { inspectionTypes } = this.props.inspectionType;
		const { devices } = this.props.device;
		return (
			<div className="container mt-4">
				<h1 className="h2">Dodaj powiązanie</h1>
				<form onSubmit={this.onSubmit} className="mt-4">
					<div className="row">
						<div className="col-md-4 offset-md-4 text-center">
							<div className="form-group">
								<label>Nazwa powiązania</label>
								<input
									className={classnames("form-control", {
										"is-invalid": errors.name
									})}
									name="name"
									type="text"
									value={this.state.name}
									onChange={this.onChange}
									placeholder="Nazwa powiązania"
								/>
								{errors.name && (
									<div className="invalid-feedback">{errors.name}</div>
								)}
							</div>
							<div className="form-group">
								<label>Rodzaj przeglądu</label>
								<select
									name="typeId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz rodzaj przeglądu </option>
									{inspectionTypes.map((inspectionType) => (
										<option
											key={inspectionType.typeId}
											value={inspectionType.typeId}
										>
											{inspectionType.name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label>Urządzenie</label>
								<select
									name="deviceId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz urządzenie </option>
									{devices.map((device) => (
										<option key={device.deviceId} value={device.deviceId}>
											{device.name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group ">
								<label>Status powiązania</label>
								<br />
								<div className="form-check">
									<input
										className={classnames("form-check-input", {
											"is-invalid": errors.status
										})}
										type="radio"
										name="status"
										value="true"
										checked={this.state.status === "true"}
										onChange={this.onChange}
									/>
									<label className="form-check-label">Aktywne</label>
								</div>
								<div className="form-check">
									<input
										className={classnames("form-check-input", {
											"is-invalid": errors.status
										})}
										type="radio"
										name="status"
										value="false"
										checked={this.state.status === "false"}
										onChange={this.onChange}
									/>
									<label className="form-check-label">Nieaktywne</label>
									{errors.status && (
										<div className="invalid-feedback">{errors.status}</div>
									)}
								</div>
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

AddConnection.propTypes = {
	addConnection: PropTypes.func.isRequired,
	inspectionType: PropTypes.object.isRequired,
	device: PropTypes.object.isRequired,
	getInspectionTypes: PropTypes.func.isRequired,
	getDevices: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	inspectionType: state.inspectionType,
	device: state.device,
	errors: state.errors
});

export default connect(mapStateToProps, {
	addConnection,
	getInspectionTypes,
	getDevices
})(AddConnection);
