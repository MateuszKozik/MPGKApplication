import React, { Component } from "react";
import classNames from "classnames";
import FormatDate from "./FormatDate";
import { connect } from "react-redux";
import { performInspection } from "../../actions/inspectionActions";

class InspectionItem extends Component {
	constructor() {
		super();
		this.state = {
			parameter: "",
			comment: "",
			status: "",
			listItems: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({
			parameter: this.props.parameter,
			comment: this.props.comment,
			status: this.props.status,
			listItems: this.props.activity.listItems
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

		const updatedInspection = {
			inspectionId: this.props.inspectionId,
			status: "Wykonany",
			startTime: this.props.startTime,
			endTime: this.props.endTime,
			parameter: this.state.parameter,
			activity: this.props.activity,
			comment: this.state.comment,
			listItems: this.state.listItems
		};

		this.props.performInspection(
			this.props.inspectionId,
			updatedInspection,
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
								name={this.props.inspectionId + "parameter"}
								onChange={this.onChange}
								defaultChecked
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.inspectionId + "parameter"}
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
								name={this.props.inspectionId + "parameter"}
								onChange={this.onChange}
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.inspectionId + "parameter"}
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
								name={this.props.inspectionId + "parameter"}
								onChange={this.onChange}
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.inspectionId + "parameter"}
								onChange={this.onChange}
								value="NIE"
								required
							/>
						</div>
					);
				}
			case "Lista":
				const listOfItems = this.state.listItems.split(",");
				return (
					<select
						name="parameter"
						onChange={this.onChange}
						className="form-control"
					>
						<option value="">Wybierz sekcję</option>
						{listOfItems.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
				);

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
								name={this.props.inspectionId + "parameter"}
								disabled
								defaultChecked
								value="TAK"
								required
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.inspectionId + "parameter"}
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
								name={this.props.inspectionId + "parameter"}
								disabled
								value="TAK"
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.inspectionId + "parameter"}
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
		const { name, type, emsr, setting } = this.props.activity;
		const { datetime, person, supervisor, showEmsr, showSetting } = this.props;
		return (
			<div
				className={classNames("container p-2 my-2 border-bottom", {
					inspectionComplete: this.state.status === "Wykonany",
					inspectionOverdue: this.state.status === "Zaległy"
				})}
			>
				{this.state.status === "Nowy" || this.state.status === "Zaległy" ? (
					<form className="row my-1" onSubmit={this.onSubmit}>
						<div className="col-md-4 my-1 text-justify">{name}</div>

						<div className="col-md-2 my-1 text-center">
							{this.selectInput(type)}
						</div>

						<div className="col-md-2 my-1 text-center">
							<input
								type="text"
								className="form-control"
								value={this.state.comment || ""}
								name="comment"
								placeholder="Uwagi"
								onChange={this.onChange}
							/>
						</div>
						{showEmsr && (
							<div className="col-md-1 my-1 text-center">{emsr}</div>
						)}
						{showSetting && (
							<div className="col-md-1 my-1 text-center">{setting}</div>
						)}
						<div className="col-md-2 my-1 text-center">
							<button type="submit" className="btn btn-primary">
								Zapisz
							</button>
						</div>
					</form>
				) : (
					<div className="row my-1">
						<div className="col-md-4 my-1 text-justify">{name}</div>
						<div className="col-md-2  my-1 text-center">
							{this.displayValue(type)}
						</div>
						<div className="col-md-2 my-1 text-center">
							{this.state.comment && (
								<input
									type="text"
									className="form-control"
									value={this.state.comment || ""}
									name="comment"
									readOnly
								/>
							)}
						</div>
						{showEmsr && (
							<div className="col-md-1 my-1 text-center">{emsr}</div>
						)}
						{showSetting && (
							<div className="col-md-1 my-1 text-center">{setting}</div>
						)}
						<div className="col-md-2 my-1 text-center">
							<div className="row my-1">
								<div className="col-md-12 my-1 text-center">
									<FormatDate date={datetime} datetime={true} />
								</div>
								<div className="col-md-12 my-1 text-center">
									{person && <p> {person.name + " " + person.surname} </p>}
									{supervisor && (
										<b> {supervisor.name + " " + supervisor.surname} </b>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default connect(null, { performInspection })(InspectionItem);
