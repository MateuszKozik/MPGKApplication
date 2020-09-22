import React, { Component } from "react";
import FormatDate from "./FormatDate";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	updateInspection,
	updateOverdueInspection
} from "../../actions/inspectionActions";
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
	Button,
	Typography,
	Divider,
	LinearProgress
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./../../consts/themeConsts";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField } from "formik-material-fields";
import { setSnackbar } from "../../reducers/snackbarReducer";

const checkedValue = [
	"Spuścić osady / szlam ze zbiornika (odstojnika).",
	"Sprawdzić działanie wentylatora powietrza świeżego do kondensacji (pod kątem hałasów i drgań), sprawdzić stan osłon i obudów.",
	"Sprawdzić/potwierdzić działanie pompy tłoczącej wodę z wanny do osadnika."
];

const validationSchema = Yup.object().shape({
	comment: Yup.string().max(100, "Wprowadź krótszy tekst")
});

class InspectionItem extends Component {
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

		if (
			this.props.activity.name === "Układ kondensacji spalin załączony?" &&
			this.props.parameter !== null
		) {
			this.props.handleCommonChange(this.props.parameter);
		}
	}

	handleChange = (e) => {
		if (e.target.type === "checkbox") {
			this.setState({ [e.target.name]: e.target.checked });
		} else if (e.target.type === "radio") {
			this.setState({ parameter: e.target.value });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}

		if (this.props.activity.name === "Układ kondensacji spalin załączony?") {
			this.props.handleCommonChange(e.target.value);
		}
	};

	handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			if (this.state.cancelSubmit === false) {
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

				if (this.props.status === "Nowy") {
					this.props.updateInspection(
						this.props.inspectionId,
						updatedInspection
					);

					this.setState({
						status: "Wykonany"
					});
				}
				if (this.props.status === "Zaległy") {
					this.props
						.updateOverdueInspection(this.props.inspectionId, updatedInspection)
						.then((res) => {
							if (res && res.status === 403) {
								this.props.setSnackbar(true, "Brak uprawnień!");
							} else {
								this.setState({
									status: "Wykonany"
								});
							}
						});
				}
			}
			this.setState({ cancelSubmit: false });
		}, 3000);
	};

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
						onChange={this.handleChange}
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
						onChange={this.handleChange}
						name="parameter"
						color="primary"
						disabled={this.state.status === "Wykonany" && true}
						required
					/>
				);

			case "Zakres liczb":
				return (
					<TextField
						type="number"
						label="Liczba"
						variant="outlined"
						disabled={this.state.status === "Wykonany" && true}
						value={this.state.parameter || ""}
						onChange={this.handleChange}
						name="parameter"
						required
					/>
				);
			case "Pole wyboru":
				return (
					<FormControl required>
						<RadioGroup
							name="parameter"
							value={this.state.parameter}
							onChange={this.handleChange}
							row
						>
							<FormControlLabel
								value="TAK"
								control={
									<Radio
										required
										color="primary"
										disabled={this.state.status === "Wykonany" && true}
									/>
								}
								label="TAK"
							/>
							<FormControlLabel
								value="NIE"
								required
								control={
									<Radio
										required
										color="primary"
										disabled={this.state.status === "Wykonany" && true}
									/>
								}
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
							onChange={this.handleChange}
							label="Parametr"
							disabled={this.state.status === "Wykonany" && true}
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
						disabled={this.state.status === "Wykonany" && true}
						value={this.state.parameter || ""}
						onChange={this.handleChange}
						required
					/>
				);
		}
	}

	render() {
		const { classes } = this.props;
		const { name, type, emsr, setting } = this.props.activity;
		const { datetime, person, showEmsr, showSetting } = this.props;
		if (
			(name === checkedValue[0] ||
				name === checkedValue[1] ||
				name === checkedValue[2]) &&
			this.props.value === "NIE"
		) {
			return <></>;
		} else {
			return (
				<div className={classes.form}>
					{this.state.status === "Nowy" || this.state.status === "Zaległy" ? (
						<Formik
							initialValues={{
								comment: this.state.comment || ""
							}}
							validationSchema={validationSchema}
							onSubmit={(values, { setSubmitting }) =>
								this.handleSubmit(values, { setSubmitting })
							}
						>
							{({ isSubmitting, values }) => (
								<Form>
									<Grid container spacing={2}>
										<Grid item xs={12} md={4}>
											<Typography align="justify">{name}</Typography>
										</Grid>
										<Grid item xs={12} md={2}>
											{this.selectInput(type)}
										</Grid>

										<Grid item xs={12} md={2}>
											<FormikTextField
												type="text"
												name="comment"
												label="Uwagi"
												variant="outlined"
												onChange={this.handleChange}
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
											{isSubmitting && (
												<Button
													colon="secondary"
													onClick={() => this.setState({ cancelSubmit: true })}
													disabled={this.state.cancelSubmit}
												>
													Anuluj
												</Button>
											)}
											{!isSubmitting && (
												<Button type="submit" color="primary">
													Zapisz
												</Button>
											)}
										</Grid>

										<Grid item xs={12} style={{ marginTop: 10 }}>
											{isSubmitting && <LinearProgress />}
											<Divider />
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					) : (
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<Typography align="justify">{name}</Typography>
							</Grid>
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
							<Grid item xs={12} style={{ marginTop: 10 }}>
								<Divider />
							</Grid>
						</Grid>
					)}
				</div>
			);
		}
	}
}

InspectionItem.propTypes = {
	updateInspection: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired,
	updateOverdueInspection: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateInspection: (inspectionId, updatedInspection) => {
			dispatch(updateInspection(inspectionId, updatedInspection));
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updateOverdueInspection(inspectionId, updatedInspection) {
			return dispatch(
				updateOverdueInspection(inspectionId, updatedInspection)
			).then((res) => {
				if (res) return res;
			});
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(InspectionItem));
