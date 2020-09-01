import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getGroups,
	updateGroup,
	clearGroupState
} from "../../actions/activityGroupActions";
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
		connection: {},
		search: "",
		errors: {}
	};

	componentDidMount() {
		this.props.getGroups();
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

	handleOpen = (activityGroup) => {
		const {groupId, name} = activityGroup;
		const {connection} = activityGroup;
		this.setState({
			dialogOpen: true,
			groupId: groupId,
			name: name,
			connection: connection && {...connection}
            
		});
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			groupId: "",
			name: "",
			connectionId: {}
		});
	};
	
	

	onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
			
				let updatedGroup = {
					groupId: this.state.groupId,
					name: values.name
				};
				
				if(this.state.connection !== null){
					updatedGroup = {
						...updatedGroup,
						connection: this.state.connection
					}
				}

				this.props.updateGroup(this.state.groupId, updatedGroup).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dane grupy czynności zaktualizowane!");
						this.handleClose();
					} else {
						this.props.setSnackbar(true, "Wystąpił błąd!");
					}
				});
			 
		}, 500);
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return { errors: nextProps.errors };
		} else {
			return null;
		}
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
							Kategorie czynności
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
									{filtered.map((activityGroup,index) => (
										<TableRow key={index}>
											<TableCell>
												<Typography>{activityGroup.name}</Typography>
											</TableCell>
											<TableCell>
												<Tooltip title="Edytuj">
													<IconButton
														color="primary"
														onClick={() =>
															this.handleOpen(activityGroup)
														}
													>
														<EditIcon />
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
