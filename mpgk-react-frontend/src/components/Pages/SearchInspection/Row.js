import React, { Component } from "react";
import {
	TextField,
	Checkbox,
	FormControl,
	RadioGroup,
	Radio,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	Typography,
	Divider
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "../../../consts/themeConsts";
import FormatDate from "../../Common/FormatDate";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";

class Row extends Component {
	constructor() {
		super();
		this.state = {
			cancelSubmit: false,
			parameter: "",
			comment: "",
			status: "",
			listItems: ""
		};
	}

	componentDidMount() {
		this.setState({
			parameter: this.props.parameter,
			comment: this.props.comment,
			status: this.props.status,
			listItems: this.props.activity.listItems
		});
	}

	selectInput(type) {
		switch (type) {
			case "Pole tekstowe":
				return (
					<TextField
						type="text"
						label="Tekst"
						variant="outlined"
						name="parameter"
						value={this.state.parameter || ""}
						disabled={this.state.status === "Wykonany" && true}
						required
					/>
				);

			case "Zaznaczenie":
				return (
					<Checkbox
						icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
						checkedIcon={<CheckBoxIcon fontSize="large" />}
						checked={Boolean(this.state.parameter) || false}
						name="parameter"
						color="primary"
						disabled
						required
					/>
				);

			case "Zakres liczb":
				return (
					<TextField
						type="number"
						label="Liczba"
						variant="outlined"
						disabled
						value={this.state.parameter || ""}
						name="parameter"
						required
					/>
				);
			case "Pole wyboru":
				return (
					<FormControl required>
						<RadioGroup name="parameter" value={this.state.parameter} row>
							<FormControlLabel
								value="TAK"
								control={<Radio required color="primary" disabled />}
								label="TAK"
							/>
							<FormControlLabel
								value="NIE"
								required
								control={<Radio required color="primary" disabled />}
								label="NIE"
							/>
						</RadioGroup>
					</FormControl>
				);

			case "Lista":
				const listOfItems = this.state.listItems.split(",");
				return (
					<FormControl required variant="outlined" style={{ minWidth: 120 }}>
						<InputLabel id="parameter-label">Wybierz</InputLabel>
						<Select
							labelId="parameter-label"
							name="parameter"
							value={this.state.parameter || ""}
							label="Parametr"
							disabled
						>
							<MenuItem value="">
								<em>Wybierz</em>
							</MenuItem>
							{listOfItems &&
								listOfItems.map((item, i) => (
									<MenuItem key={i} value={item}>
										{item}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				);

			default:
				return (
					<TextField
						type="text"
						label="Parametr"
						variant="outlined"
						name="parameter"
						disabled
						value={this.state.parameter || ""}
						required
					/>
				);
		}
	}

	render() {
		const { classes } = this.props;
		const { name, type, emsr, setting } = this.props.activity;
		const { datetime, person, showEmsr, showSetting, status } = this.props;

		return (
			<div className={classes.form}>
				<Grid container spacing={2}>
					{showEmsr && showSetting ? (
						<Grid item xs={12} md={3}>
							<Typography align="justify">{name}</Typography>
						</Grid>
					) : (
						<Grid item xs={12} md={4}>
							<Typography align="justify">{name}</Typography>
						</Grid>
					)}

					<Grid item xs={12} md={2}>
						{this.selectInput(type)}
					</Grid>

					<Grid item xs={12} md={2}>
						<TextField
							type="text"
							name="comment"
							label="Uwagi"
							variant="outlined"
							value={this.state.comment || ""}
							disabled
						/>
					</Grid>
					{showEmsr && (
						<Grid item xs={12} md={1}>
							{emsr}
						</Grid>
					)}

					{showSetting && (
						<Grid item xs={12} md={1}>
							{setting}
						</Grid>
					)}
					<Grid item xs={12} md={2}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FormatDate date={datetime} datetime={true} />
							</Grid>
							<Grid item xs={12}>
								{person && <p> {person.name + " " + person.surname} </p>}
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={1}>
						{status === "Wykonany" ? (
							<CheckCircleIcon fontSize="large" color="primary" />
						) : status === "Nowy" ? (
							<CancelIcon fontSize="large" color="primary" />
						) : (
							<ErrorIcon fontSize="large" color="secondary" />
						)}
					</Grid>

					<Grid item xs={12} style={{ marginTop: 10 }}>
						<Divider />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Row);
