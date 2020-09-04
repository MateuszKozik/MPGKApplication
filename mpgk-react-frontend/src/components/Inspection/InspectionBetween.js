import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getConnectionAndStartTimeBetween,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import {getConnections} from "../../actions/connectionActions";
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
	Grid
} from "@material-ui/core";

class InspectionBetween extends Component {
	
	
	state = {
		connectionId: "",
		startTime: "",
		endTime: "",
		show: false
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}
	componentDidMount() {
		this.props.getConnections();
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}

	
	
	handleClick = () => {
		this.props.getConnectionAndStartTimeBetween(this.state.connectionId,this.state.startTime,this.state.endTime, this.props.history);
		this.setState({show: true});
	  };
	

	render() {
		const { classes } = this.props;
		const { inspectionsList } = this.props.inspection;
		const{ connections} = this.props.connection;
		

		return (
<>
	<Grid container className={classes.container} >	
		<Grid item xs={false} md={2} />
		<Grid item xs={12} md={8} >
		<FormControl
			required
			variant="outlined"
			className={classes.formControl}
		>
			<InputLabel id="connectionId">
				Miejsce dodania
			</InputLabel>
			<Select
				labelId="connectionId"
				id="connectionId"
				name="connectionId"
				value={this.state.connectionId}
				onChange={this.onChange}
				label="Miejsce dodania"
			>
				<MenuItem value="">
					<em>Wybierz przegląd</em>
				</MenuItem>
				{connections.map((connection) => (
					<MenuItem key={connection.connectionId} value={connection.connectionId}>
						{connection.name}
					</MenuItem>
				))}
			</Select>
			
		</FormControl>
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

		<Button className="mt-2" /*onClick={() =>
			this.props.getConnectionAndStartTimeBetween(
				this.state.connectionId,this.state.startTime,this.state.endTime, this.props.history
			)
		}*/ onClick={this.handleClick} color="primary" variant="contained" >
		Szukaj
		</Button>
					
		</Grid>
		<Grid item xs={false} md={2} />
		<Grid item xs={false} md={2} />
		<Grid item xs={12} md={9} >
		{this.state.show === true ? (
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
			{console.log(this.state.show)}
		</Grid>
		
		<Grid item xs={false} md={2} />
		<Grid item xs={12} md={9}>
			{inspectionsList.map((inspection,i) => (
				<div key={i} className="row mt-3">				
					<div className="col-md-4">
					
						<Link
							to={`/inspections/list/${inspection.connection.connectionId}/connection/${inspection.startTime}/to/${inspection.endTime}`}
							//to={`/inspections/list/${inspection.connection.connectionId}/overdue/${inspection.endTime}`}
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
	getConnectionAndStartTimeBetween: PropTypes.func.isRequired,
	getConnections: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection,
	connection: state.connection
});

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => {
			dispatch(getConnections());
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		},
		getConnectionAndStartTimeBetween: (connectionId,startTime,endTime) => {
			dispatch(getConnectionAndStartTimeBetween(connectionId,startTime,endTime));
		},
		
	};
};

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(tableStyles)(InspectionBetween));

