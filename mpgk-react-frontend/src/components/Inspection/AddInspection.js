import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { addInspection } from "../../actions/inspectionActions";
import { getActivities } from "../../actions/activityActions";
import { getPersons } from "../../actions/personActions";

class AddInspection extends Component {
	constructor() {
		super();

		this.state = {
			status: "",
			startTime: "",
			endTime: "",
			datetime: "",
			parameter: "",
			comment: "",
			activityId: "",
			personId: "",
			supervisorId: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = (e) => {
		if (e.target.id === "activityId") {
			let activity = Object.assign({}, this.state.activity);
			activity[e.target.id] = e.target.value;
			this.setState({ activity });
		} else if (e.target.id === "personId") {
			if (e.target.name === "supervisor") {
				let supervisor = Object.assign({}, this.state.supervisor);
				supervisor[e.target.id] = e.target.value;
				this.setState({ supervisor });
			} else {
				let person = Object.assign({}, this.state.person);
				person[e.target.id] = e.target.value;
				this.setState({ person });
			}
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	};

	onSubmit(e) {
		e.preventDefault();

		let newInspection = {
			status: this.state.status,
			startTime: this.state.startTime,
			datetime: this.state.datetime,
			endTime: this.state.endTime,
			parameter: this.state.parameter,
			comment: this.state.comment
		};
		if (this.state.activityId !== "") {
			newInspection = {
				...newInspection,
				activity: { activityId: this.state.activityId }
			};
		}
		if (this.state.personId !== "") {
			newInspection = {
				...newInspection,
				person: { personId: this.state.personId }
			};
		}
		if (this.state.supervisorId !== "") {
			newInspection = {
				...newInspection,
				supervisor: { personId: this.state.supervisorId }
			};
		}
		this.props.addInspection(newInspection, this.props.history);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}

	componentDidMount() {
		this.props.getActivities();
		this.props.getPersons();
	}

	render() {
		const { errors } = this.state;
		const { activities } = this.props.activity;
		const { persons } = this.props.person;

		return (
			<div className="container mt-2">
				<h1 className="h2 mb-4">Dodaj przegląd</h1>
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="col-md-4 offset-md-4 text-center">
							<div className="form-group">
								<label>Status</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.status
									})}
									name="status"
									type="text"
									onChange={this.onChange}
									value={this.state.status}
								/>
								{errors.status && (
									<div className="invalid-feedback">{errors.status}</div>
								)}
							</div>
							<div className="form-group">
								<label>Czas rozpoczęcia</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.startTime
									})}
									name="startTime"
									type="datetime-local"
									onChange={this.onChange}
									value={this.state.startTime}
								/>
								{errors.startTime && (
									<div className="invalid-feedback">{errors.startTime}</div>
								)}
							</div>

							<div className="form-group">
								<label>Czas wykonania</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.datetime
									})}
									name="datetime"
									type="datetime-local"
									onChange={this.onChange}
									value={this.state.datetime}
								/>
								{errors.datetime && (
									<div className="invalid-feedback">{errors.datetime}</div>
								)}
							</div>
							<div className="form-group">
								<label>Czas zakończenia</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.endTime
									})}
									name="endTime"
									type="datetime-local"
									onChange={this.onChange}
									value={this.state.endTime}
								/>
								{errors.endTime && (
									<div className="invalid-feedback">{errors.endTime}</div>
								)}
							</div>

							<div className="form-group">
								<label>Parametry</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.parameter
									})}
									name="parameter"
									type="text"
									onChange={this.onChange}
									value={this.state.parameter}
								/>
								{errors.parameter && (
									<div className="invalid-feedback">{errors.parameter}</div>
								)}
							</div>

							<div className="form-group">
								<label>Uwagi</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.comment
									})}
									name="comment"
									type="text"
									onChange={this.onChange}
									value={this.state.comment}
								/>
								{errors.comment && (
									<div className="invalid-feedback">{errors.comment}</div>
								)}
							</div>

							<div className="form-group">
								<label>Czynność</label>
								<select
									name="activityId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz czynność</option>
									{activities.map((activity) => (
										<option
											key={activity.activityId}
											value={activity.activityId}
										>
											{activity.name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label>Osoba</label>
								<select
									name="personId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz osobę</option>
									{persons.map((person) => (
										<option key={person.personId} value={person.personId}>
											{person.name}
										</option>
									))}
								</select>
							</div>
							<div className="form-group">
								<label>Przełożony</label>
								<select
									name="supervisorId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz przełożonego</option>
									{persons.map((person) => (
										<option key={person.personId} value={person.personId}>
											{person.name}
										</option>
									))}
								</select>
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

AddInspection.propTypes = {
	addInspection: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired,
	getActivities: PropTypes.func.isRequired,
	person: PropTypes.object.isRequired,
	getPersons: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	activity: state.activity,
	person: state.person
});

export default connect(mapStateToProps, {
	addInspection,
	getActivities,
	getPersons
})(AddInspection);