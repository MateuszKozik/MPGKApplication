import React, { Component } from "react";
import classNames from "classnames";
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
								name={this.props.overviewId + "parameter"}
								onChange={this.onChange}
								defaultChecked
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parameter"}
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
								name={this.props.overviewId + "parameter"}
								onChange={this.onChange}
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parameter"}
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
								name={this.props.overviewId + "parameter"}
								onChange={this.onChange}
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parameter"}
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
						value={this.state.parameter || ""}
						type="text"
						className="form-control"
						onChange={this.onChange}
						name="parameter"
						required
					/>
				);
		}
	}

	displayValue(type) {
		switch (type) {
			case "Pole tekstowe":
				return (
					<input
						type="text"
						value={this.state.parameter || ""}
						readOnly
						className="form-control"
						name="parameter"
					/>
				);
			case "Zaznaczenie":
				return (
					<input
						type="checkbox"
						defaultChecked
						disabled
						className="form-control"
						name="parameter"
					/>
				);
			case "Zakres liczb":
				return (
					<input
						type="number"
						value={this.state.parameter || ""}
						className="form-control"
						disabled
						name="parameter"
					/>
				);

			case "Pole wyboru":
				if (this.state.parameter === "TAK") {
					return (
						<div className="form-check">
							<label>TAK</label>
							<input
								type="radio"
								name={this.props.overviewId + "parameter"}
								disabled
								defaultChecked
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parameter"}
								disabled
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
								name={this.props.overviewId + "parameter"}
								disabled
								value="TAK"
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parameter"}
								disabled
								defaultChecked
								value="NIE"
							/>
						</div>
					);
				}
			default:
				return (
					<input
						value={this.state.parameter || ""}
						type="text"
						className="form-control"
						readOnly
						name="parameter"
					/>
				);
		}
	}

	render() {
		const { name, type } = this.props.activity;
		return (
			<div
				className={classNames("container p-2 my-2 border-bottom", {
					overviewComplete: this.state.status === "Wykonany"
				})}
			>
				{this.state.status === "Nowy" || this.state.status === "Zaległy" ? (
					<form className="row my-1 " onSubmit={this.onSubmit}>
						<div className="col-md-5">{name}</div>

						<div className="col-md-2">{this.selectInput(type)}</div>
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
							<button type="submit" className="btn btn-primary">
								Zapisz
							</button>
						</div>
					</form>
				) : (
					<div className="row my-1">
						<div className="col-md-5">{name}</div>
						<div className="col-md-2">{this.displayValue(type)}</div>
						<div className="col-md-2 my-1">
							<input
								type="text"
								className="form-control"
								value={this.state.comment || ""}
								name="comment"
								placeholder="Komentarz"
								readOnly
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { performOverview })(OverviewItem);
