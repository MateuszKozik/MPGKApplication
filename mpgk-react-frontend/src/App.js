import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import DeviceList from "./components/Pages/Admin/DeviceList";
import { Provider } from "react-redux";
import store from "./store";
import FluidList from "./components/Pages/Admin/FluidList";
import PersonList from "./components/Pages/Admin/PersonList";
import ActivityGroupList from "./components/Pages/Admin/ActivityGroupList";
import ActivityList from "./components/Pages/Admin/ActivityList";
import InspectionList from "./components/Inspection/InspectionList";
import InspectionBetween from "./components/Inspection/InspectionBetween";
import ConnectionList from "./components/Pages/Admin/ConnectionList";
import FluidRegistryList from "./components/FluidRegistry/FluidRegistryList";
import FluidPlaceList from "./components/FluidPlace/FluidPlaceList";
import Home from "./components/Pages/Home";
import FluidRegistry from "./components/Pages/FluidRegistry";
import PerformersList from "./components/Pages/PerformersList";
import Inspection from "./components/Pages/Inspection";
import NitrogenList from "./components/Pages/NitrogenList";
import InspectionActivities from "./components/Pages/InspectionActivities";
import InspectionPage from "./components/Pages/InspectionPage";
import OverdueInspection from "./components/Pages/OverdueInspection";
import Snackbar from "./components/Common/Snackbar";
import FormInspectionWrapper from "./components/Inspection/MultiStepForm/FormInspectionWrapper";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Snackbar />
					<Header />
					<Route exact path="/" component={Home} />
					<Route exact path="/devices" component={DeviceList} />
					<Route exact path="/fluids" component={FluidList} />
					<Route exact path="/persons" component={PersonList} />
					<Route exact path="/groups" component={ActivityGroupList} />
					<Route exact path="/activities" component={ActivityList} />
					<Route exact path="/inspections" component={InspectionBetween} />

					<Route exact path="/connections" component={ConnectionList} />
					<Route exact path="/fluid-registries" component={FluidRegistryList} />
					<Route exact path="/fluid-places" component={FluidPlaceList} />
					<Route exact path="/new-fluid-registry" component={FluidRegistry} />
					<Route exact path="/performers-list" component={PerformersList} />
					<Route exact path="/nitrogen-list" component={NitrogenList} />

					<Route
						exact
						path="/inspections/list/:connectionId"
						component={InspectionPage}
					/>
					<Route
						exact
						path="/inspections/list/:connectionId/execute"
						component={Inspection}
					/>
					<Route
						exact
						path="/inspections/list/:connectionId/activity"
						component={InspectionActivities}
					/>
					<Route
						exact
						path="/inspections/list/:connectionId/overdue/:endtime"
						component={OverdueInspection}
					/>
					<Route
						exact
						path="/inspections/list/:connectionId/:startTime/to/:endTime/show"
						component={InspectionList}
					/>
					<Route
						exact
						path="/inspections/create"
						component={FormInspectionWrapper}
					/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
