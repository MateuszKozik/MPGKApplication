import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Button,
	Grid,
	TextField,
	withStyles,
	Select,
	InputLabel,
	FormControl,
	MenuItem,
	Typography,
	Popover,
	InputAdornment,
	IconButton,
	Paper
} from "@material-ui/core";
import { tableStyles } from "../../../consts/themeConsts";
import InfoIcon from "@material-ui/icons/Info";
import { Form, Formik } from "formik";
import { addConnection } from "../../../actions/connectionActions";
import { setSnackbar } from "../../../reducers/snackbarReducer";

class ActivityGroup extends Component {
	state = {
		anchorEl: null
	};

	handleSaveInspection = () => {
		const { values } = this.props;
		const newInspection = {
			name: values.name,
			status: values.status,
			device: values.device,
			inspectionType: values.inspectionType,
			persons: values.persons,
			activitiesGroups: values.activitiesGroups
		};

		this.props.addConnection(newInspection).then((res) => {
			if (res) {
				this.props.setSnackbar(true, "Przegląd dodany!");
				this.props.handleHistoryPush();
			} else {
				this.props.setSnackbar(true, "Wystąpił błąd!");
			}
		});
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
		const {
			values: { activitiesGroups },
			handleActivityGroupChange,
			handleActivityChange,
			handleRemoveActivityGroupClick,
			handleRemoveActivityClick,
			handleAddActivityGroupClick,
			handleAddActivityClick
		} = this.props;

		return (
			<Formik
				initialValues={{
					activityGroupId: ""
				}}
				onSubmit={this.handleSaveInspection}
			>
				{({ values }) => (
					<Form className={classes.form}>
						{activitiesGroups.map((x, i) => {
							return (
								<Grid key={i} container spacing={2} justify="center">
									<Grid item xs={12}>
										<TextField
											name="name"
											label="Nazwa kategorii"
											variant="outlined"
											value={x.name}
											required
											onChange={(e) => handleActivityGroupChange(e, i)}
										/>
									</Grid>
									{x.activities.map((y, index) => {
										return (
											<Grid
												container
												spacing={1}
												key={index}
												style={{ marginTop: 5 }}
											>
												<Grid item xs={12} md={2}>
													<TextField
														fullWidth
														name="name"
														label="Nazwa czynności"
														value={y.name}
														variant="outlined"
														required
														onChange={(e) => handleActivityChange(e, i, index)}
													/>
												</Grid>
												<Grid item xs={12} md={2}>
													<FormControl fullWidth required variant="outlined">
														<InputLabel id="type-label">Rodzaj pola</InputLabel>
														<Select
															labelId="type-label"
															id="type"
															name="type"
															value={y.type}
															onChange={(e) =>
																handleActivityChange(e, i, index)
															}
															label="Urządzenie"
														>
															<MenuItem value="Zaznaczenie">
																Zaznaczenie
															</MenuItem>
															<MenuItem value="Pole tekstowe">
																Pole tekstowe
															</MenuItem>
															<MenuItem value="Zakres liczb">
																Pole numeryczne
															</MenuItem>
															<MenuItem value="Pole wyboru">
																Pole wyboru <em> (tak/nie)</em>
															</MenuItem>
															<MenuItem value="Lista">Lista</MenuItem>
														</Select>
													</FormControl>
												</Grid>
												<Grid item xs={12} md={2}>
													<TextField
														fullWidth
														name="listItems"
														label="Elementy listy"
														value={y.listItems}
														variant="outlined"
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		onClick={(e) => this.handlePopoverClick(e)}
																		aria-describedby={id}
																	>
																		<InfoIcon />
																	</IconButton>
																</InputAdornment>
															)
														}}
														onChange={(e) => handleActivityChange(e, i, index)}
													/>
												</Grid>
												<Grid item xs={12} md={2}>
													<TextField
														fullWidth
														name="emsr"
														label="EMSR"
														value={y.emsr}
														variant="outlined"
														onChange={(e) => handleActivityChange(e, i, index)}
													/>
												</Grid>
												<Grid item xs={12} md={2}>
													<TextField
														fullWidth
														name="setting"
														label="Nastawa"
														value={y.setting}
														variant="outlined"
														onChange={(e) => handleActivityChange(e, i, index)}
													/>
												</Grid>

												<Grid
													item
													xs={12}
													md={2}
													style={{ display: "flex", justifyContent: "center" }}
												>
													<Button
														onClick={() => handleRemoveActivityClick(i, index)}
													>
														Usuń
													</Button>
													{x.activities.length === index + 1 && (
														<Button
															onClick={() => handleAddActivityClick(i, index)}
														>
															Dodaj
														</Button>
													)}
												</Grid>
											</Grid>
										);
									})}

									<Grid
										item
										xs={12}
										style={{ display: "flex", justifyContent: "center" }}
									>
										{activitiesGroups.length !== 1 && (
											<Button
												color="primary"
												onClick={() => handleRemoveActivityGroupClick(i)}
											>
												Usuń kategorię
											</Button>
										)}
										{activitiesGroups.length - 1 === i && (
											<Button
												color="primary"
												onClick={handleAddActivityGroupClick}
											>
												Dodaj kategorię
											</Button>
										)}
									</Grid>
									<Grid item xs={12}></Grid>
								</Grid>
							);
						})}
						<Grid container spacing={2} justify="center">
							<Grid item xs={3} />
							<Grid item xs={3}>
								<Button onClick={this.back}>Wróć</Button>
							</Grid>
							<Grid item xs={3}>
								<Button type="submit" color="primary">
									Zapisz
								</Button>
							</Grid>
							<Grid item xs={3} />
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
									W przypadku, gdy jako rodzaj pola wybrano "Lista", należy
									wprowadzić tutaj elementy listy oddzielone przecinkiem.
								</Typography>
								<Typography>Przykład: Jeden,dwa,trzy</Typography>
							</Paper>
						</Popover>
					</Form>
				)}
			</Formik>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		addConnection(connection) {
			return dispatch(addConnection(connection)).then((res) => {
				if (res && res.status === 201) return res;
			});
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withStyles(tableStyles)(ActivityGroup));
