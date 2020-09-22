import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getFluidRegistries,
	clearFluidRegistryState,
	addFluidRegistry
} from "../../actions/fluidRegistryActions";
import {
	getFluidPlaces,
	clearFluidPlaceState
} from "../../actions/fluidPlaceActions";
import { getFluids, clearFluidState } from "../../actions/fluidActions";
import FormatDate from "../Common/FormatDate";
import {
	withStyles,
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from "@material-ui/core";
import { styles } from "../../consts/themeConsts";
import {
	Grid,
	Typography,
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
	Tooltip,
	Fab
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../reducers/snackbarReducer";

const validationSchema = Yup.object().shape({
	quantity: Yup.number()
		.moreThan(0, "Wprowadź liczbę większą od zera")
		.required("Ilość czynnika jest wymagana")
});

class FluidRegistry extends Component {
	state = {
		dialogOpen: false,
		quantity: "",
		fluid: "",
		fluidPlace: "",
		errors: {},
		search: ""
	};

	componentDidMount() {
		this.props.getFluidRegistries();
		this.props.getFluids();
		this.props.getFluidPlaces();
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearFluidRegistryState();
		this.props.clearFluidPlaceState();
		this.props.clearFluidState();
	}

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			quantity: "",
			fluid: "",
			fluidPlace: ""
		});
	};

	handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);

			const newFluidRegistry = {
				quantity: values.quantity,
				fluid: this.state.fluid,
				fluidPlace: this.state.fluidPlace
			};

			this.props.addFluidRegistry(newFluidRegistry).then((res) => {
				if (res) {
					this.props.setSnackbar(true, "Dodano nowy wpis!");
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
		const { fluidPlaces } = this.props.fluidPlace;
		const { fluids } = this.props.fluid;
		const { errors } = this.props;
		const filtered = fluidRegistries.filter((fluidRegistry) => {
			const { fluidPlace } = fluidRegistry;

			if (fluidPlace) {
				return (
					fluidPlace.name
						.toLowerCase()
						.includes(this.state.search.toLowerCase()) ||
					fluidRegistry.datetime.includes(this.state.search.toLowerCase())
				);
			} else {
				return fluidRegistry.datetime.includes(this.state.search.toLowerCase());
			}
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
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
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered &&
										filtered.map((fluidRegistry, index) => {
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
														<Typography component="div" align="center">
															<FormatDate
																date={fluidRegistry.datetime}
																showTime={true}
															/>
														</Typography>

														<Typography align="center">
															{person && person.name + " " + person.surname}
														</Typography>
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
							quantity: "",
							fluidId: "",
							placeId: ""
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) =>
							this.handleSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting }) => (
							<Form className={classes.form}>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										<FormikTextField
											className={classes.formControl}
											error={errors.quantity && true}
											id="quantity"
											name="quantity"
											label="Ilość [litry]"
											variant="outlined"
											type="number"
											required
											helperText={errors.quantity}
											onChange={this.handleChange}
										/>
									</Grid>

									<Grid item xs={12}>
										<FormControl
											required
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel id="fluid-places-label">
												Miejsce dodania
											</InputLabel>
											<Select
												labelId="fluid-places-label"
												id="fluidPlace"
												name="fluidPlace"
												value={this.state.fluidPlace}
												onChange={this.handleChange}
												label="Miejsce dodania"
											>
												<MenuItem value="">
													<em>Wybierz miejsce</em>
												</MenuItem>
												{fluidPlaces &&
													fluidPlaces.map((fluidPlace) => (
														<MenuItem
															key={fluidPlace.placeId}
															value={fluidPlace}
														>
															{fluidPlace.name}
														</MenuItem>
													))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12}>
										<FormControl
											required
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel id="fluids-label">Rodzaj czynnika</InputLabel>
											<Select
												labelId="fluids-label"
												id="fluid"
												name="fluid"
												value={this.state.fluid}
												onChange={this.handleChange}
												label="Rodzaj czynnika"
											>
												<MenuItem value="">
													<em>Wybierz czynnik</em>
												</MenuItem>
												{fluids &&
													fluids.map((fluid) => (
														<MenuItem key={fluid.fluidId} value={fluid}>
															{fluid.name}
														</MenuItem>
													))}
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
					<Fab
						className={classes.fab}
						color="secondary"
						onClick={() => {
							this.setState({ dialogOpen: true });
						}}
					>
						<AddIcon fontSize="large" />
					</Fab>
				</Tooltip>
			</>
		);
	}
}

FluidRegistry.propTypes = {
	fluidRegistry: PropTypes.object.isRequired,
	fluidPlace: PropTypes.object.isRequired,
	fluid: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getFluidRegistries: PropTypes.func.isRequired,
	addFluidRegistry: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired,
	getFluidPlaces: PropTypes.func.isRequired,
	getFluids: PropTypes.func.isRequired,
	clearFluidPlaceState: PropTypes.func.isRequired,
	clearFluidState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	fluidRegistry: state.fluidRegistry,
	fluidPlace: state.fluidPlace,
	fluid: state.fluid,
	errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
	getFluidRegistries: () => {
		dispatch(getFluidRegistries());
	},
	getFluids: () => {
		dispatch(getFluids());
	},
	getFluidPlaces: () => {
		dispatch(getFluidPlaces());
	},
	clearFluidRegistryState: () => {
		dispatch(clearFluidRegistryState());
	},
	clearFluidState: () => {
		dispatch(clearFluidState());
	},
	clearFluidPlaceState: () => {
		dispatch(clearFluidPlaceState());
	},
	setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
		dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
	},
	addFluidRegistry(fluidRegistry) {
		return dispatch(addFluidRegistry(fluidRegistry)).then((res) => {
			if (res && res.status === 201) return res;
		});
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(FluidRegistry));
