import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField } from "formik-material-fields";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../../../consts/themeConsts";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Imię jest wymagane")
		.max(35, "Wprowadź któtsze imię"),
	surname: Yup.string()
		.required("Nazwisko jest wymagane")
		.max(35, "Wprowadź krótsze nazwisko")
});

export class Person extends Component {
	continue = () => {
		this.props.nextStep();
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		const { classes } = this.props;
		const {
			values: { name, surname },
			handleChange
		} = this.props;
		return (
			<Formik
				initialValues={{
					name: name || "",
					surname: surname || ""
				}}
				validationSchema={validationSchema}
				onSubmit={this.continue}
			>
				{({ values }) => (
					<Form className={classes.form}>
						<Grid container spacing={2} justify="center">
							<Grid item xs={12}>
								<FormikTextField
									className={classes.formControl}
									id="name"
									name="name"
									label="Imię"
									variant="outlined"
									required
									onChange={handleChange("name")}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormikTextField
									className={classes.formControl}
									id="surname"
									name="surname"
									label="Nazwisko"
									variant="outlined"
									required
									onChange={handleChange("surname")}
								/>
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

export default withStyles(tableStyles)(Person);
