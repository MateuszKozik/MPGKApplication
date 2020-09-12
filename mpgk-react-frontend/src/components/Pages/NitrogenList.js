import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getActionsByName,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import { withStyles } from "@material-ui/core";
import { tableStyles } from "../../consts/themeConsts";
import FormatDate from "../Common/FormatDate";
import PropTypes from "prop-types";
import {
	Grid,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	InputAdornment,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";





class NitrogenList extends Component {

    state = {
        search: ""
    }
	componentDidMount() {
		this.props.getActionsByName(this.props.history);
	}

	componentWillUnmount() {
		this.props.clearInspectionsListState();
    }
    
    updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	

	render() {
        
        const { inspections } = this.props.inspection;
        const { classes } = this.props;
		const filtered = inspections.filter((inspection) => {
            const {person} = inspection;
           
           if(person){
                return(
                    inspection.datetime.includes(this.state.search.toLowerCase()) ||
                    person.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                    person.surname.toLowerCase().includes(this.state.search.toLowerCase())
                );
           } else {
                return inspection.datetime.includes(this.state.search.toLowerCase());
           }
            
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
                            Rejestr wymiany butli z azotem w instalacji ORC
						</Typography>
					</Grid>
					<Grid item xs={false} md={2} />
					<Grid item xs={12} md={8} className={classes.search}>
						<TextField
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								)
							}}
							type="search"
							placeholder="Szukaj..."
							onChange={(e) => this.updateSearch(e)}
						/>
					</Grid>
					<Grid item xs={false} md={2} />
					<Grid item xs={false} md={2} />
					<Grid item xs={12} md={8}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className={classes.head}>
											<Typography>Nazwa</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Data i godzina</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Imię i nazwisko</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered && filtered.map((inspection,index) => {
                                        const{person} = inspection;
										return (
 
											<TableRow key={index}>
												<TableCell>
													<Typography>Wymiana butli</Typography>
												</TableCell>
												<TableCell>
                                                        <FormatDate date={inspection.datetime} datetime={true} />	
												</TableCell>
                                                <TableCell>
                                                    <Typography>{person && person.name + " " + person.surname}</Typography>	
												</TableCell>
											</TableRow>
                                            
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={2} />
				</Grid>

				
				
			</>
		);
	}
}

NitrogenList.propTypes = {
	inspection: PropTypes.object.isRequired,
	getActionsByName: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	inspection: state.inspection,
	errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
	return {
		getActionsByName: () => {
			dispatch(getActionsByName());
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		},
		
	};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(tableStyles)(NitrogenList));
