import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addConnection } from "../../actions/connectionActions";
import classnames from "classnames";

class AddConnection extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const newConnection = {
			name: this.state.name
		};

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

		return (
			<div className="container mt-4">
				<h1 className="h2">Dodaj powiązanie</h1>
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

AddConnection.propTypes = {
	addConnection: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors
});

export default connect(mapStateToProps, { addConnection })(AddConnection);
