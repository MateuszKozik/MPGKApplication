import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	getConnection,
	updateConnection
} from "../../actions/connectionActions";

class UpdateConnection extends Component {
	constructor() {
		super();

		this.state = {
			id: "",
			name: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		const { connectionId } = this.props.match.params;
		this.props.getConnection(connectionId, this.props.history);
	}

	componentDidUpdate(props, state, snapshot) {
		if (this.props.connection !== props.connection) {
			const { connectionId, name } = this.props.connection;
			this.setState({
				id: connectionId,
				name: name
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const updatedConnection = {
			id: this.state.id,
			name: this.state.name
		};

		this.props.updateConnection(
			this.state.id,
			updatedConnection,
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
		const { errors } = this.props;
		return (
			<div className="container mt-4">
				<h1 className="h2">Edytuj powiązanie</h1>
				<form onSubmit={this.onSubmit} className="mt-4">
					<div className="row">
						<div className="col-md-4 offset-md-4 text-center">
							<div className="form-group">
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

UpdateConnection.propTypes = {
	getConnection: PropTypes.func.isRequired,
	connection: PropTypes.object.isRequired,
	updateConnection: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	connection: state.connection.connection,
	errors: state.errors
});

export default connect(mapStateToProps, { getConnection, updateConnection })(
	UpdateConnection
);
