import React, { Component } from "react";
import { connect } from "react-redux";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	withStyles,
	Chip,
	Grid,
	Button
} from "@material-ui/core";
import { styles } from "../../../../consts/themeConsts";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { getConnections } from "../../../../actions/connectionActions";
import { addUser } from "../../../../actions/userActions";
import { setSnackbar } from "../../../../reducers/snackbarReducer";

export class Inspections extends Component {
	componentDidMount() {
		this.props.getConnections();
	}

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	handleSaveEmployee = () => {
		const {
			values: {
				username,
				password,
				confirmPassword,
				enabled,
				role,
				name,
				surname,
				connections
			}
		} = this.props;
		const newEmployee = {
			username: username,
			password: password,
			confirmPassword: confirmPassword,
			enabled: enabled,
			role: [{ roleId: role }],
			person: {
				name: name,
				surname: surname,
				connections: connections
			}
		};

		this.props.addUser(newEmployee).then((res) => {
			if (res && res.status === 201) {
				this.props.setSnackbar(true, "Pracownik dodany!");
				this.props.handleHistoryPush();
			} else if (res && res.status === 409) {
				this.props.setSnackbar(
					true,
					"Użytkownik o podanej nazwie już istnieje!"
				);
			} else {
				this.props.setSnackbar(true, "Wystąpił błąd!");
			}
		});
	};

	render() {
		const { classes } = this.props;
		const connectionList = this.props.connection.connections;

		const {
			values: { connections },
			handleChange,
			handleRemoveConnection
		} = this.props;

		return (
			<Formik
				initialValues={{
					connectionId: ""
				}}
				onSubmit={this.handleSaveEmployee}
			>
				{({ values }) => (
					<Form className={classes.form}>
						<Grid container spacing={2} justify="center">
							<Grid item xs={false} md={4} />

							<Grid item xs={12} md={4}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										{connections &&
											connections.map((connection, index) => (
												<Chip
													key={index}
													label={connection.name}
													className={classes.chip}
													onDelete={() => handleRemoveConnection(index)}
												/>
											))}
									</Grid>
									<Grid item xs={12}>
										<FormControl
											className={classes.formControl}
											variant="outlined"
										>
											<InputLabel id="connections-label">Przeglądy</InputLabel>
											<Select
												labelId="connections-label"
												id="connections"
												name="connections"
												multiple
												label="Przeglądy"
												value={connections}
												onChange={handleChange("connections")}
											>
												{connectionList &&
													connectionList.map((connection, index) => {
														return (
															<MenuItem key={index} value={connection}>
																{connection.name}
															</MenuItem>
														);
													})}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={3} />
									<Grid item xs={3}>
										<Button onClick={this.back}>Wróć</Button>
									</Grid>
									<Grid item xs={3}>
										<Button type="submit" color="primary">
											Zapisz
										</Button>
									</Grid>
									<Grid item xs={3} />
								</Grid>
							</Grid>

							<Grid item xs={false} md={4} />
						</Grid>
					</Form>
				)}
			</Formik>
		);
	}
}

Inspections.propTypes = {
	connection: PropTypes.object.isRequired,
	getConnections: PropTypes.func.isRequired,
	addUser: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		getConnections: () => {
			dispatch(getConnections());
		},
		addUser(user) {
			return dispatch(addUser(user)).then((res) => {
				if (res) return res;
			});
		}
	};
};

const mapStateToProps = (state) => {
	return {
		connection: state.connection
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Inspections));
