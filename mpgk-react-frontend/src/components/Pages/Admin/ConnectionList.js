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
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../../consts/themeConsts";
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
import SearchIcon from "@material-ui/icons/Search";
import { FormikTextField, FormikSwitchField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../../reducers/snackbarReducer";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Nazwa przeglądu jest wymagana")
		.max(70, "Wprowadź któtszą nazwę")
});

export class ConnectionList extends Component {
	state = {
		dialogOpen: false,
		connectionId: "",
		name: "",
		status: "",
		inspectionType: {},
		device: {},
		errors: {},
		search: ""
	};

	componentDidMount() {
		this.props.getConnections();
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearConnectionState();
	}

	handleOpen = (connection) => {
		const { connectionId, name, status, inspectionType, device } = connection;

		this.setState({
			dialogOpen: true,
			connectionId: connectionId,
			name: name,
			status: status,
			inspectionType: inspectionType && { ...inspectionType },
			device: device && { ...device }
		});
	};

	createInspections = (connection) => {
		const {connectionId,inspectionType} = connection;

		switch (inspectionType.name) {
			case "Codziennie":
				this.props.createDailyInspections(connectionId,this.props.history)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Przegląd wygenerowany!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
				break;
			case "Raz w tygodniu":
				this.props.createWeeklyInspections(connectionId,this.props.history)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Przegląd wygenerowany!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
				break;
			case "Codziennie na dziennej zmianie":
				this.props.createDayShiftInspections(connectionId,this.props.history)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Przegląd wygenerowany!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
				break;
			case "Raz na dwa miesiące":
				this.props.createTwoMonthsInspections(connectionId,this.props.history)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Przegląd wygenerowany!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
				break;
			case "Raz w roku":
				this.props.createYearlyInspections(connectionId,this.props.history)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Przegląd wygenerowany!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
				break;
			default:
				break;
		}
	}

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			connectionId: "",
			name: "",
			status: "",
			inspectionType: {},
			device: {}
		});
	};

	onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);

			let updatedConnection = {
				connectionId: this.state.connectionId,
				name: values.name,
				status: values.status
			};

			if (this.state.inspectionType !== null) {
				updatedConnection = {
					...updatedConnection,
					inspectionType: this.state.inspectionType
				};
			}

			if (this.state.device !== null) {
				updatedConnection = {
					...updatedConnection,
					device: this.state.device
				};
			}

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
									{filtered.map((connection) => {
										const {inspectionType} = connection;
										return (
											<TableRow key={connection.connectionId}>
												<TableCell>
													<Typography>{connection.name}</Typography>
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
															onClick={() => this.handleOpen(connection)}
														>
															<EditIcon />
														</IconButton>
													</Tooltip>
													{inspectionType.name && inspectionType.name !== "Na żądanie" ?
													<Tooltip title="Wygeneruj">
														<IconButton
															color="default"
															onClick={() => this.createInspections(connection)}
														>
															<AddCircleIcon fontSize="large"/>
														</IconButton>
													</Tooltip>
													:null}
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
							this.onSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting, values }) => (
							<Form className={classes.form}>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										<FormikTextField
											error={errors.name}
											id="name"
											name="name"
											label="Nazwa"
											variant="outlined"
											required
											helperText={errors.name}
											onChange={this.onChange}
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
				<Tooltip title="Dodaj">
					<Fab
						className={classes.fab}
						color="secondary"
					>	
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
	updateConnection: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => {
			dispatch(getConnections());
		},
		createDailyInspections(connectionId, history) {
			return dispatch(createDailyInspections(connectionId, history)).then((res) => {
				if (res && res.status === 201) return res;
			});
		},
		createWeeklyInspections(connectionId, history) {
			return dispatch(createWeeklyInspections(connectionId, history)).then((res) => {
				if (res && res.status === 201) return res;
			});
		},
		createDayShiftInspections(connectionId, history) {
			return dispatch(createDayShiftInspections(connectionId, history)).then((res) => {
				if (res && res.status === 201) return res;
			});
		},
		createTwoMonthsInspections(connectionId, history) {
			return dispatch(createTwoMonthsInspections(connectionId, history)).then((res) => {
				if (res && res.status === 201) return res;
			});
		},
		createYearlyInspections(connectionId, history) {
			return dispatch(createYearlyInspections(connectionId, history)).then((res) => {
				if (res && res.status === 201) return res;
			});
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
		}
	};
};

const mapStateToProps = (state) => {
	return {
		connection: state.connection,
		errors: state.errors
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(ConnectionList));
