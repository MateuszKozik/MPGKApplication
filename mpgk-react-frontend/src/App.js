import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import DeviceList from "./components/Pages/Admin/DeviceList";
import { Provider } from "react-redux";
import store from "./store";
import FluidList from "./components/Pages/Admin/FluidList";
import PersonList from "./components/Pages/Admin/PersonList";
import ActivityGroupList from "./components/Pages/Admin/ActivityGroupList";
import ActivityList from "./components/Pages/Admin/ActivityList";
import InspectionList from "./components/Pages/SearchInspection/InspectionList";
import InspectionBetween from "./components/Pages/SearchInspection/InspectionBetween";
import ConnectionList from "./components/Pages/Admin/ConnectionList";
import FluidRegistryList from "./components/Pages/Admin/FluidRegistryList";
import FluidPlaceList from "./components/Pages/Admin/FluidPlaceList";
import Home from "./components/Pages/Home";
import FluidRegistry from "./components/Pages/FluidRegistry";
import PerformersList from "./components/Pages/PerformersList";
import Inspection from "./components/Pages/Inspection";
import NitrogenList from "./components/Pages/NitrogenList";
import InspectionActivities from "./components/Pages/InspectionActivities";
import InspectionPage from "./components/Pages/InspectionPage";
import OverdueInspection from "./components/Pages/OverdueInspection";
import Snackbar from "./components/Common/Snackbar";
import FormInspectionWrapper from "./components/Pages/Admin/InspectionForm/FormInspectionWrapper";
import Login from "./components/Pages/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import SecuredAdminRoute from "./securityUtils/SecuredAdminRoute";

const jwtToken = localStorage.getItem("jwtToken");

if (jwtToken) {
	setJWTToken(jwtToken);
	const decoded_jwtToken = jwt_decode(jwtToken);
	store.dispatch({
		type: SET_CURRENT_USER,
		payload: decoded_jwtToken
	});

	const currentTime = Date.now() / 1000;

	if (decoded_jwtToken.exp < currentTime) {
		store.dispatch(logout());
		window.location.href = "/login";
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Snackbar />
					<Header />

					{
						//Public Routes
					}

					<Route exact path="/login" component={Login} />

					{
						//Private Routes
					}
					<Switch>
						<SecuredRoute exact path="/" component={Home} />
						<SecuredRoute
							exact
							path="/inspections"
							component={InspectionBetween}
						/>
						<SecuredRoute
							exact
							path="/new-fluid-registry"
							component={FluidRegistry}
						/>
						<SecuredRoute
							exact
							path="/performers-list"
							component={PerformersList}
						/>
						<SecuredRoute
							exact
							path="/nitrogen-list"
							component={NitrogenList}
						/>
						<SecuredRoute
							exact
							path="/inspections/list/:connectionId"
							component={InspectionPage}
						/>
						<SecuredRoute
							exact
							path="/inspections/list/:connectionId/execute"
							component={Inspection}
						/>
						<SecuredRoute
							exact
							path="/inspections/list/:connectionId/activity"
							component={InspectionActivities}
						/>
						<SecuredRoute
							exact
							path="/inspections/list/:connectionId/overdue/:endtime"
							component={OverdueInspection}
						/>
						<SecuredRoute
							exact
							path="/inspections/list/:connectionId/:startTime/to/:endTime/show"
							component={InspectionList}
						/>
					</Switch>

					{
						//Private admin Routes
					}
					<Switch>
						<SecuredAdminRoute exact path="/devices" component={DeviceList} />
						<SecuredAdminRoute exact path="/fluids" component={FluidList} />
						<SecuredAdminRoute exact path="/persons" component={PersonList} />
						<SecuredAdminRoute
							exact
							path="/groups"
							component={ActivityGroupList}
						/>
						<SecuredAdminRoute
							exact
							path="/activities"
							component={ActivityList}
						/>
						<SecuredAdminRoute
							exact
							path="/connections"
							component={ConnectionList}
						/>
						<SecuredAdminRoute
							exact
							path="/fluid-registries"
							component={FluidRegistryList}
						/>
						<SecuredAdminRoute
							exact
							path="/fluid-places"
							component={FluidPlaceList}
						/>
						<SecuredAdminRoute
							exact
							path="/inspections/create"
							component={FormInspectionWrapper}
						/>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
