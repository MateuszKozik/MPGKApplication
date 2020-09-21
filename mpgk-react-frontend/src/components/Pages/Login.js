import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { login } from "../../actions/securityActions";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../consts/themeConsts";

export class Login extends Component {
	state = {
		username: "",
		password: ""
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.security.validToken) {
			nextProps.history.push("/");
			return true;
		} else {
			return null;
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const { username, password } = this.state;

		const LoginRequest = {
			username: username,
			password: password
		};

		this.props.login(LoginRequest);
	};

	render() {
		const { errors } = this.props;
		const { classes } = this.props;
		return (
			<form className={classes.form} onSubmit={this.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<img
							src="logo.jpg"
							alt="logo"
							style={{
								maxWidth: "100%"
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							Oddział Energetyki Cieplnej
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h4" className={classes.title}>
							Przeglądy okresowe
						</Typography>
					</Grid>
					<Grid item xs={12} style={{ marginTop: 15 }}>
						<Grid container>
							<Grid item xs={false} md={4} />
							<Grid item xs={12} md={4}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											className={classes.formControl}
											id="username"
											name="username"
											error={errors.username && true}
											helperText={errors.username}
											onChange={this.handleChange}
											label="Nazwa użytkownika"
											required
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											className={classes.formControl}
											type="password"
											id="password"
											name="password"
											error={errors.password && true}
											helperText={errors.password}
											label="Hasło"
											onChange={this.handleChange}
											required
											variant="outlined"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={false} md={4} />
						</Grid>
					</Grid>
					<Grid item xs={12}></Grid>
					<Grid item xs={12}>
						<Button type="submit" variant="contained" color="primary">
							Zaloguj
						</Button>
					</Grid>
				</Grid>
			</form>
		);
	}
}

Login.propTypes = {
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (LoginRequest) => {
			dispatch(login(LoginRequest));
		}
	};
};

const mapStateToProps = (state) => {
	return {
		security: state.security,
		errors: state.errors
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(Login));
