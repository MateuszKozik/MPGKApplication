import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOverview, updateOverview } from "../../actions/overviewActions";

class UpdateOverview extends Component {
	constructor() {
		super();

		this.state = {
			overviewId: "",
			status: "",
			startTime: "",
			endTime: "",
			datetime: "",
			parameter: "",
			comment: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		const { overviewId } = this.props.match.params;
		this.props.getOverview(overviewId, this.props.history);
	}

	componentDidUpdate(props) {
		if (this.props.overview !== props.overview) {
			const {
				overviewId,
				status,
				startTime,
				datetime,
				endTime,
				parameter,
				comment
			} = this.props.overview;
			this.setState({
				overviewId: overviewId,
				status: status,
				startTime: startTime,
				datetime: datetime,
				endTime: endTime,
				parameter: parameter,
				comment: comment
			});
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const updatedOverview = {
			overviewId: this.state.overviewId,
			status: this.state.status,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			parameter: this.state.parameter,
			comment: this.state.comment
		};

		this.props.updateOverview(
			this.state.overviewId,
			updatedOverview,
			this.props.history
		);
	}

	render() {
		const { errors } = this.props;
		return (
			<div className="container mt-2">
				<h1 className="h2 mb-4">Edytuj przegląd</h1>
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

UpdateOverview.propTypes = {
	getOverview: PropTypes.func.isRequired,
	overview: PropTypes.object.isRequired,
	updateOverview: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	overview: state.overview.overview,
	errors: state.errors
});

export default connect(mapStateToProps, { getOverview, updateOverview })(
	UpdateOverview
);
