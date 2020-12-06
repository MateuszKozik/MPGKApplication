import React, { Component } from "react";
import Connection from "./Connection";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import DeviceAndInspectionType from "./DeviceAndInspectionType";
import ActivityGroup from "./AcitvityGroup";
import Employees from "./Employees";
import { clearDeviceState } from "../../../../actions/deviceActions";
import { clearPersonState } from "../../../../actions/personActions";
import { clearInspectionTypeState } from "../../../../actions/inspectionTypeActions";
import { clearConnectionState } from "../../../../actions/connectionActions";
import { clearInspectionsListState } from "../../../../actions/inspectionActions";

const steps = [
	"Podaj nazwę oraz status przeglądu",
	"Wybierz rodzaj przeglądu i urządzenie",
	"Wybierz pracowników",
	"Dodaj kategorie oraz czynności"
];

class FormInspectionWrapper extends Component {
	state = {
		step: 0,
		name: "",
		status: false,
		device: "",
		inspectionType: "",
		persons: [],
		activitiesGroups: [
			{
				name: "",
				activities: [
					{
						name: "",
						type: "",
						emsr: "",
						setting: "",
						listItems: ""
					}
				]
			}
		]
	};

	// Clear state
	componentWillUnmount() {
		this.props.clearDeviceState();
		this.props.clearInspectionTypeState();
		this.props.clearPersonState();
		this.props.clearInspectionsListState();
		this.props.clearConnectionState();
	}

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

	// Handle activity group field change
	handleActivityGroupChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...this.state.activitiesGroups];
		list[index][name] = value;
		this.setState({ activitiesGroups: list });
	};

	// Handle activity fields change
	handleActivityChange = (e, i, index) => {
		const { name, value } = e.target;
		const list = [...this.state.activitiesGroups];
		list[i]["activities"][index][name] = value;
		this.setState({ activitiesGroups: list });
	};

	// Handle click event of the remove activity group button
	handleRemoveActivityGroupClick = (index) => {
		const list = [...this.state.activitiesGroups];
		list.splice(index, 1);
		this.setState({ activitiesGroups: list });
	};

	// Handle click event of the remove activity button
	handleRemoveActivityClick = (i, index) => {
		const list = [...this.state.activitiesGroups];
		const item = list[i]["activities"];
		item.splice(index, 1);
		list[i]["activities"] = item;

		this.setState({ activitiesGroups: list });
	};

	// Handle click event of the add activity group button
	handleAddActivityGroupClick = () => {
		this.setState({
			activitiesGroups: [
				...this.state.activitiesGroups,
				{
					name: "",
					activities: [
						{
							name: "",
							type: "",
							emsr: "",
							setting: "",
							listItems: ""
						}
					]
				}
			]
		});
	};

	// Handle click event of the add activity button
	handleAddActivityClick = (i, index) => {
		const list = [...this.state.activitiesGroups];

		list[i]["activities"][index + 1] = {
			name: "",
			type: "",
			emsr: "",
			setting: "",
			listItems: ""
		};

		this.setState({ activitiesGroups: list });
	};

	// Handle click event of the remove person button
	handleRemovePerson = (index) => {
		const persons = this.state.persons;
		persons.splice(index, 1);
		this.setState({
			persons: persons
		});
	};

	// Handle histroy push
	handleHistoryPush = () => {
		this.props.history.push("/connections");
	};

	// Get inspection items and set them to the state
	setInspectionItems = (items) => {
		let list = [];
		items.map((item, index) => {
			const { activityGroup, activities } = item;

			list[index] = {
				name: activityGroup.name,
				activities: []
			};
			activities.map((activity, i) => {
				const { name, type, emsr, setting, listItems } = activity;
				list[index]["activities"][i] = {
					name: name,
					type: type,
					emsr: emsr,
					setting: setting,
					listItems: listItems
				};
				return null;
			});
			return null;
		});
		this.setState({ activitiesGroups: list });
	};

	render() {
		const { step } = this.state;

		const {
			name,
			status,
			device,
			inspectionType,
			activitiesGroups,
			persons
		} = this.state;
		const values = {
			name,
			status,
			device,
			inspectionType,
			activitiesGroups,
			persons
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
						<Connection
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
						<DeviceAndInspectionType
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
						<Employees
							handleChange={this.handleChange}
							handleRemovePerson={this.handleRemovePerson}
							values={values}
							nextStep={this.nextStep}
							prevStep={this.prevStep}
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
						<ActivityGroup
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleActivityGroupChange={this.handleActivityGroupChange}
							handleActivityChange={this.handleActivityChange}
							handleRemoveActivityGroupClick={
								this.handleRemoveActivityGroupClick
							}
							handleRemoveActivityClick={this.handleRemoveActivityClick}
							handleAddActivityGroupClick={this.handleAddActivityGroupClick}
							handleAddActivityClick={this.handleAddActivityClick}
							handleHistoryPush={this.handleHistoryPush}
							setInspectionItems={this.setInspectionItems}
							values={values}
						/>
					</>
				);

			default:
				return <>{this.props.history.push("/")}</>;
		}
	}
}

FormInspectionWrapper.propTypes = {
	clearDeviceState: PropTypes.func.isRequired,
	clearInspectionTypeState: PropTypes.func.isRequired,
	clearPersonState: PropTypes.func.isRequired,
	clearConnectionState: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearDeviceState: () => {
			dispatch(clearDeviceState());
		},
		clearInspectionTypeState: () => {
			dispatch(clearInspectionTypeState());
		},
		clearPersonState: () => {
			dispatch(clearPersonState());
		},
		clearConnectionState: () => {
			dispatch(clearConnectionState());
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		}
	};
};

export default connect(null, mapDispatchToProps)(FormInspectionWrapper);
