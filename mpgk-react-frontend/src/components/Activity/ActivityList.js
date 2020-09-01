import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getActivities,
	updateActivity,
	clearActivityState
} from "../../actions/activityActions";
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
import { FormikTextField } from "formik-material-fields";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setSnackbar } from "../../reducers/snackbarReducer";
import { tableStyles } from "./../../consts/themeConsts";

const validationSchema = Yup.object().shape({
	name: Yup.string()
        .required("Nazwa czynności jest wymagana"),
    emsr: Yup.string()
        .max(100, "Wprowadź któtszy EMSR"),
    setting: Yup.string()
        .max(100, "Wprowadź któtszą nastawę")
		
});

class ActivityList extends Component {
	state = {
		dialogOpen: false,
		activityId: "",
        name: "",
        emsr: "",
        setting: "",
		type: "",
		listItems: "",
        activityGroup: {},
		search: "",
		errors: {}
	};

	componentDidMount() {
		this.props.getActivities();
	};

	updateSearch = (event) => {
		this.setState({ search: event.target.value });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
    };
    
 
	componentWillUnmount() {
		this.props.clearActivityState();
	}

	handleOpen = (activity) => {
		const {activityId, name, emsr, setting, type, listItems} = activity;
		const {activityGroup} = activity;
		this.setState({
			dialogOpen: true,
            activityId: activityId,
            name: name,
            emsr: emsr,
            setting: setting,
            type: type,
            listItems: listItems,
            activityGroup: activityGroup && {...activityGroup}
            
		});
	};

	handleClose = () => {
		this.setState({
			dialogOpen: false,
			activityId: "",
            name: "",
            emsr: "",
            setting: "",
            type: "",
            listItems: "",
            activityGroup: {}
			
			
		});
	};

	onSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false);
				let updatedActivity = {
					activityId: this.state.activityId,
                    name: values.name,
                    emsr: values.emsr,
                    setting: values.setting,
                    type: this.state.type,
                    listItems:this.state.listItems
				};
				
				if(this.state.activityGroup !== null){
					updatedActivity = {
						...updatedActivity,
						activityGroup: this.state.activityGroup
					}
				}
                
				this.props.updateActivity(this.state.activityId, updatedActivity).then((res) => {
					if (res) {
						this.props.setSnackbar(true, "Dane czynności zaktualizowane!");
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
		const { activities } = this.props.activity;
		const { errors } = this.props;
		const filtered = activities.filter((activity) => {
			const {activityGroup} = activity;
			if(!activityGroup){
				return activity.name.toLowerCase().includes(this.state.search.toLowerCase());
			}else{
				return activity.name.toLowerCase().includes(this.state.search.toLowerCase()) ||
				activityGroup.name.toLowerCase().includes(this.state.search.toLowerCase());
			}
				
		});

		return (
			<>
				<Grid container className={classes.container}>
					<Grid item xs={12}>
						<Typography variant="h2" className={classes.title}>
							Czynności
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
											<Typography>Kategoria czynności</Typography>
										</TableCell>
                                        <TableCell className={classes.head}>
											<Typography>EMSR</Typography>
										</TableCell>
                                        <TableCell className={classes.head}>
											<Typography>Nastawa</Typography>
										</TableCell>
										<TableCell className={classes.head}>
											<Typography>Akcje</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{filtered.map((activity,index) => {
										const {activityGroup} = activity;
										return(
											<TableRow key={index}>
												<TableCell>
													<Typography>{activity.name}</Typography>
												</TableCell>
												<TableCell>
													<Typography>{activityGroup && activityGroup.name}</Typography>
												</TableCell>
												<TableCell>
													<Typography>{activity.emsr}</Typography>
												</TableCell>
												<TableCell>
													<Typography>{activity.setting}</Typography>
												</TableCell>
												<TableCell>
													<Tooltip title="Edytuj">
														<IconButton
															color="primary"
															onClick={() => this.handleOpen(activity)}
														>
															<EditIcon />
														</IconButton>
													</Tooltip>
												
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

				<Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
					<Formik
						initialValues={{
                            name: this.state.name,
                            emsr: this.state.emsr,
                            setting: this.state.setting
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
                                    <Grid item xs={12}>
										<FormikTextField
											error={errors.emsr}
											id="emsr"
											name="emsr"
											label="EMSR"
											variant="outlined"
											helperText={errors.emsr}
											onChange={this.onChange}
										/>
									</Grid>
                                    <Grid item xs={12}>
										<FormikTextField
											error={errors.setting}
											id="setting"
											name="setting"
											label="Nastawa"
											variant="outlined"
											helperText={errors.setting}
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

ActivityList.propTypes = {
	activity: PropTypes.object.isRequired,
	getActivities: PropTypes.func.isRequired,
	updateActivity: PropTypes.func.isRequired,
	clearActivityState: PropTypes.func.isRequired,
	setSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		activity: state.activity,
		errors: state.errors
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getActivities: () => {
			dispatch(getActivities());
		},
		clearActivityState: () => {
			dispatch(clearActivityState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		updateActivity(activityId, updatedActivity) {
			return dispatch(updateActivity(activityId, updatedActivity)).then((res) => {
				if (res && res.status === 200) return res;
			});
		},
		
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(tableStyles)(ActivityList));
