import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextField, FormikSwitchField } from "formik-material-fields";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../../../consts/themeConsts";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Nazwa przeglądu jest wymagana")
		.max(70, "Wprowadź któtszą nazwę")
});

class Connection extends Component {
	continue = () => {
		this.props.nextStep();
	};

	render() {
		const { classes } = this.props;
		const {
			values: { status, name },
			handleChange,
			handleSwitchChange
		} = this.props;
		return (
			<Formik
				initialValues={{
					name: name || "",
					status: status === "" ? false : status
				}}
				validationSchema={validationSchema}
				onSubmit={this.continue}
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
											id="name"
											name="name"
											label="Nazwa przeglądu"
											variant="outlined"
											required
											onChange={handleChange("name")}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormikSwitchField
											label="Status przeglądu"
											id="status"
											name="status"
											onChange={handleSwitchChange("status")}
											trueValue={true}
											falseValue={false}
											controlLabel={
												values.status === true
													? "Aktywny"
													: values.status === false && "Niektywny"
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

export default withStyles(tableStyles)(Connection);
