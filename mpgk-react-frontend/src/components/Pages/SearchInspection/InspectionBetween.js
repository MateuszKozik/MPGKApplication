import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getConnectionAndStartTimeBetween,
	deleteInspectionByConnectionAndStartTimeAndEndTime,
	clearInspectionsListState
} from "../../../actions/inspectionActions";
import {
	getConnections,
	clearConnectionState
} from "../../../actions/connectionActions";
import { getDevices, clearDeviceState } from "../../../actions/deviceActions";
import { getPersons, clearPersonState } from "../../../actions/personActions";
import PropTypes from "prop-types";
import FormatDate from "../../Common/FormatDate";
import { Link } from "react-router-dom";
import { styles } from "../../../consts/themeConsts";
import DeleteIcon from "@material-ui/icons/Delete";
import {
	withStyles,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Button,
	TextField,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Typography,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	TableBody,
	Tooltip,
	IconButton
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import { setSnackbar } from "../../../reducers/snackbarReducer";
import { Formik, Form } from "formik";

class InspectionBetween extends Component {
	state = {
		connectionId: "",
		deviceId: "",
		personId: "",
		startTime: "",
		endTime: "",
		typeName: "przeglad"
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearInspectionsListState();
		this.props.clearConnectionState();
		this.props.clearDeviceState();
		this.props.clearPersonState();
	}
	componentDidMount() {
		this.props.getConnections();
		this.props.getDevices();
		this.props.getPersons();
	}

	deleteConnections = (inspection) => {
		if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie przeglądu")) {
			const {
				connection: { connectionId },
				startTime,
				endTime
			} = inspection;
			this.props
				.deleteInspectionByConnectionAndStartTimeAndEndTime(
					connectionId,
					startTime,
					endTime
				)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Przegląd został usunięty");
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
		}
	};

	handleSubmit = () => {
		const {
			typeName,
			connectionId,
			deviceId,
			personId,
			startTime,
			endTime
		} = this.state;

		let id;
		switch (typeName) {
			case "przeglad":
				id = connectionId;
				break;
			case "urzadzenie":
				id = deviceId;
				break;
			case "pracownik":
				id = personId;
				break;
			default:
				break;
		}

		this.props
			.getConnectionAndStartTimeBetween(
				id,
				startTime,
				endTime,
				typeName,
				this.props.history
			)
			.then((res) => {
				if (res === 0) {
					this.props.setSnackbar(true, "Nie znaleziono przeglądów!");
				}
			});
	};

	render() {
		const { classes } = this.props;
		const { inspectionsList } = this.props.inspection;
		const { connections } = this.props.connection;
		const { devices } = this.props.device;
		const { persons } = this.props.person;
		const { validToken, user } = this.props.security;
		const { authorities } = user;

		return (
			<>
				<Formik
					initialValues={{
						inspection: ""
					}}
					onSubmit={this.handleSubmit}
				>
					{({ values }) => (
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<FormControl component="fieldset" required>
										<FormLabel component="legend">
											Metoda wyszukiwania
										</FormLabel>
										<RadioGroup row>
											<FormControlLabel
												value="przeglad"
												onChange={() => this.setState({ typeName: "przeglad" })}
												control={<Radio color="primary" />}
												label="Przegląd"
												checked={this.state.typeName === "przeglad"}
												labelPlacement="start"
											/>

											<FormControlLabel
												value="urzadzenie"
												onChange={() =>
													this.setState({ typeName: "urzadzenie" })
												}
												control={<Radio color="primary" />}
												label="Urządzenie"
												checked={this.state.typeName === "urzadzenie"}
												labelPlacement="start"
											/>

											<FormControlLabel
												onChange={() =>
													this.setState({ typeName: "pracownik" })
												}
												value="pracownik"
												checked={this.state.typeName === "pracownik"}
												control={<Radio color="primary" />}
												label="Pracownik"
												labelPlacement="start"
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<Grid container spacing={2}>
										<Grid item xs={false} md={4} />
										<Grid item xs={12} md={4}>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													{this.state.typeName === "przeglad" ? (
														<FormControl
															required
															variant="outlined"
															className={classes.formControl}
														>
															<InputLabel>Przegląd</InputLabel>
															<Select
																name="connectionId"
																value={this.state.connectionId}
																onChange={this.onChange}
																label="Przegląd"
															>
																<MenuItem value="">
																	<em>Wybierz przegląd</em>
																</MenuItem>
																{connections &&
																	connections.map((connection, index) => (
																		<MenuItem
																			key={index}
																			value={connection.connectionId}
																		>
																			{connection.name}
																		</MenuItem>
																	))}
															</Select>
														</FormControl>
													) : this.state.typeName === "urzadzenie" ? (
														<FormControl
															required
															variant="outlined"
															className={classes.formControl}
														>
															<InputLabel>Urządzenie</InputLabel>
															<Select
																name="deviceId"
																value={this.state.deviceId}
																onChange={this.onChange}
																label="Urządzenie"
															>
																<MenuItem value="">
																	<em>Wybierz urządzenie</em>
																</MenuItem>
																{devices &&
																	devices.map((device, index) => (
																		<MenuItem
																			key={index}
																			value={device.deviceId}
																		>
																			{device.name}
																		</MenuItem>
																	))}
															</Select>
														</FormControl>
													) : this.state.typeName === "pracownik" ? (
														<FormControl
															required
															variant="outlined"
															className={classes.formControl}
														>
															<InputLabel>Pracownik</InputLabel>
															<Select
																name="personId"
																value={this.state.personId}
																onChange={this.onChange}
																label="Pracownik"
															>
																<MenuItem value="">
																	<em>Wybierz pracownika</em>
																</MenuItem>
																{persons &&
																	persons.map((person, index) => (
																		<MenuItem
																			key={index}
																			value={person.personId}
																		>
																			{person.name + " " + person.surname}
																		</MenuItem>
																	))}
															</Select>
														</FormControl>
													) : null}
												</Grid>
												<Grid item xs={12}>
													<TextField
														className={classes.formControl}
														required
														id="startTime"
														label="Początkowa data"
														type="datetime-local"
														variant="outlined"
														name="startTime"
														value={this.state.startTime}
														onChange={this.onChange}
														InputLabelProps={{
															shrink: true
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														className={classes.formControl}
														required
														id="endTime"
														label="Końcowa data"
														type="datetime-local"
														variant="outlined"
														name="endTime"
														value={this.state.endTime}
														onChange={this.onChange}
														InputLabelProps={{
															shrink: true
														}}
													/>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={false} md={4} />
									</Grid>

									<Button
										className="mt-2 ml-2"
										type="submit"
										color="primary"
										variant="contained"
									>
										Szukaj
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
				<Grid container className={classes.form}>
					<Grid item xs={false} md={2} />
					<Grid item xs={12} md={8}>
						<TableContainer>
							<Table>
								<TableHead>
									{inspectionsList[0] ? (
										<TableRow>
											<TableCell>
												<Typography>
													<b>Nazwa przeglądu</b>
												</Typography>
											</TableCell>
											<TableCell>
												<Typography align="center">
													<b>Plan</b>
												</Typography>
											</TableCell>
											<TableCell>
												<Typography align="center">
													<b>Status</b>
												</Typography>
											</TableCell>
											{validToken && user && authorities === "ROLE_ADMIN" ? (
												<TableCell>
													<Typography align="center">
														<b>Akcja</b>
													</Typography>
												</TableCell>
											) : null}
										</TableRow>
									) : null}
								</TableHead>
								<TableBody>
									{inspectionsList &&
										inspectionsList.map((inspection, i) => (
											<TableRow key={i}>
												<TableCell>
													<Typography>
														{inspection.connection && (
															<Link
																style={{
																	color: "#000",
																	textDecoration: "none"
																}}
																to={`/inspections/list/${inspection.connection.connectionId}/${inspection.startTime}/to/${inspection.endTime}/show`}
															>
																{inspection.connection.name}
															</Link>
														)}
													</Typography>
												</TableCell>
												<TableCell align="center">
													<Typography component="div">
														<FormatDate date={inspection.startTime} /> do
														<FormatDate date={inspection.endTime} />
													</Typography>
												</TableCell>
												<TableCell align="center">
													<Typography>
														{inspection.inspectionStatus === "Wykonany" ? (
															<CheckCircleIcon
																fontSize="large"
																color="primary"
															/>
														) : inspection.inspectionStatus === "W trakcie" ? (
															<CancelIcon fontSize="large" color="primary" />
														) : (
															<ErrorIcon fontSize="large" color="secondary" />
														)}
													</Typography>
												</TableCell>
												{validToken && user && authorities === "ROLE_ADMIN" ? (
													<TableCell align="center">
														<Tooltip title="Usuń">
															<IconButton
																color="default"
																onClick={() =>
																	this.deleteConnections(inspection)
																}
															>
																<DeleteIcon fontSize="large" />
															</IconButton>
														</Tooltip>
													</TableCell>
												) : null}
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={2} />
				</Grid>
			</>
		);
	}
}

InspectionBetween.propTypes = {
	inspection: PropTypes.object.isRequired,
	connection: PropTypes.object.isRequired,
	device: PropTypes.object.isRequired,
	person: PropTypes.object.isRequired,
	getConnectionAndStartTimeBetween: PropTypes.func.isRequired,
	getConnections: PropTypes.func.isRequired,
	getDevices: PropTypes.func.isRequired,
	getPersons: PropTypes.func.isRequired,
	deleteInspectionByConnectionAndStartTimeAndEndTime: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired,
	clearConnectionState: PropTypes.func.isRequired,
	clearDeviceState: PropTypes.func.isRequired,
	clearPersonState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection,
	connection: state.connection,
	device: state.device,
	person: state.person,
	security: state.security
});

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => {
			dispatch(getConnections());
		},
		getDevices: () => {
			dispatch(getDevices());
		},
		getPersons: () => {
			dispatch(getPersons());
		},
		deleteInspectionByConnectionAndStartTimeAndEndTime(
			connectionId,
			startTime,
			endTime
		) {
			return dispatch(
				deleteInspectionByConnectionAndStartTimeAndEndTime(
					connectionId,
					startTime,
					endTime
				)
			).then((res) => {
				if (res && res.status === 200) return res;
			});
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		clearConnectionState: () => {
			dispatch(clearConnectionState());
		},
		clearDeviceState: () => {
			dispatch(clearDeviceState());
		},
		clearPersonState: () => {
			dispatch(clearPersonState());
		},
		getConnectionAndStartTimeBetween(
			connectionId,
			startTime,
			endTime,
			typeName,
			history
		) {
			return dispatch(
				getConnectionAndStartTimeBetween(
					connectionId,
					startTime,
					endTime,
					typeName,
					history
				)
			).then((res) => {
				if (res && res.status === 200) return res.data.length;
			});
		}
	};
};

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(styles)(InspectionBetween));
