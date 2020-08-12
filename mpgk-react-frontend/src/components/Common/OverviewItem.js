import React, { Component } from "react";
import { connect } from "react-redux";
import { performOverview } from "../../actions/overviewActions";

class OverviewItem extends Component {
	constructor() {
		super();
		this.state = {
			parameter: "",
			comment: "",
			status: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			parameter: this.props.parameter,
			comment: this.props.comment,
			status: this.props.status
		});
	}

	onChange(e) {
		if (e.target.type === "checkbox") {
			this.setState({ [e.target.name]: e.target.checked });
		} else if (e.target.type === "radio") {
			this.setState({ parameter: e.target.value });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	}

	onSubmit(e) {
		this.setState({
			status: "Wykonany"
		});
		e.preventDefault();

		const updatedOverview = {
			overviewId: this.props.overviewId,
			status: "Wykonany",
			startTime: this.props.startTime,
			endTime: this.props.endTime,
			parameter: this.state.parameter,
			activity: this.props.activity,
			comment: this.state.comment
		};

		this.props.performOverview(
			this.props.overviewId,
			updatedOverview,
			this.props.connectionId,
			this.props.history
		);
	}

	selectInput(type) {
		switch (type) {
			case "Pole tekstowe":
				return (
					<input
						type="text"
						value={this.state.parameter || ""}
						onChange={this.onChange}
						className="form-control"
						name="parameter"
						required
					/>
				);
			case "Zaznaczenie":
				if (this.props.parameter === "true") {
					return (
						<input
							type="checkbox"
							defaultChecked
							onChange={this.onChange}
							className="form-control"
							name="parameter"
							required
						/>
					);
				} else {
					return (
						<input
							type="checkbox"
							onChange={this.onChange}
							className="form-control"
							name="parameter"
							required
						/>
					);
				}

			case "Zakres liczb":
				return (
					<input
						type="number"
						value={this.state.parameter || ""}
						className="form-control"
						onChange={this.onChange}
						name="parameter"
						placeholder="Wartość liczbowa"
						required
					/>
				);
			case "Pole wyboru":
				if (this.props.parameter === "TAK") {
					return (
						<div className="form-check">
							<label>TAK</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								onChange={this.onChange}
								defaultChecked
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								onChange={this.onChange}
								value="NIE"
								required
							/>
						</div>
					);
				} else if (this.props.parameter === "NIE") {
					return (
						<div className="form-check">
							<label>TAK</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								onChange={this.onChange}
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								defaultChecked
								onChange={this.onChange}
								value="NIE"
								required
							/>
						</div>
					);
				} else {
					return (
						<div className="form-check">
							<label>TAK</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								onChange={this.onChange}
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								onChange={this.onChange}
								value="NIE"
								required
							/>
						</div>
					);
				}

			default:
				return (
					<input
						value={this.state.parametr || ""}
						type="text"
						className="form-control"
						onChange={this.onChange}
						name="parameter"
					/>
				);
		}
	}

	render() {
		return (
			<div className="container p-2 my-2 border-bottom">
				<form className="row my-1 " onSubmit={this.onSubmit}>
					<div className="col-md-5">{this.props.activity.name}</div>
					<div className="col-md-2">
						{this.selectInput(this.props.activity.type)}
					</div>
					<div className="col-md-2 my-1">
						<input
							type="text"
							className="form-control"
							value={this.state.comment || ""}
							name="comment"
							placeholder="Komentarz"
							onChange={this.onChange}
						/>
					</div>
					<div className="col-md-2 my-1 text-center">
						{this.state.status === "Nowy" ? (
							<button type="submit" className="btn btn-primary">
								Zapisz
							</button>
						) : null}
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { performOverview })(OverviewItem);
