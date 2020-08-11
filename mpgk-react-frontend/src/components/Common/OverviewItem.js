import React, { Component } from "react";

class OverviewItem extends Component {
	selectInput(type) {
		switch (type) {
			case "Pole tekstowe":
				return <input type="text" className="form-control" name="parametr" />;
			case "Zaznaczenie":
				return (
					<input type="checkbox" className="form-control" name="parametr" />
				);
			case "Zakres liczb":
				return (
					<input
						type="number"
						className="form-control"
						name="parametr"
						placeholder="Wartość liczbowa"
					/>
				);
			case "Pole wyboru":
				return (
					<div className="form-check">
						<label>TAK</label>
						<input type="radio" name="parametr" value="TAK" />
						<label>NIE</label>
						<input type="radio" name="parametr" value="NIE" />
					</div>
				);
			default:
				return <input type="text" className="form-control" name="comment" />;
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
							name="comment"
							placeholder="Komentarz"
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
