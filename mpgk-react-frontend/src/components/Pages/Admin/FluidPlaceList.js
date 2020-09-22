import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	getFluidPlaces,
	addFluidPlace,
	updateFluidPlace,
	clearFluidPlaceState
} from "../../../actions/fluidPlaceActions";
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
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../../reducers/snackbarReducer";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Nazwa miejsca jest wymagana")
		.max(250, "Wprowadź któtszą nazwę")
});

class FluidPlaceList extends Component {
	state = {
		dialogOpen: false,
		placeId: "",
		name: "",
		actionType: "",
		search: "",
		errors: {}
	};

	componentDidMount() {
		this.props.getFluidPlaces();
	}
	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearFluidPlaceState();
	}

	handleOpen = (placeId, name, actionType = "add") => {
		this.setState({
			dialogOpen: true,
			actionType: actionType
		});
		if (actionType === "edit") {
			this.setState({
				name: name,
				placeId: placeId
			});
		}
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			name: "",
			placeId: "",
			actionType: ""
		});
	};

	handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			if (this.state.actionType === "add") {
				const newFluidPlace = { name: values.name };

				this.props.addFluidPlace(newFluidPlace).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dodano nowe miejsce!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
			} else {
				const updatedFluidPlace = {
					placeId: this.state.placeId,
					name: values.name
				};

				this.props
					.updateFluidPlace(this.state.placeId, updatedFluidPlace)
					.then((res) => {
						if (res) {
							this.props.setSnackbar(true, "Dane miejsca zaktualizowane!");
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
		const { classes } = this.props;
		const { fluidPlaces } = this.props.fluidPlace;
		const { errors } = this.props;
		const filtered = fluidPlaces.filter((fluidPlace) => {
			return fluidPlace.name
				.toLowerCase()
				.includes(this.state.search.toLowerCase());
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							Miejsca dodania czynników
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
											<Typography>Nazwa miejsca</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered &&
										filtered.map((fluidPlace) => (
											<TableRow key={fluidPlace.placeId}>
												<TableCell>
													<Typography>{fluidPlace.name}</Typography>
												</TableCell>
												<TableCell>
													<Tooltip title="Edytuj">
														<IconButton
															color="primary"
															onClick={() =>
																this.handleOpen(
																	fluidPlace.placeId,
																	fluidPlace.name,
																	"edit"
																)
															}
														>
															<EditIcon />
														</IconButton>
													</Tooltip>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={2} />
				</Grid>

				<Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
					<Formik
						initialValues={{
							name: this.state.name
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

FluidPlaceList.propTypes = {
	fluidPlace: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getFluidPlaces: PropTypes.func.isRequired,
	addFluidPlace: PropTypes.func.isRequired,
	updateFluidPlace: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		fluidPlace: state.fluidPlace,
		errors: state.errors
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getFluidPlaces: () => {
			dispatch(getFluidPlaces());
		},
		clearFluidPlaceState: () => {
			dispatch(clearFluidPlaceState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updateFluidPlace(placeId, updatedFluidPlace) {
			return dispatch(updateFluidPlace(placeId, updatedFluidPlace)).then(
				(res) => {
					if (res && res.status === 200) return res;
				}
			);
		},
		addFluidPlace(fluidPlace) {
			return dispatch(addFluidPlace(fluidPlace)).then((res) => {
				if (res && res.status === 201) return res;
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(FluidPlaceList));
