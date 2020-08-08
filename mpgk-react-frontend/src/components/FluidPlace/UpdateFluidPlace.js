import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import {
	getFluidPlace,
	updateFluidPlace
} from "../../actions/fluidPlaceActions";

class UpdateFluidPlace extends Component {
	constructor() {
		super();

		this.state = {
			placeId: "",
			name: "",
			errors: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentDidMount() {
		const { placeId } = this.props.match.params;
		this.props.getFluidPlace(placeId, this.props.history);
	}

	componentDidUpdate(props, state, snapshot) {
		if (this.props.fluidPlace !== props.fluidPlace) {
			const { placeId, name } = this.props.fluidPlace;

			this.setState({
				placeId: placeId,
				name: name
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const updatedFluidPlace = {
			placeId: this.state.placeId,
			name: this.state.name
		};

		this.props.updateFluidPlace(
			this.state.placeId,
			updatedFluidPlace,
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
			<div className="container mt-2">
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

const mapStateToProps = (state) => ({
	fluidPlace: state.fluidPlace.fluidPlace,
	errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
	getFluidPlace: (placeId) => {
		dispatch(getFluidPlace(placeId));
	},
	updateFluidPlace: (placeId, updatedFluidPlace, history) => {
		dispatch(updateFluidPlace(placeId, updatedFluidPlace, history));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFluidPlace);
