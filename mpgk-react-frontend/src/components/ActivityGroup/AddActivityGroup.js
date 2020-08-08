import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import { addGroup } from "../../actions/activityGroupActions";
import { getConnections } from "../../actions/connectionActions";

class AddActivityGroup extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			connection: {
				connectionId: ""
			},
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		if (e.target.name === "connectionId") {
			let connection = Object.assign({}, this.state.connection);
			connection[e.target.name] = e.target.value;
			this.setState({ connection });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const newGroup = {
			name: this.state.name,
			connection: { connectionId: this.state.connection.connectionId }
		};
		this.props.addGroup(newGroup, this.props.history);
	}

	componentDidMount() {
		this.props.getConnections();
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
		const { connections } = this.props.connection;
		return (
			<div className="container mt-2">
				<h1 className="h2 mb-4">Dodaj grupę czynności</h1>
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
								<label>Powiązania</label>
								<select
									name="connectionId"
									onChange={this.onChange}
									className={classNames("form-control")}
								>
									<option value="">Wybierz powiązanie </option>
									{connections.map((connection) => (
										<option
											key={connection.connectionId}
											value={connection.connectionId}
										>
											{connection.name}
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

AddActivityGroup.propTypes = {
	addGroup: PropTypes.func.isRequired,
	getConnections: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	connection: state.connection,
	errors: state.errors
});

export default connect(mapStateToProps, { addGroup, getConnections })(
	AddActivityGroup
);
