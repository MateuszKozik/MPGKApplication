import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { addActivity } from "../../actions/activityActions";
import { getGroups } from "../../actions/activityGroupActions";

class AddActivity extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			type: "",
			emsr: "",
			setting: "",
			listItems: "",
			groupId: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit(e) {
		e.preventDefault();
		let newActivity = {
			name: this.state.name,
			type: this.state.type,
			emsr: this.state.emsr,
			setting: this.state.setting,
			listItems: this.state.listItems
		};

		if (this.state.groupId !== "") {
			newActivity = {
				...newActivity,
				activityGroup: { groupId: this.state.groupId }
			};
		}
		this.props.addActivity(newActivity, this.props.history);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}
	componentDidMount() {
		this.props.getGroups();
	}

	render() {
		const { errors } = this.state;
		const { groups } = this.props.group;

		return (
			<div className="container mt-2">
				<h1 className="h2">Dodaj czynność</h1>
				<form onSubmit={this.onSubmit}>
					<div className="row">
						<div className="col-md-4 offset-md-4 text-center">
							<div className="form-group">
								<label>Nazwa</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.name
									})}
									name="name"
									type="text"
									onChange={this.onChange}
									value={this.state.name}
								/>
								{errors.name && (
									<div className="invalid-feedback">{errors.name}</div>
								)}
							</div>
							<div className="form-group">
								<label>Typ pola</label>
								<select
									name="type"
									onChange={this.onChange}
									className={classNames("form-control", {
										"is-invalid": errors.type
									})}
								>
									<option value="">Wybierz typ</option>
									<option value="Pole tekstowe">Pole tekstowe</option>
									<option value="Zaznaczenie">Zaznaczenie</option>
									<option value="Zakres liczb">Zakres liczb</option>
									<option value="Pole wyboru">Pole wyboru</option>
									<option value="Lista">Lista</option>
								</select>

								{errors.type && (
									<div className="invalid-feedback">{errors.type}</div>
								)}
							</div>
							<div className="form-group">
								<label>Elementy listy</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.listItems
									})}
									name="listItems"
									type="text"
									placeholder="Wprowadź elementy listy oddzielone spacją"
									onChange={this.onChange}
									value={this.state.listItems}
								/>
								{errors.listItems && (
									<div className="invalid-feedback">{errors.listItems}</div>
								)}
							</div>
							<div className="form-group">
								<label>EMSR</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.emsr
									})}
									name="emsr"
									type="text"
									onChange={this.onChange}
									value={this.state.emsr}
								/>
								{errors.emsr && (
									<div className="invalid-feedback">{errors.emsr}</div>
								)}
							</div>
							<div className="form-group">
								<label>Nastawa</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.setting
									})}
									name="setting"
									type="text"
									onChange={this.onChange}
									value={this.state.setting}
								/>
								{errors.setting && (
									<div className="invalid-feedback">{errors.setting}</div>
								)}
							</div>
							<div className="form-group">
								<label>Grupy czynności</label>
								<select
									name="groupId"
									onChange={this.onChange}
									className="form-control"
								>
									<option value="">Wybierz grupę czynności</option>
									{groups.map((group) => (
										<option key={group.groupId} value={group.groupId}>
											{group.name + " - " + group.connection.device.name}
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

AddActivity.propTypes = {
	addActivity: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	group: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired,
	getGroups: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	group: state.group,
	activity: state.activity
});

export default connect(mapStateToProps, { addActivity, getGroups })(
	AddActivity
);
