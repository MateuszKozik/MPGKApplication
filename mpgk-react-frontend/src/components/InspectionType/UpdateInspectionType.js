import React, { Component } from "react";
import {
	updateInspectionType,
	getInspectionType
} from "../../actions/inspectionTypeActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateInspectionType extends Component {
	constructor() {
		super();

		this.state = {
			typeId: "",
			name: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSumbit = this.onSumbit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		const { typeId } = this.props.match.params;
		this.props.getInspectionType(typeId, this.props.history);
	}

	componentDidUpdate(props) {
		if (this.props.inspectionType !== props.inspectionType) {
			const { typeId, name } = this.props.inspectionType;
			this.setState({
				typeId: typeId,
				name: name
			});
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		}
		return null;
	}

	onSumbit(e) {
		e.preventDefault();

		const updatedInspectionType = {
			typeId: this.state.typeId,
			name: this.state.name
		};

		this.props.updateInspectionType(
			this.state.typeId,
			updatedInspectionType,
			this.props.history
		);
	}

	render() {
		const { errors } = this.props;
		return (
			<div className="container mt-2">
				<form onSubmit={this.onSumbit}>
					<div className="row">
						<div className="col-md-4 offset-md-4 text-center">
							<div className="form-group">
								<label>Nazwa</label>
								<input
									className={classnames("form-control", {
										"is-invalid": errors.name
									})}
									type="text"
									name="name"
									value={this.state.name}
									onChange={this.onChange}
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

UpdateInspectionType.propTypes = {
	getInspectionType: PropTypes.func.isRequired,
	inspectionType: PropTypes.object.isRequired,
	updateInspectionType: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	inspectionType: state.inspectionType.inspectionType,
	errors: state.errors
});

export default connect(mapStateToProps, {
	getInspectionType,
	updateInspectionType
})(UpdateInspectionType);
