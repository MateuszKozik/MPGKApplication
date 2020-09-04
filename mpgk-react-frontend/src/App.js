import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import DeviceList from "./components/Device/DeviceList";
import { Provider } from "react-redux";
import store from "./store";
import FluidList from "./components/Fluid/FluidList";
import PersonList from "./components/Person/PersonList";
import ActivityGroupList from "./components/ActivityGroup/ActivityGroupList";
import ActivityList from "./components/Activity/ActivityList";
import InspectionList from "./components/Inspection/InspectionList";
import InspectionListt from "./components/Inspection/InspectionListt";
import InspectionBetween from "./components/Inspection/InspectionBetween";
import AddInspection from "./components/Inspection/AddInspection";
import UpdateInspection from "./components/Inspection/UpdateInspection";
import ConnectionList from "./components/Connection/ConnectionList";
import FluidRegistryList from "./components/FluidRegistry/FluidRegistryList";
import FluidPlaceList from "./components/FluidPlace/FluidPlaceList";
import Home from "./components/Pages/Home";
import FluidRegistry from "./components/Pages/FluidRegistry";
import PerformersList from "./components/Pages/PerformersList";
import Inspection from "./components/Pages/Inspection";
import AddWorkingFluid from "./components/Pages/AddWorkingFluid";
import NitrogenList from "./components/Pages/NitrogenList";
import InspectionActivities from "./components/Pages/InspectionActivities";
import InspectionPage from "./components/Pages/InspectionPage";
import OverdueInspection from "./components/Pages/OverdueInspection";
import Snackbar from "./components/Common/Snackbar";

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
					<Route exact path="/inspections/add" component={AddInspection} />
					<Route
						exact
						path="/inspections/update/:inspectionId"
						component={UpdateInspection}
					/>
					<Route exact path="/connections" component={ConnectionList} />
					<Route exact path="/fluid-registries" component={FluidRegistryList} />
					<Route exact path="/fluid-places" component={FluidPlaceList} />
					<Route exact path="/new-fluid-registry" component={FluidRegistry} />
					<Route
						exact
						path="/new-fluid-registry/add"
						component={AddWorkingFluid}
					/>
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
						path="/inspections/list/:connectionId/connection/:startTime/to/:endTime"
						component={InspectionListt}
					/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
