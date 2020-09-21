import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField, FormikSwitchField } from "formik-material-fields";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../../../consts/themeConsts";

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.required("Nazwa użytkownika jest wymagana")
		.max(35, "Wprowadź któtszą nazwę użytkownika"),
	password: Yup.string()
		.required("Hasło jest wymagane")
		.min(6, "Hasło musi składać się z minimum 6 znaków")
		.max(60, "Wprowadź krótsze hasło"),
	confirmPassword: Yup.string().required("Potwierdzenie hasła jest wymagane")
});

export class User extends Component {
	state = { error: {} };
	continue = (values) => {
		const { password, confirmPassword } = values;
		if (password === confirmPassword) {
			this.props.nextStep();
		} else {
			this.setState({ error: { confirmPassword: "Hasła muszą się zgadzać" } });
		}
	};

	render() {
		const { classes } = this.props;
		const {
			values: { username, password, confirmPassword, enabled },
			handleChange,
			handleSwitchChange
		} = this.props;
		return (
			<Formik
				initialValues={{
					username: username || "",
					password: password || "",
					confirmPassword: confirmPassword || "",
					enabled: enabled === "" ? false : enabled
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => this.continue(values)}
			>
				{({ values }) => (
					<Form className={classes.form}>
						<Grid container spacing={2} justify="center">
							<Grid item xs={12} md={4} />
							<Grid item xs={12} md={4}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<FormikTextField
											className={classes.formControl}
											id="username"
											name="username"
											label="Nazwa użytkownika"
											variant="outlined"
											required
											onChange={handleChange("username")}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikTextField
											className={classes.formControl}
											id="password"
											name="password"
											label="Hasło"
											type="password"
											variant="outlined"
											required
											onChange={handleChange("password")}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikTextField
											className={classes.formControl}
											helperText={this.state.error.confirmPassword}
											id="confirmPassword"
											name="confirmPassword"
											label="Powtórz hasło"
											type="password"
											variant="outlined"
											required
											onChange={handleChange("confirmPassword")}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikSwitchField
											label="Status konta"
											id="enabled"
											name="enabled"
											onChange={handleSwitchChange("enabled")}
											trueValue={true}
											falseValue={false}
											controlLabel={
												values.enabled === true
													? "Aktywne"
													: values.enabled === false && "Niektywne"
											}
										/>
									</Grid>
									<Grid item xs={12}>
										<Button type="submit" color="primary">
											Dalej
										</Button>
									</Grid>
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

export default withStyles(tableStyles)(User);
