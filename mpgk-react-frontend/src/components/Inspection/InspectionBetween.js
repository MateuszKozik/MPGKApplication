import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getConnectionAndStartTimeBetween,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import {getConnections} from "../../actions/connectionActions";
import {getDevices} from "../../actions/deviceActions";
import { getPersons } from "../../actions/personActions";
import PropTypes from "prop-types";
import FormatDate from "../Common/FormatDate";
import { Link } from "react-router-dom";
import { tableStyles } from "../../consts/themeConsts";
import {
	withStyles,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Button,
	TextField,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel
} from "@material-ui/core";




class InspectionBetween extends Component {
	
	
	state = {
		connectionId: "",
		Id: "",
		deviceId: "",
		startTime: "",
		endTime: "",
		show: false,
		typeName: ""
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}
	componentDidMount() {
		this.props.getConnections();
		this.props.getDevices();
		this.props.getPersons();
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}

	
	
	handleClick = () => {
		this.props.getConnectionAndStartTimeBetween(this.state.Id,this.state.startTime,this.state.endTime, this.state.typeName, this.props.history);
		this.setState({show: true});
	  };
	

	render() {
		const { classes } = this.props;
		const { inspectionsList } = this.props.inspection;
		const{ connections} = this.props.connection;
		const { devices } = this.props.device;
		const { persons } = this.props.person;

		

		return (
<>
	<Grid container className={classes.container} >	
		
		<Grid item xs={false} md={2} />
		<Grid item xs={12} md={8} >
			
		{this.state.typeName === "przeglad" ?	
		<FormControl
			required
			variant="outlined"
			className={classes.formControl}
		>
		
			<InputLabel >
				Rodzja przeglądu
			</InputLabel>
			<Select	
				name="Id"
				value={this.state.Id}
				onChange={this.onChange}
				label="Rodzja przeglądu"
			>
				<MenuItem value="">
					<em>Wybierz przegląd</em>
				</MenuItem>
				{connections.map((connection,index) => (
					<MenuItem key={index} value={connection.connectionId}>
						{connection.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
		:this.state.typeName === "urzadzenie" ?
		<FormControl
			required
			variant="outlined"
			className={classes.formControl}
		>
		
			<InputLabel >
				Urządzenie
			</InputLabel>
			<Select
				name="Id"
				value={this.state.Id}
				onChange={this.onChange}
				label="Rodzja urządzenia"
			>
				<MenuItem value="">
					<em>Wybierz urządzenie</em>
				</MenuItem>
				{devices.map((device,index) => (
					<MenuItem key={index} value={device.deviceId}>
						{device.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
		:this.state.typeName === "pracownik" ?
		<FormControl
			required
			variant="outlined"
			className={classes.formControl}
		>
		
			<InputLabel >
				Pracownik
			</InputLabel>
			<Select
				name="Id"
				value={this.state.Id}
				onChange={this.onChange}
				label="Pracownik"
			>
				<MenuItem value="">
					<em>Wybierz pracownika</em>
				</MenuItem>
				{persons.map((person,index) => (
					<MenuItem key={index} value={person.personId}>
						{person.name+" "+ person.surname}
					</MenuItem>
				))}
			</Select>
		</FormControl>
		:null}
		<TextField
			id="startTime"
			label="Czas rozpoczęcia"
			type="datetime-local"
			variant="outlined"
			name="startTime"
			value={this.state.startTime}
			onChange={this.onChange}
			className={classes.textField}
			InputLabelProps={{
			shrink: true,
			}}
		/>
		<TextField
			id="endTime"
			label="Czas rozpoczęcia"
			type="datetime-local"
			variant="outlined"
			name="endTime"
			value={this.state.endTime}
			onChange={this.onChange}
			className={classes.textField}
			InputLabelProps={{
			shrink: true,
			}}
		/>
		<Button className="mt-2 ml-2"  onClick={this.handleClick} color="primary" variant="contained" >
		Szukaj
		</Button>
					
		</Grid>
		<Grid item xs={false} md={3} />
		<Grid item xs={false} md={1} />
		<Grid item xs={12} md={8} >
		<FormControl component="fieldset">
     
	 <RadioGroup row>
	   <FormControlLabel
		 value="przeglad"
		 onChange={() => this.setState({ typeName: "przeglad" })}
		 control={<Radio color="primary" />}
		 label="Rodzja pzreglądu"
		 labelPlacement="start"
	   />
	   <FormControlLabel
		 value="urzadzenie"
		 onChange={() => this.setState({ typeName: "urzadzenie" })}
		 control={<Radio color="primary" />}
		 label="Urządzenie"
		 labelPlacement="start"
	   />
	   <FormControlLabel
		 onChange={() => this.setState({ typeName: "pracownik" })}
		 value="pracownik"
		 control={<Radio color="primary" />}
		 label="Pracownik"
		 labelPlacement="start"
	   />
	   
	 </RadioGroup>
   </FormControl>
		</Grid>
		<Grid item xs={false} md={2} />
		<Grid item xs={false} md={2} />
		<Grid item xs={12} md={9} >
		{inspectionsList[0] ? (
			<div className="row mt-3">
				<div className="col-md-4 ">
					<p>
						<b>Nazwa przegłądu</b>
					</p>
				</div>
				<div className="col-md-4 ">
					<p>
						<b>Data</b>
					</p>
				</div>
				<div className="col-md-4">
					<p>
						<b>Status</b>
					</p>
				</div>
			</div>
			):null}
		</Grid>
		
		<Grid item xs={false} md={2} />
		<Grid item xs={12} md={9}>
			{inspectionsList.map((inspection,i) => (
				<div key={i} className="row mt-3">				
					<div className="col-md-4">
					
						<Link
							to={`/inspections/list/${inspection.connection.connectionId}/${inspection.startTime}/to/${inspection.endTime}/show`}
						>
							{inspection.connection.name}
						</Link>
					</div>
					<div className="col-md-4">
						Od <FormatDate date={inspection.startTime} /> Do
						<FormatDate date={inspection.endTime} />
					</div>
					<div className="col-md-4">
						<p>{inspection.inspectionStatus} </p>
					</div>
				</div>			
			))}
		</Grid>
		<Grid item xs={false} md={2} />
	</Grid>
</>		
		);
	}
}

InspectionBetween.propTypes = {
	inspection: PropTypes.object.isRequired,
	connection: PropTypes.object.isRequired,
	device: PropTypes.object.isRequired,
	person: PropTypes.object.isRequired,
	getConnectionAndStartTimeBetween: PropTypes.func.isRequired,
	getConnections: PropTypes.func.isRequired,
	getDevices: PropTypes.func.isRequired,
	getPersons: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection,
	connection: state.connection,
	device: state.device,
	person: state.person
});

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => {
			dispatch(getConnections());
		},
		getDevices: () => {
			dispatch(getDevices());
		},
		getPersons: () => {
			dispatch(getPersons());
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		},
		getConnectionAndStartTimeBetween: (connectionId,startTime,endTime,typeName,history) => {
			dispatch(getConnectionAndStartTimeBetween(connectionId,startTime,endTime,typeName,history));
		},
		
	};
};

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(tableStyles)(InspectionBetween));

