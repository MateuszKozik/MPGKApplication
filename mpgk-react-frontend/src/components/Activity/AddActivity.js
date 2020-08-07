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
			activityGroup: {
				groupId: null
			},
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange = (e) => {
		if (e.target.id === "groupId") {
			let activityGroup = Object.assign({}, this.state.activityGroup);
			activityGroup[e.target.id] = e.target.value;
			this.setState({ activityGroup });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	};

	onSubmit(e) {
		e.preventDefault();

		const newActivity = {
			name: this.state.name,
			type: this.state.type,
			emsr: this.state.emsr,
			setting: this.state.setting,
			activityGroup: {
				groupId: this.state.activityGroup.groupId
			}
		};
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
								<label>Rodzaj</label>
								<input
									className={classNames("form-control", {
										"is-invalid": errors.type
									})}
									name="type"
									type="text"
									onChange={this.onChange}
									value={this.state.type}
								/>
								{errors.type && (
									<div className="invalid-feedback">{errors.type}</div>
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
									id="groupId"
									onChange={this.onChange}
									className={classNames("form-control")}
								>
									<option>Wybierz grupę czynności</option>
									{groups.map((group) => (
										<option key={group.groupId} value={group.groupId}>
											{group.name}
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
