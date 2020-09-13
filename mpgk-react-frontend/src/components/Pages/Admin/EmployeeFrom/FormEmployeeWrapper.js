import { Step, StepLabel, Stepper } from "@material-ui/core";
import React, { Component } from "react";
import Inspections from "./Inspections";
import Person from "./Person";
import Roles from "./Roles";
import User from "./User";

const steps = [
	"Podaj dane użytkownika",
	"Wprowadź imię i nazwisko",
	"Dodaj uprawnienia",
	"Wybierz przeglądy pracownika"
];

export class FormEmployeeWrapper extends Component {
	state = {
		step: 0,
		username: "",
		password: "",
		confirmPassword: "",
		enabled: true,
		role: "3",
		name: "",
		surname: "",
		connections: []
	};

	// Proceed to next step
	nextStep = () => {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	};

	// Go back to prev step
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	};

	// Handle fields change
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	// Handle switch field change
	handleSwitchChange = (input) => (value) => {
		this.setState({ [input]: value });
	};

	handleRemoveConnection = (index) => {
		const connections = this.state.connections;
		connections.splice(index, 1);
		this.setState({
			connections: connections
		});
	};

	// Handle histroy push
	handleHistoryPush = () => {
		this.props.history.push("/persons");
	};

	render() {
		const { step } = this.state;

		const {
			username,
			password,
			confirmPassword,
			enabled,
			role,
			name,
			surname,
			connections
		} = this.state;
		const values = {
			username,
			password,
			confirmPassword,
			enabled,
			role,
			name,
			surname,
			connections
		};

		switch (step) {
			case 0:
				return (
					<>
						<Stepper activeStep={step} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<User
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							handleSwitchChange={this.handleSwitchChange}
							values={values}
						/>
					</>
				);

			case 1:
				return (
					<>
						<Stepper activeStep={step} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<Person
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</>
				);

			case 2:
				return (
					<>
						<Stepper activeStep={step} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<Roles
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/>
					</>
				);

			case 3:
				return (
					<>
						<Stepper activeStep={step} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<Inspections
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							handleRemoveConnection={this.handleRemoveConnection}
							handleHistoryPush={this.handleHistoryPush}
							values={values}
						/>
					</>
				);

			default:
				return <Person>{this.props.history.push("/")}</Person>;
		}
	}
}

export default FormEmployeeWrapper;
