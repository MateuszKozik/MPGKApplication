import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getGroups,
	updateGroup,
	deleteGroup,
	clearGroupState
} from "../../actions/activityGroupActions";
import PropTypes from "prop-types";
import {
	Grid,
	Typography,
	IconButton,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Dialog,
	LinearProgress,
	TextField,
	InputAdornment,
	Tooltip
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../reducers/snackbarReducer";
import { tableStyles } from "./../../consts/themeConsts";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.required("Nazwa grupy jest wymagana")
		.max(100, "Wprowadź któtszą nazwę")
});

class ActivityGroupList extends Component {
	state = {
		dialogOpen: false,
		groupId: "",
		name: "",
		connectionId: "",
		actionType: "",
		search: "",
		errors: {}
	};

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearGroupState();
	}

	handleOpen = (groupId, name, connectionId, actionType = "edit") => {
		this.setState({
			dialogOpen: true,
            actionType: actionType,
			name: name,
			connectionId: connectionId,
            groupId: groupId
		});
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			name: "",
			connectionId: "",
			groupId: "",
			actionType: ""
		});
	};

	onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			if (this.state.actionType === "edit") {
				const updatedGroup = {
					groupId: this.state.groupId,
					name: values.name,
					connection: { connectionId: this.state.connectionId }
				};

				this.props.updateGroup(this.state.groupId, updatedGroup).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dane grupy czynności zaktualizowane!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
			} 
		}, 500);
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
	}

	componentDidMount() {
		this.props.getGroups();
	}

	render() {
		const { classes } = this.props;
		const { groups } = this.props.group;
		const { errors } = this.props;
		const filtered = groups.filter((group) => {
			return group.name.toLowerCase().includes(this.state.search.toLowerCase());
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h2" className={classes.title}>
							Grupy czynności
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
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered.map((group) => (
										<TableRow key={group.groupId}>
											<TableCell>
												<Typography>{group.name}</Typography>
											</TableCell>
											<TableCell>
												<Tooltip title="Edytuj">
													<IconButton
														color="primary"
														onClick={() =>
															this.handleOpen(group.groupId, group.name,group.connection.connectionId, "edit")
														}
													>
														<EditIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title="Usuń">
													<IconButton
														onClick={() =>
															this.props.deleteGroup(group.groupId)
														}
													>
														<DeleteIcon />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={false} md={2} />
				</Grid>

				<Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
					<Formik
						initialValues={{
							name: this.state.name
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) =>
							this.onSubmit(values, { setSubmitting })
						}
					>
						{({ isSubmitting }) => (
							<Form className={classes.form}>
								<Grid container spacing={2} justify="center">
									<Grid item xs={12}>
										<FormikTextField
											error={errors.name}
											id="name"
											name="name"
											label="Nazwa"
											variant="outlined"
											required
											helperText={errors.name}
											onChange={this.onChange}
										/>
									</Grid>
									<Grid item xs={3} />
									<Grid item xs={3}>
										<Button onClick={this.handleClose} color="primary">
											Anuluj
										</Button>
									</Grid>
									<Grid item xs={3}>
										<Button
											type="submit"
											color="primary"
											disabled={isSubmitting}
										>
											Zapisz
										</Button>
									</Grid>
									<Grid item xs={3} />
									<Grid item xs={12}>
										{isSubmitting && <LinearProgress />}
									</Grid>
								</Grid>
							</Form>
						)}
					</Formik>
				</Dialog>
				
			</>
		);
	}
}

ActivityGroupList.propTypes = {
	group: PropTypes.object.isRequired,
	getGroups: PropTypes.func.isRequired,
	updateGroup: PropTypes.func.isRequired,
	deleteGroup: PropTypes.func.isRequired,
	clearGroupState: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		group: state.group,
		errors: state.errors
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGroups: () => {
			dispatch(getGroups());
		},
		deleteGroup: (groupId) => {
			dispatch(deleteGroup(groupId));
		},
		clearGroupState: () => {
			dispatch(clearGroupState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updateGroup(groupId, updatedGroup) {
			return dispatch(updateGroup(groupId, updatedGroup)).then((res) => {
				if (res && res.status === 200) return res;
			});
		},
		
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(ActivityGroupList));
