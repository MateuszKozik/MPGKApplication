import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getPersons,
	updatePerson,
	clearPersonState
} from "../../../actions/personActions";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	withStyles
} from "@material-ui/core";
import { tableStyles } from "../../../consts/themeConsts";
import { getRoles, clearRoleState } from "../../../actions/roleActions";
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
import LockIcon from "@material-ui/icons/Lock";
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../../reducers/snackbarReducer";
import { Link } from "react-router-dom";
import FormikSwitchField from "formik-material-fields/lib/FormikSwitchField";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Imię jest wymagane")
		.max(35, "Wprowadź któtsze imię"),
	surname: Yup.string()
		.required("Nazwisko jest wymagane")
		.max(35, "Wprowadź któtsze nazwisko")
});

const validationPasswordSchema = Yup.object().shape({
	password: Yup.string()
		.required("Hasło jest wymagane")
		.min(6, "Hasło musi składać się z minimum 6 znaków")
		.max(60, "Wprowadź krótsze hasło"),
	confirmPassword: Yup.string().required("Potwierdzenie hasła jest wymagane")
});

class PersonList extends Component {
	state = {
		dialogOpen: false,
		passwordDialogOpen: false,
		personId: "",
		name: "",
		surname: "",
		user: "",
		role: "",
		enabled: "",
		password: "",
		confirmPassword: "",
		search: "",
		error: {}
	};

	componentDidMount() {
		this.props.getPersons();
		this.props.getRoles();
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	handleChange = (e) => {
		if (e.target.type === "radio") {
			this.setState({ role: e.target.value });
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	};

	// Handle switch field change
	handleSwitchChange = (input) => (value) => {
		this.setState({ [input]: value });
	};

	componentWillUnmount() {
		this.props.clearPersonState();
		this.props.clearRoleState();
	}

	handleEditOpen = (person) => {
		const {
			personId,
			name,
			surname,
			user,
			user: { enabled, role }
		} = person;
		this.setState({
			dialogOpen: true,
			personId: personId,
			name: name,
			surname: surname,
			user: user,
			enabled: enabled,
			role: role[0].roleId
		});
	};

	handleEditPasswordOpen = (person) => {
		const { personId, name, surname, user } = person;
		this.setState({
			passwordDialogOpen: true,
			personId: personId,
			name: name,
			surname: surname,
			user: user
		});
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			passwordDialogOpen: false,
			personId: "",
			name: "",
			surname: "",
			user: "",
			role: "",
			enabled: "",
			password: "",
			confirmPassword: ""
		});
	};

	handleEditSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);

			let user = this.state.user;
			user.enabled = values.enabled;
			user.role = [{ roleId: this.state.role }];
			const updatedPerson = {
				personId: this.state.personId,
				name: values.name,
				surname: values.surname,
				user: user
			};

			this.props
				.updatePerson(this.state.personId, updatedPerson)
				.then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dane pracownika zaktualizowane!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
		}, 500);
	};

	handleEditPasswordSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);

			const { password, confirmPassword } = values;
			if (password === confirmPassword) {
				let user = this.state.user;
				user.password = values.password;
				const updatedPerson = {
					personId: this.state.personId,
					name: this.state.name,
					surname: this.state.surname,
					user: user
				};

				this.props
					.updatePerson(this.state.personId, updatedPerson)
					.then((res) => {
						if (res) {
							this.props.setSnackbar(true, "Dane pracownika zaktualizowane!");
							this.handleClose();
						} else {
							this.props.setSnackbar(true, "Wystąpił błąd!");
						}
					});
			} else {
				this.setState({
					error: { confirmPassword: "Hasła muszą się zgadzać" }
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
		const { roles } = this.props.role;
		const { persons } = this.props.person;
		const { classes } = this.props;
		const { errors } = this.props;
		const filtered = persons.filter((person) => {
			return (
				person.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
				person.surname.toLowerCase().includes(this.state.search.toLowerCase())
			);
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
											<Typography>Imię i Nazwisko</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Uprawnienia</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Dane konta</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered &&
										filtered.map((person) => {
											return (
												<TableRow key={person.personId}>
													<TableCell>
														<Typography>
															{person.name + " " + person.surname}
														</Typography>
													</TableCell>
													<TableCell>
														{person.user &&
															person.user.role &&
															person.user.role.map((role, index) => (
																<Typography key={index}>
																	{role.name && role.name.toLowerCase()}
																</Typography>
															))}
													</TableCell>
													<TableCell>
														<Typography>
															<b>Login: </b>
															{person.user && person.user.username}
														</Typography>
														<Typography>
															<b>Status: </b>
															{person.user && person.user.enabled
																? " Aktywne"
																: " Wyłączone"}
														</Typography>
													</TableCell>
													<TableCell>
														<Tooltip title="Edytuj">
															<IconButton
																color="primary"
																onClick={() => this.handleEditOpen(person)}
															>
																<EditIcon />
															</IconButton>
														</Tooltip>

														<Tooltip title="Zmień hasło">
															<IconButton
																onClick={() =>
																	this.handleEditPasswordOpen(person)
																}
															>
																<LockIcon color="error" />
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
							enabled: this.state.enabled
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) =>
							this.handleEditSubmit(values, { setSubmitting })
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
											label="Imię"
											variant="outlined"
											required
											helperText={errors.name}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikTextField
											error={errors.surname && true}
											id="surname"
											name="surname"
											label="Nazwisko"
											variant="outlined"
											required
											helperText={errors.surname}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormControl component="fieldset" required>
											<FormLabel component="legend">Uprawnienia</FormLabel>
											<RadioGroup row>
												{roles &&
													roles.map((item, index) => {
														return (
															<FormControlLabel
																key={index}
																value={item.roleId}
																onChange={this.handleChange}
																control={<Radio color="primary" />}
																label={item.name.toLowerCase()}
																checked={
																	item.roleId === parseInt(this.state.role)
																}
																labelPlacement="start"
															/>
														);
													})}
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item xs={12}>
										<FormikSwitchField
											label="Status konta"
											id="enabled"
											name="enabled"
											onChange={this.handleSwitchChange("enabled")}
											trueValue={true}
											falseValue={false}
											controlLabel={
												values.enabled === true
													? "Aktywne"
													: values.enabled === false && "Wyłączone"
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

				<Dialog open={this.state.passwordDialogOpen} onClose={this.handleClose}>
					<Formik
						initialValues={{
							password: "",
							confirmPassword: ""
						}}
						validationSchema={validationPasswordSchema}
						onSubmit={(values, { setSubmitting }) =>
							this.handleEditPasswordSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting, values }) => (
							<Form className={classes.form}>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										<FormikTextField
											className={classes.formControl}
											id="password"
											name="password"
											label="Hasło"
											type="password"
											variant="outlined"
											required
											onChange={this.onChange}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikTextField
											className={classes.formControl}
											helperText={this.state.error.confirmPassword}
											id="confirmPassword"
											name="confirmPassword"
											label="Potwierdź hasło"
											type="password"
											variant="outlined"
											required
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
					<Fab className={classes.fab} color="secondary">
						<Link
							style={{
								color: "#fff"
							}}
							to={"/persons/create"}
						>
							<AddIcon fontSize="large" />
						</Link>
					</Fab>
				</Tooltip>
			</>
		);
	}
}

PersonList.propTypes = {
	person: PropTypes.object.isRequired,
	role: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	getPersons: PropTypes.func.isRequired,
	updatePerson: PropTypes.func.isRequired,
	getRoles: PropTypes.func.isRequired,
	clearPersonState: PropTypes.func.isRequired,
	clearRoleState: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	person: state.person,
	role: state.role,
	errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
	return {
		getPersons: () => {
			dispatch(getPersons());
		},
		clearPersonState: () => {
			dispatch(clearPersonState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		getRoles: () => {
			dispatch(getRoles());
		},
		clearRoleState: () => {
			dispatch(clearRoleState());
		},
		updatePerson(personId, updatedPerson) {
			return dispatch(updatePerson(personId, updatedPerson)).then((res) => {
				if (res && res.status === 200) return res;
			});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(PersonList));
