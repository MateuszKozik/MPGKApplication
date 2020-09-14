import React, { Component } from "react";
import {
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../../../consts/themeConsts";
import { getRoles } from "../../../../actions/roleActions";
import PropTypes from "prop-types";

export class Roles extends Component {
	componentDidMount() {
		this.props.getRoles();
	}

	continue = () => {
		this.props.nextStep();
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const { roles } = this.props.role;
		const { classes } = this.props;
		const {
			values: { role },
			handleChange
		} = this.props;
		return (
			<Formik
				initialValues={{
					roleId: ""
				}}
				onSubmit={this.continue}
			>
				{({ values }) => (
					<Form className={classes.form}>
						<Grid container spacing={2} justify="center">
							<Grid item xs={12}>
								<FormControl component="fieldset" required>
									<FormLabel component="legend">Uprawnienia</FormLabel>
									<RadioGroup>
										{roles &&
											roles.map((item, index) => {
												return (
													<FormControlLabel
														key={index}
														value={item.roleId}
														onChange={handleChange("role")}
														control={<Radio color="primary" />}
														label={item.name.toLowerCase()}
														checked={item.roleId === parseInt(role)}
														labelPlacement="start"
													/>
												);
											})}
									</RadioGroup>
								</FormControl>
							</Grid>

							<Grid item xs={3} />
							<Grid item xs={3}>
								<Button onClick={this.back}>Wróć</Button>
							</Grid>
							<Grid item xs={3}>
								<Button type="submit" color="primary">
									Dalej
								</Button>
							</Grid>
							<Grid item xs={3} />
						</Grid>
					</Form>
				)}
			</Formik>
		);
	}
}

Roles.propTypes = {
	role: PropTypes.object.isRequired,

	getRoles: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRoles: () => {
			dispatch(getRoles());
		}
	};
};

const mapStateToProps = (state) => {
	return {
		role: state.role
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(Roles));
