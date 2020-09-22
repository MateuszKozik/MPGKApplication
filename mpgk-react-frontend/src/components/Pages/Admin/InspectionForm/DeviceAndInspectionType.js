import React, { Component } from "react";
import {
	withStyles,
	Select,
	InputAdornment,
	IconButton,
	Popover,
	Paper,
	Typography
} from "@material-ui/core";
import { styles } from "../../../../consts/themeConsts";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDevices } from "../../../../actions/deviceActions";
import { getInspectionTypes } from "../../../../actions/inspectionTypeActions";
import { Formik, Form } from "formik";
import {
	Button,
	Grid,
	FormControl,
	InputLabel,
	MenuItem
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

class DeviceAndInpectionType extends Component {
	state = {
		anchorEl: null
	};

	componentDidMount() {
		this.props.getDevices();
		this.props.getInspectionTypes();
	}

	continue = () => {
		this.props.nextStep();
	};

	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};

	handlePopoverClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handlePopoverClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const open = Boolean(this.state.anchorEl);
		const id = open ? "list-popover" : undefined;

		const { classes } = this.props;
		const { devices } = this.props.device;
		const { inspectionTypes } = this.props.inspectionType;
		const {
			values: { device, inspectionType },
			handleChange
		} = this.props;

		return (
			<Formik
				initialValues={{
					deviceId: "",
					inspectionTypeId: ""
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
										<FormControl
											required
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel id="device-label">Urządzenie</InputLabel>
											<Select
												labelId="device-label"
												id="device"
												name="device"
												value={device}
												onChange={handleChange("device")}
												label="Urządzenie"
											>
												<MenuItem value={device}>{device.name}</MenuItem>
												{devices &&
													devices.map((deviceItem) => (
														<MenuItem
															key={deviceItem.deviceId}
															value={deviceItem}
														>
															{deviceItem.name}
														</MenuItem>
													))}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={12}></Grid>
									<Grid item xs={12}>
										<FormControl
											required
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel id="inspection-type-label">
												Rodzaj przeglądu
											</InputLabel>
											<Select
												labelId="inspection-type-label"
												id="inspectionType"
												name="inspectionType"
												value={inspectionType}
												onChange={handleChange("inspectionType")}
												label="Rodzaj przeglądu"
												endAdornment={
													<InputAdornment position="start">
														<IconButton
															onClick={(e) => this.handlePopoverClick(e)}
															aria-describedby={id}
														>
															<InfoIcon />
														</IconButton>
													</InputAdornment>
												}
											>
												<MenuItem value={inspectionType}>
													{inspectionType.name}
												</MenuItem>
												{inspectionTypes &&
													inspectionTypes.map((inspectionTypeItem) => (
														<MenuItem
															key={inspectionTypeItem.typeId}
															value={inspectionTypeItem}
														>
															{inspectionTypeItem.name}
														</MenuItem>
													))}
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
						<Popover
							id={id}
							open={open}
							anchorEl={this.state.anchorEl}
							onClose={this.handlePopoverClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center"
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "center"
							}}
						>
							<Paper className={classes.popover}>
								<Typography>
									<b>Codziennie - </b>
									Od 00:01 do 23:59 każdego dnia
								</Typography>
								<Typography>
									<b>Raz w tygodniu - </b>
									Od poniedziałek 00:01 do niedziela 23:59
								</Typography>
								<Typography>
									<b>Codziennie na dziennej zmianie - </b>
									Od 06:00 do 18:00 każdego dnia
								</Typography>
								<Typography>
									<b>Raz na dwa miesiące - </b>
									Co drugi miesiąc (styczeń, marzec, maj, lipiec, wrzesień,
									listopad) od 1 dzień miesiąca 00:01 do ostatni dzień miesiąca
									23:59
								</Typography>
								<Typography>
									<b>Raz w roku - </b>
									System wyświetli przegląd trzy miesiące przed upływem jednego
									roku do daty wykonania poprzedniego przeglądu rocznego
								</Typography>
								<Typography>
									<b>Na żądanie - </b>
									Przegląd zawsze widoczny w oknie głównym, ale aktywowany tylko
									na żądanie operatora. Aktywny prez 2 miesiące od rozpoczęcia
								</Typography>
							</Paper>
						</Popover>
					</Form>
				)}
			</Formik>
		);
	}
}

DeviceAndInpectionType.propTypes = {
	device: PropTypes.object.isRequired,
	inspectionType: PropTypes.object.isRequired,
	getDevices: PropTypes.func.isRequired,
	getInspectionTypes: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDevices: () => {
			dispatch(getDevices());
		},
		getInspectionTypes: () => {
			dispatch(getInspectionTypes());
		}
	};
};

const mapStateToProps = (state) => {
	return {
		device: state.device,
		inspectionType: state.inspectionType
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(DeviceAndInpectionType));
