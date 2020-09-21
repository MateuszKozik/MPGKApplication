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
import { tableStyles } from "../../../../consts/themeConsts";
import { getPersons } from "../../../../actions/personActions";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";

class Employees extends Component {
	componentDidMount() {
		this.props.getPersons();
	}

	continue = () => {
		this.props.nextStep();
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const { classes } = this.props;
		const personList = this.props.person.persons;

		const {
			values: { persons },
			handleChange,
			handleRemovePerson
		} = this.props;

		return (
			<Formik
				initialValues={{
					personId: ""
				}}
				onSubmit={this.continue}
			>
				{({ values }) => (
					<Form className={classes.form}>
						<Grid container spacing={2} justify="center">
							<Grid item xs={12} md={4} />
							<Grid item xs={12} md={4}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										{persons &&
											persons.map((person, index) => (
												<Chip
													key={index}
													label={person.name + " " + person.surname}
													className={classes.chip}
													onDelete={() => handleRemovePerson(index)}
												/>
											))}
									</Grid>
									<Grid item xs={12}>
										<FormControl
											className={classes.formControl}
											variant="outlined"
										>
											<InputLabel id="persons-label">Pracownicy</InputLabel>
											<Select
												labelId="person-label"
												id="persons"
												name="persons"
												multiple
												label="Pracownicy"
												value={persons}
												onChange={handleChange("persons")}
											>
												{personList &&
													personList.map((person, index) => {
														return (
															<MenuItem key={index} value={person}>
																{person.name + " " + person.surname}
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
											Dalej
										</Button>
									</Grid>
									<Grid item xs={3} />
								</Grid>
							</Grid>
							<Grid item xs={12} md={4} />
						</Grid>
					</Form>
				)}
			</Formik>
		);
	}
}

Employees.propTypes = {
	person: PropTypes.object.isRequired,
	getPersons: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPersons: () => {
			dispatch(getPersons());
		}
	};
};

const mapStateToProps = (state) => {
	return {
		person: state.person
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(Employees));
