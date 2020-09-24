import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getConnections,
	clearConnectionState
} from "../../actions/connectionActions";
import { withStyles } from "@material-ui/core";
import { styles } from "../../consts/themeConsts";
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
	InputAdornment
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

class PerformersList extends Component {
	state = {
		search: ""
	};
	componentDidMount() {
		this.props.getConnections();
	}

	componentWillUnmount() {
		this.props.clearConnectionState();
	}

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	render() {
		const { connections } = this.props.connection;
		const { classes } = this.props;
		const filtered =
			connections &&
			connections.filter((connection) => {
				return connection.name
					.toLowerCase()
					.includes(this.state.search.toLowerCase());
			});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							Lista wykonawców
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
											<Typography>Rodzaj przeglądu</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography align="center">Imię i nazwisko</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered &&
										filtered.map((connection, index) => {
											const { persons } = connection;
											return (
												<TableRow key={index}>
													<TableCell>
														<Typography>{connection.name}</Typography>
													</TableCell>
													<TableCell>
														{persons.map((person, i) => {
															return (
																<Typography key={i} align="center">
																	{person && person.name + " " + person.surname}
																</Typography>
															);
														})}
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

PerformersList.propTypes = {
	connection: PropTypes.object.isRequired,
	getConnections: PropTypes.func.isRequired,
	clearConnectionState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	connection: state.connection
});

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => {
			dispatch(getConnections());
		},
		clearConnectionState: () => {
			dispatch(clearConnectionState());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(PerformersList));
