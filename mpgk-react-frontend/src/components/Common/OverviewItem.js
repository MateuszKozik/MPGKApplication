import React, { Component } from "react";

class OverviewItem extends Component {
	constructor() {
		super();
		this.state = {
			parameter: "",
			comment: ""
		};

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			parameter: this.props.parameter,
			comment: this.props.comment
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
						/>
					);
				} else {
					return (
						<input
							type="checkbox"
							onChange={this.onChange}
							className="form-control"
							name="parameter"
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
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								onChange={this.onChange}
								value="NIE"
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
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								defaultChecked
								onChange={this.onChange}
								value="NIE"
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
							/>
							<label>NIE</label>
							<input
								type="radio"
								name={this.props.overviewId + "parametr"}
								onChange={this.onChange}
								value="NIE"
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
				<div className="row my-1 ">
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
						<button className="btn btn-primary">Zapisz</button>
					</div>
				</div>
			</div>
		);
	}
}

export default OverviewItem;
