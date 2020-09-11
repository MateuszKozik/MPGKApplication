import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getPersons,
	deletePerson,
	addPerson,
    updatePerson,
	clearPersonState
} from "../../../actions/personActions";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../../consts/themeConsts";
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
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../../reducers/snackbarReducer";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Imię jest wymagane")
        .max(35, "Wprowadź któtsze imię"),
    surname: Yup.string()
		.required("Nazwisko jest wymagane")
		.max(35, "Wprowadź któtsze nazwisko")
});

class PersonList extends Component {
	state = {
		dialogOpen: false,
		personId: "",
		name: "",
        surname: "",
        actionType: "",
		search: "",
		errors: {}
	};

	componentDidMount() {
		this.props.getPersons();
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onDeleteClick = (personId) => {
		this.props.deletePerson(personId);
	};

	componentWillUnmount() {
		this.props.clearPersonState();
	}

	handleOpen = (personId, name, surname, actionType = "add") => {
		this.setState({
			dialogOpen: true,
			actionType: actionType
		});
		if (actionType === "edit") {
			this.setState({
				personId: personId,
				name: name,
				surname: surname
			});
		}
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			personId: "",
			name: "",
			surname: "",
			actionType: ""
		});
	};

	onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			if (this.state.actionType === "add") {
				const newPerson = { name: values.name, surname: values.surname };

				this.props.addPerson(newPerson).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dodano nową osobę!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
			} else {
				const updatedPerson = {
					personId: this.state.personId,
					name: values.name,
					surname: values.surname
				};

				this.props
					.updatePerson(this.state.personId, updatedPerson)
					.then((res) => {
						if (res) {
							this.props.setSnackbar(true, "Dane osoby zaktualizowane!");
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
		const { persons } = this.props.person;
		const { classes } = this.props;
		const { errors } = this.props;
		const filtered = persons.filter((person) => {
			return person.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
				person.surname.toLowerCase().includes(this.state.search.toLowerCase());
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							Pracownicy
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
											<Typography>Imię</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Nazwisko</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered.map((person) => {
										return (
											<TableRow key={person.personId}>
												<TableCell>
													<Typography>{person.name}</Typography>
												</TableCell>
												<TableCell>
                                                        <Typography>{person.surname}</Typography>	
												</TableCell>
												<TableCell>
													<Tooltip title="Edytuj">
														<IconButton
															color="primary"
															onClick={() =>
																this.handleOpen(
																	person.personId,
																	person.name,
																	person.surname,
																	"edit"
																)
															}
														>
															<EditIcon />
														</IconButton>
													</Tooltip>
													<Tooltip title="Usuń">
														<IconButton
															onClick={() =>
																this.props.deletePerson(person.personId)
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
							name: this.state.name,
							surname: this.state.surname,
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
											label="Imię"
											variant="outlined"
											required
											helperText={errors.name}
											onChange={this.onChange}
										/>
									</Grid>
									<Grid item xs={12}>
                                    <FormikTextField
											error={errors.surname}
											id="surname"
											name="surname"
											label="Nazwisko"
											variant="outlined"
											required
											helperText={errors.surname}
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

PersonList.propTypes = {
	person: PropTypes.object.isRequired,
	getPersons: PropTypes.func.isRequired,
	updatePerson: PropTypes.func.isRequired,
	addPerson: PropTypes.func.isRequired,
	clearPersonState: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	person: state.person,
	errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
	return {
		getPersons: () => {
			dispatch(getPersons());
		},
		deletePerson: (personId) => {
			dispatch(deletePerson(personId));
		},
		clearPersonState: () => {
			dispatch(clearPersonState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updatePerson(personId, updatedPerson) {
			return dispatch(updatePerson(personId, updatedPerson)).then((res) => {
				if (res && res.status === 200) return res;
			});
		},
		addPerson(person) {
			return dispatch(addPerson(person)).then((res) => {
				if (res && res.status === 201) return res;
			});
		}
	};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(tableStyles)(PersonList));
