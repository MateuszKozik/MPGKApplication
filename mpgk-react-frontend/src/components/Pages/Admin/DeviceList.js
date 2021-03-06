import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getDevices,
	addDevice,
	updateDevice,
	clearDeviceState
} from "../../../actions/deviceActions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
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
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import { FormikTextField, FormikSwitchField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../../reducers/snackbarReducer";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Nazwa urządzenia jest wymagana")
		.max(250, "Wprowadź któtszą nazwę")
});

class DeviceList extends Component {
	state = {
		dialogOpen: false,
		deviceId: "",
		name: "",
		status: "",
		actionType: "",
		search: "",
		errors: {}
	};

	componentDidMount() {
		this.props.getDevices();
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	handleChange = (e) => {
		if (e.target.type === "checkbox") {
			this.setState({ [e.target.name]: e.target.checked });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	};

	componentWillUnmount() {
		this.props.clearDeviceState();
	}

	handleOpen = (deviceId, name, status, actionType = "add") => {
		this.setState({
			dialogOpen: true,
			actionType: actionType
		});
		if (actionType === "edit") {
			this.setState({
				deviceId: deviceId,
				name: name,
				status: status
			});
		}
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			deviceId: "",
			name: "",
			status: "",
			actionType: ""
		});
	};

	handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			if (this.state.actionType === "add") {
				const newDevice = { name: values.name, status: values.status };

				this.props.addDevice(newDevice).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dodano nowe urządzenie!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
			} else {
				const updatedDevice = {
					deviceId: this.state.deviceId,
					name: values.name,
					status: values.status
				};

				this.props
					.updateDevice(this.state.deviceId, updatedDevice)
					.then((res) => {
						if (res) {
							this.props.setSnackbar(true, "Dane urządzenia zaktualizowane!");
							this.handleClose();
						} else {
							this.props.setSnackbar(true, "Wystąpił błąd!");
						}
					});
			}
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
		const { devices } = this.props.device;
		const { classes } = this.props;
		const { errors } = this.props;
		const filtered = devices.filter((device) => {
			return device.name
				.toLowerCase()
				.includes(this.state.search.toLowerCase());
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							Urządzenia
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
											<Typography>Nazwa urządzenia</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography align="center">Status</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography align="center">Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered &&
										filtered.map((device) => {
											return (
												<TableRow key={device.deviceId}>
													<TableCell>
														<Typography>{device.name}</Typography>
													</TableCell>
													<TableCell>
														<Typography align="center">
															{device.status === true
																? "Włączone"
																: "Wyłączone"}
														</Typography>
													</TableCell>
													<TableCell align="center">
														<Tooltip title="Edytuj">
															<IconButton
																color="primary"
																onClick={() =>
																	this.handleOpen(
																		device.deviceId,
																		device.name,
																		device.status,
																		"edit"
																	)
																}
															>
																<EditIcon />
															</IconButton>
														</Tooltip>
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
											label="Status urządzenia"
											id="status"
											name="status"
											onChange={(value) => this.setState({ status: value })}
											trueValue={true}
											falseValue={false}
											controlLabel={
												values.status === true
													? "Włączone"
													: values.status === false && "Wyłączone"
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
						onClick={this.handleOpen}
					>
						<AddIcon fontSize="large" />
					</Fab>
				</Tooltip>
			</>
		);
	}
}

DeviceList.propTypes = {
	device: PropTypes.object.isRequired,
	getDevices: PropTypes.func.isRequired,
	addDevice: PropTypes.func.isRequired,
	updateDevice: PropTypes.func.isRequired,
	clearDeviceState: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDevices: () => {
			dispatch(getDevices());
		},
		clearDeviceState: () => {
			dispatch(clearDeviceState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updateDevice(deviceId, updatedDevice) {
			return dispatch(updateDevice(deviceId, updatedDevice)).then((res) => {
				if (res && res.status === 200) return res;
			});
		},
		addDevice(device) {
			return dispatch(addDevice(device)).then((res) => {
				if (res && res.status === 201) return res;
			});
		}
	};
};

const mapStateToProps = (state) => {
	return { device: state.device, errors: state.errors };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(DeviceList));
