import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getFluids,
	updateFluid,
	addFluid,
	deleteFluid,
	clearFluidState
} from "../../actions/fluidActions";
import PropTypes from "prop-types";
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
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../reducers/snackbarReducer";
import { tableStyles } from "./../../consts/themeConsts";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Nazwa czynnika jest wymagana")
		.max(50, "Wprowadź któtszą nazwę")
});

class FluidList extends Component {
	state = {
		dialogOpen: false,
		fluidId: "",
		name: "",
		actionType: "",
		search: "",
		errors: {}
	};

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearFluidState();
	}

	handleOpen = (fluidId, name, actionType = "add") => {
		this.setState({
			dialogOpen: true,
			actionType: actionType
		});
		if (actionType === "edit") {
			this.setState({
				name: name,
				fluidId: fluidId
			});
		}
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			name: "",
			fluidId: "",
			actionType: ""
		});
	};

	onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			if (this.state.actionType === "add") {
				const newFluid = { name: values.name };

				this.props.addFluid(newFluid).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dodano nowy czynnik!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
			} else {
				const updatedFluid = {
					fluidId: this.state.fluidId,
					name: values.name
				};

				this.props.updateFluid(this.state.fluidId, updatedFluid).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dane czynnika zaktualizowane!");
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

	componentDidMount() {
		this.props.getFluids();
	}

	render() {
		const { classes } = this.props;
		const { fluids } = this.props.fluid;
		const { errors } = this.props;
		const filtered = fluids.filter((fluid) => {
			return fluid.name.toLowerCase().includes(this.state.search.toLowerCase());
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h2" className={classes.title}>
							Rodzaje czynników
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
											<Typography>Nazwa czynnika</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered.map((fluid) => (
										<TableRow key={fluid.fluidId}>
											<TableCell>
												<Typography>{fluid.name}</Typography>
											</TableCell>
											<TableCell>
												<Tooltip title="Edytuj">
													<IconButton
														color="primary"
														onClick={() =>
															this.handleOpen(fluid.fluidId, fluid.name, "edit")
														}
													>
														<EditIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title="Usuń">
													<IconButton
														onClick={() =>
															this.props.deleteFluid(fluid.fluidId)
														}
													>
														<DeleteIcon />
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
							this.onSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting }) => (
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

FluidList.propTypes = {
	fluid: PropTypes.object.isRequired,
	getFluids: PropTypes.func.isRequired,
	updateFluid: PropTypes.func.isRequired,
	addFluid: PropTypes.func.isRequired,
	deleteFluid: PropTypes.func.isRequired,
	clearFluidState: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	fluid: state.fluid,
	errors: state.errors
});

export default connect(mapStateToProps, {
	getFluids,
	updateFluid,
	addFluid,
	setSnackbar,
	deleteFluid,
	clearFluidState
})(withStyles(tableStyles)(FluidList));
