import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getConnections,
	updateConnection,
	clearConnectionState
} from "../../../actions/connectionActions";
import {
	createDailyInspections,
	createWeeklyInspections,
	createDayShiftInspections,
	createTwoMonthsInspections,
	createYearlyInspections
} from "../../../actions/taskActions";
import PropTypes from "prop-types";
import {
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	withStyles
} from "@material-ui/core";
import { styles } from "../../../consts/themeConsts";
import {
	Grid,
	Typography,
	IconButton,
	Fab,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Dialog,
	LinearProgress,
	TextField,
	InputAdornment,
	Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SearchIcon from "@material-ui/icons/Search";
import { getPersons, clearPersonState } from "../../../actions/personActions";
import { FormikTextField, FormikSwitchField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../../reducers/snackbarReducer";
import AddIcon from "@material-ui/icons/Add";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Nazwa przeglądu jest wymagana")
		.max(70, "Wprowadź któtszą nazwę")
});

export class ConnectionList extends Component {
	state = {
		dialogOpen: false,
		employeesDialogOpen: false,
		connectionId: "",
		name: "",
		status: "",
		persons: [],
		search: ""
	};

	componentDidMount() {
		this.props.getPersons();
		this.props.getConnections();
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearPersonState();
		this.props.clearConnectionState();
	}

	handleEditOpen = (connection) => {
		const { connectionId, name, status, persons } = connection;

		this.setState({
			dialogOpen: true,
			connectionId: connectionId,
			name: name,
			status: status,
			persons: persons
		});
	};

	handleEditEmployeesOpen = (connection) => {
		const { connectionId, name, status, persons } = connection;

		this.setState({
			employeesDialogOpen: true,
			connectionId: connectionId,
			name: name,
			status: status,
			persons: persons
		});
	};

	// Handle click event of the remove person button
	handleRemovePerson = (index) => {
		const persons = this.state.persons;
		persons.splice(index, 1);
		this.setState({
			persons: persons
		});
	};

	createInspections = (connection) => {
		const { connectionId, inspectionType } = connection;
		if (window.confirm("Czy na pewno chcesz wygenerować przegląd?")) {
			switch (inspectionType.name) {
				case "Codziennie":
					this.props
						.createDailyInspections(connectionId, this.props.history)
						.then((res) => {
							if (res) {
								this.props.setSnackbar(true, "Przegląd wygenerowany!");
							} else {
								this.props.setSnackbar(true, "Wystąpił błąd!");
							}
						});
					break;
				case "Raz w tygodniu":
					this.props
						.createWeeklyInspections(connectionId, this.props.history)
						.then((res) => {
							if (res) {
								this.props.setSnackbar(true, "Przegląd wygenerowany!");
							} else {
								this.props.setSnackbar(true, "Wystąpił błąd!");
							}
						});
					break;
				case "Codziennie na dziennej zmianie":
					this.props
						.createDayShiftInspections(connectionId, this.props.history)
						.then((res) => {
							if (res) {
								this.props.setSnackbar(true, "Przegląd wygenerowany!");
							} else {
								this.props.setSnackbar(true, "Wystąpił błąd!");
							}
						});
					break;
				case "Raz na dwa miesiące":
					this.props
						.createTwoMonthsInspections(connectionId, this.props.history)
						.then((res) => {
							if (res) {
								this.props.setSnackbar(true, "Przegląd wygenerowany!");
							} else {
								this.props.setSnackbar(true, "Wystąpił błąd!");
							}
						});
					break;
				case "Raz w roku":
					this.props
						.createYearlyInspections(connectionId, this.props.history)
						.then((res) => {
							if (res) {
								this.props.setSnackbar(true, "Przegląd wygenerowany!");
							} else {
								this.props.setSnackbar(true, "Wystąpił błąd!");
							}
						});
					break;
				default:
					break;
			}
		}
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			employeesDialogOpen: false,
			connectionId: "",
			name: "",
			status: "",
			persons: []
		});
	};

	handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);

			const { connectionId, name, status, persons } = this.state;

			const updatedConnection = {
				connectionId: connectionId,
				name: name,
				status: status,
				persons: persons
			};

			this.props
				.updateConnection(this.state.connectionId, updatedConnection)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dane przeglądu zaktualizowane!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
		}, 500);
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}

	render() {
		const personList = this.props.person.persons;
		const { persons } = this.state;

		const { classes } = this.props;
		const { connections } = this.props.connection;
		const { errors } = this.props;
		const filtered = connections.filter((connection) => {
			return connection.name
				.toLowerCase()
				.includes(this.state.search.toLowerCase());
		});
		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							Przeglądy
						</Typography>
					</Grid>
					<Grid item xs={false} md={2} />
					<Grid item xs={12} md={8} className={classes.search}>
						<TextField
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								)
							}}
							type="search"
							placeholder="Szukaj..."
							onChange={(e) => this.updateSearch(e)}
						/>
					</Grid>
					<Grid item xs={false} md={2} />
					<Grid item xs={false} md={2} />
					<Grid item xs={12} md={8}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className={classes.head}>
											<Typography>Nazwa przeglądu</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Status</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered &&
										filtered.map((connection) => {
											const { inspectionType } = connection;
											return (
												<TableRow key={connection.connectionId}>
													<TableCell>
														<Typography>
															<Link
																style={{
																	color: "#000",
																	textDecoration: "none"
																}}
																to={`/inspections/list/${connection.connectionId}/activity`}
															>
																{connection.name}
															</Link>
														</Typography>
													</TableCell>
													<TableCell>
														<Typography>
															{connection.status === true
																? "Aktywny"
																: "Nieaktywny"}
														</Typography>
													</TableCell>
													<TableCell>
														<Tooltip title="Edytuj">
															<IconButton
																color="primary"
																onClick={() => this.handleEditOpen(connection)}
															>
																<EditIcon />
															</IconButton>
														</Tooltip>
														<Tooltip title="Dodaj pracowników">
															<IconButton
																onClick={() =>
																	this.handleEditEmployeesOpen(connection)
																}
															>
																<GroupAddIcon />
															</IconButton>
														</Tooltip>
														{inspectionType.name &&
														connection.status !== false &&
														inspectionType.name !== "Na żądanie" ? (
															<Tooltip title="Wygeneruj przegląd">
																<IconButton
																	color="inherit"
																	onClick={() =>
																		this.createInspections(connection)
																	}
																>
																	<FormatListBulletedIcon />
																</IconButton>
															</Tooltip>
														) : null}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={2} />
				</Grid>

				<Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
					<Formik
						initialValues={{
							name: this.state.name,
							status: this.state.status === "" ? false : this.state.status
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) =>
							this.handleSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting, values }) => (
							<Form className={classes.form}>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										<FormikTextField
											className={classes.formControl}
											error={errors.name && true}
											id="name"
											name="name"
											label="Nazwa"
											variant="outlined"
											required
											helperText={errors.name}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikSwitchField
											label="Status przeglądu"
											id="status"
											name="status"
											onChange={(value) => this.setState({ status: value })}
											trueValue={true}
											falseValue={false}
											controlLabel={
												values.status === true
													? "Aktywny"
													: values.status === false && "Niektywny"
											}
										/>
									</Grid>
									<Grid item xs={3} />
									<Grid item xs={3}>
										<Button onClick={this.handleClose} color="primary">
											Anuluj
										</Button>
									</Grid>
									<Grid item xs={3}>
										<Button
											type="submit"
											color="primary"
											disabled={isSubmitting}
										>
											Zapisz
										</Button>
									</Grid>
									<Grid item xs={3} />
									<Grid item xs={12}>
										{isSubmitting && <LinearProgress />}
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</Dialog>

				<Dialog
					open={this.state.employeesDialogOpen}
					onClose={this.handleClose}
				>
					<Formik
						initialValues={{
							personId: ""
						}}
						onSubmit={(values, { setSubmitting }) =>
							this.handleSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting, values }) => (
							<Form className={classes.form}>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										{persons &&
											persons.map((person, index) => (
												<Chip
													key={index}
													label={person.name + " " + person.surname}
													className={classes.chip}
													onDelete={() => this.handleRemovePerson(index)}
												/>
											))}
									</Grid>
									<Grid item xs={12}>
										<FormControl
											className={classes.formControl}
											variant="outlined"
										>
											<InputLabel id="persons-label">Pracownicy</InputLabel>
											<Select
												labelId="person-label"
												id="persons"
												name="persons"
												multiple
												label="Pracownicy"
												value={persons}
												onChange={this.handleChange}
											>
												{personList &&
													personList.map((person, index) => {
														return (
															<MenuItem key={index} value={person}>
																{person.name + " " + person.surname}
															</MenuItem>
														);
													})}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={3} />
									<Grid item xs={3}>
										<Button onClick={this.handleClose} color="primary">
											Anuluj
										</Button>
									</Grid>
									<Grid item xs={3}>
										<Button
											type="submit"
											color="primary"
											disabled={isSubmitting}
										>
											Zapisz
										</Button>
									</Grid>
									<Grid item xs={3} />
									<Grid item xs={12}>
										{isSubmitting && <LinearProgress />}
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</Dialog>

				<Tooltip title="Dodaj">
					<Fab className={classes.fab} color="secondary">
						<Link
							style={{
								color: "#fff"
							}}
							to={"/inspections/create"}
						>
							<AddIcon fontSize="large" />
						</Link>
					</Fab>
				</Tooltip>
			</>
		);
	}
}

ConnectionList.propTypes = {
	connection: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getConnections: PropTypes.func.isRequired,
	createDailyInspections: PropTypes.func.isRequired,
	createWeeklyInspections: PropTypes.func.isRequired,
	createDayShiftInspections: PropTypes.func.isRequired,
	createTwoMonthsInspections: PropTypes.func.isRequired,
	createYearlyInspections: PropTypes.func.isRequired,
	clearConnectionState: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired,
	updateConnection: PropTypes.func.isRequired,
	clearPersonState: PropTypes.func.isRequired,
	getPersons: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => {
			dispatch(getConnections());
		},
		createDailyInspections(connectionId, history) {
			return dispatch(createDailyInspections(connectionId, history)).then(
				(res) => {
					if (res && res.status === 201) return res;
				}
			);
		},
		createWeeklyInspections(connectionId, history) {
			return dispatch(createWeeklyInspections(connectionId, history)).then(
				(res) => {
					if (res && res.status === 201) return res;
				}
			);
		},
		createDayShiftInspections(connectionId, history) {
			return dispatch(createDayShiftInspections(connectionId, history)).then(
				(res) => {
					if (res && res.status === 201) return res;
				}
			);
		},
		createTwoMonthsInspections(connectionId, history) {
			return dispatch(createTwoMonthsInspections(connectionId, history)).then(
				(res) => {
					if (res && res.status === 201) return res;
				}
			);
		},
		createYearlyInspections(connectionId, history) {
			return dispatch(createYearlyInspections(connectionId, history)).then(
				(res) => {
					if (res && res.status === 201) return res;
				}
			);
		},
		clearConnectionState: () => {
			dispatch(clearConnectionState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updateConnection(connectionId, updatedConnection) {
			return dispatch(updateConnection(connectionId, updatedConnection)).then(
				(res) => {
					if (res && res.status === 200) return res;
				}
			);
		},
		clearPersonState: () => {
			dispatch(clearPersonState());
		},
		getPersons: () => {
			dispatch(getPersons());
		}
	};
};

const mapStateToProps = (state) => {
	return {
		connection: state.connection,
		person: state.person,
		errors: state.errors
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(ConnectionList));
