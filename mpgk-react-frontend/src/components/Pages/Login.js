import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, TextField, Button } from "@material-ui/core";
import { login } from "../../actions/securityActions";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../consts/themeConsts";

export class Login extends Component {
	state = {
		username: "",
		password: "",
		errors: {}
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
						<TextField
							id="username"
							name="username"
							error={errors.username && true}
							helperText={errors.username}
							onChange={this.handleChange}
							label="Login"
							required
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
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
