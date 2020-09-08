import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getFluidRegistries,
	deleteFluidRegistry,
	updateFluidRegistry,
	clearFluidRegistryState
} from "../../../actions/fluidRegistryActions";
import FormatDate from "../../Common/FormatDate";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../../consts/themeConsts";
import {
	Grid,
	Typography,
	IconButton,
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
import DeleteIcon from "@material-ui/icons/Delete";
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../../reducers/snackbarReducer";

const validationSchema = Yup.object().shape({
	quantity: Yup.number()
		.moreThan(0, "Wprowadź liczbę większą od zera")
		.required("Ilość czynnika jest wymagana")
});

class FluidRegistryList extends Component {
	state = {
		dialogOpen: false,
		registryId: "",
		quantity: "",
		datetime: "",
		person: {},
		fluid: {},
		fluidPlace: {},
		errors: {},
		search: ""
	};

	componentDidMount() {
		this.props.getFluidRegistries();
	}

	onDeleteClick(registryId) {
		this.props.deleteFluidRegistry(registryId);
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearFluidRegistryState();
	}

	handleOpen = (fluidRegistry) => {
		const { registryId, quantity, datetime } = fluidRegistry;
		const { person, fluid, fluidPlace } = fluidRegistry;
		this.setState({
			dialogOpen: true,
			registryId: registryId,
			quantity: quantity,
			datetime: datetime,
			person: person && { ...person },
			fluid: fluid && { ...fluid },
			fluidPlace: fluidPlace && { ...fluidPlace }
		});
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			registryId: "",
			quantity: "",
			datetime: "",
			person: {},
			fluid: {},
			fluidPlace: {}
		});
	};

	onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);

			let updatedFluidRegistry = {
				registryId: this.state.registryId,
				quantity: values.quantity,
				datetime: this.state.datetime
			};

			if (this.state.person !== null) {
				updatedFluidRegistry = {
					...updatedFluidRegistry,
					person: this.state.person
				};
			}

			if (this.state.fluid !== null) {
				updatedFluidRegistry = {
					...updatedFluidRegistry,
					fluid: this.state.fluid
				};
			}

			if (this.state.fluidPlace !== null) {
				updatedFluidRegistry = {
					...updatedFluidRegistry,
					fluidPlace: this.state.fluidPlace
				};
			}

			this.props
				.updateFluidRegistry(this.state.registryId, updatedFluidRegistry)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dane wpisu zaktualizowane!");
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
		const { fluidRegistries } = this.props.fluidRegistry;
		const { errors } = this.props;
		const filtered = fluidRegistries.filter((fluidRegistry) => {
			const { fluidPlace, fluid, person } = fluidRegistry;
			if (!fluidPlace && !fluid && !person) {
				return fluidRegistry.datetime.includes(this.state.search.toLowerCase());
			}
			if (!fluid) {
				return (
					fluidRegistry.datetime.includes(this.state.search.toLowerCase()) ||
					fluidPlace.name
						.toLowerCase()
						.includes(this.state.search.toLowerCase())
				);
			}
			if (!fluidPlace) {
				return (
					fluidRegistry.datetime.includes(this.state.search.toLowerCase()) ||
					fluid.name.toLowerCase().includes(this.state.search.toLowerCase())
				);
			}
			if (!person) {
				return (
					fluid.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
					fluidPlace.name
						.toLowerCase()
						.includes(this.state.search.toLowerCase()) ||
					fluidRegistry.datetime.includes(this.state.search.toLowerCase())
				);
			}
			if (fluidPlace && fluid && person) {
				return (
					fluid.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
					fluidPlace.name
						.toLowerCase()
						.includes(this.state.search.toLowerCase()) ||
					fluidRegistry.datetime.includes(this.state.search.toLowerCase()) ||
					person.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
					person.surname.toLowerCase().includes(this.state.search.toLowerCase())
				);
			} else {
				return fluidRegistry.datetime.includes(this.state.search.toLowerCase());
			}
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h2" className={classes.title}>
							Rejestr płynów roboczych ORC
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
											<Typography>Miejsce dodania</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Rodzaj czynnika</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Ilość [litry]</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Data</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Imię i nazwisko</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered.map((fluidRegistry, index) => {
										const { fluidPlace, person, fluid } = fluidRegistry;
										return (
											<TableRow key={index}>
												<TableCell>
													<Typography>
														{fluidPlace && fluidPlace.name}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography>{fluid && fluid.name}</Typography>
												</TableCell>
												<TableCell>
													<Typography>{fluidRegistry.quantity}</Typography>
												</TableCell>
												<TableCell>
													<FormatDate date={fluidRegistry.datetime} datetime />
												</TableCell>
												<TableCell>
													<Typography>
														{person && person.name + " " + person.surname}
													</Typography>
												</TableCell>
												<TableCell>
													<Tooltip title="Edytuj">
														<IconButton
															color="primary"
															onClick={() => this.handleOpen(fluidRegistry)}
														>
															<EditIcon />
														</IconButton>
													</Tooltip>
													<Tooltip title="Usuń">
														<IconButton
															onClick={() =>
																this.props.deleteFluidRegistry(
																	fluidRegistry.registryId
																)
															}
														>
															<DeleteIcon />
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
							quantity: this.state.quantity
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) =>
							this.onSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting }) => (
							<Form className={classes.form}>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										<FormikTextField
											error={errors.quantity}
											id="quantity"
											name="quantity"
											label="Ilość [litry]"
											variant="outlined"
											type="number"
											required
											helperText={errors.quantity}
											onChange={this.onChange}
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
			</>
		);
	}
}

FluidRegistryList.propTypes = {
	fluidRegistry: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getFluidRegistries: PropTypes.func.isRequired,
	deleteFluidRegistry: PropTypes.func.isRequired,
	updateFluidRegistry: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getFluidRegistries: () => {
			dispatch(getFluidRegistries());
		},
		deleteFluidRegistry: (registryId) => {
			dispatch(deleteFluidRegistry(registryId));
		},
		clearFluidRegistryState: () => {
			dispatch(clearFluidRegistryState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updateFluidRegistry(registryId, updatedFluidRegistry) {
			return dispatch(
				updateFluidRegistry(registryId, updatedFluidRegistry)
			).then((res) => {
				if (res && res.status === 200) return res;
			});
		}
	};
};

const mapStateToProps = (state) => ({
	fluidRegistry: state.fluidRegistry,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(FluidRegistryList));
