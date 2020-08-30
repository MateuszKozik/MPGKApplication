import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import DeviceList from "./components/Device/DeviceList";
import AddDevice from "./components/Device/AddDevice";
import { Provider } from "react-redux";
import store from "./store";
import UpdateDevice from "./components/Device/UpdateDevice";
import FluidList from "./components/Fluid/FluidList";
import AddFluid from "./components/Fluid/AddFluid";
import UpdateFluid from "./components/Fluid/UpdateFluid";
import InspectionTypeList from "./components/InspectionType/InspectionTypeList";
import AddInspectionType from "./components/InspectionType/AddInspectionType";
import UpdateInspectionType from "./components/InspectionType/UpdateInspectionType";
import PersonList from "./components/Person/PersonList";
import AddPerson from "./components/Person/AddPerson";
import UpdatePerson from "./components/Person/UpdatePerson";
import ActivityGroupList from "./components/ActivityGroup/ActivityGroupList";
import AddActivityGroup from "./components/ActivityGroup/AddActivityGroup";
import UpdateActivityGroup from "./components/ActivityGroup/UpdateActivityGroup";
import ActivityList from "./components/Activity/ActivityList";
import AddActivity from "./components/Activity/AddActivity";
import UpdateActivity from "./components/Activity/UpdateActivity";
import InspectionList from "./components/Inspection/InspectionList";
import AddInspection from "./components/Inspection/AddInspection";
import UpdateInspection from "./components/Inspection/UpdateInspection";
import ConnectionList from "./components/Connection/ConnectionList";
import AddConnection from "./components/Connection/AddConnection";
import UpdateConnection from "./components/Connection/UpdateConnection";
import RoleList from "./components/Role/RoleList";
import AddRole from "./components/Role/AddRole";
import FluidRegistryList from "./components/FluidRegistry/FluidRegistryList";
import AddFluidRegistry from "./components/FluidRegistry/AddFluidRegistry";
import UpdateFluidRegistry from "./components/FluidRegistry/UpdateFluidRegistry";
import FluidPlaceList from "./components/FluidPlace/FluidPlaceList";
import AddFluidPlace from "./components/FluidPlace/AddFluidPlace";
import UpdateFluidPlace from "./components/FluidPlace/UpdateFluidPlace";
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
					<Route exact path="/devices/add" component={AddDevice} />
					<Route exact path="/devices/update/:id" component={UpdateDevice} />
					<Route exact path="/fluids" component={FluidList} />
					<Route exact path="/fluids/add" component={AddFluid} />
					<Route exact path="/fluids/update/:fluidId" component={UpdateFluid} />
					<Route
						exact
						path="/inspection-types"
						component={InspectionTypeList}
					/>
					<Route
						exact
						path="/inspection-types/add"
						component={AddInspectionType}
					/>
					<Route
						exact
						path="/inspection-types/update/:typeId"
						component={UpdateInspectionType}
					/>
					<Route exact path="/persons" component={PersonList} />
					<Route exact path="/persons/add" component={AddPerson} />
					<Route
						exact
						path="/persons/update/:personId"
						component={UpdatePerson}
					/>
					<Route exact path="/groups" component={ActivityGroupList} />
					<Route exact path="/groups/add" component={AddActivityGroup} />
					<Route
						exact
						path="/groups/update/:groupId"
						component={UpdateActivityGroup}
					/>
					<Route exact path="/activities" component={ActivityList} />
					<Route exact path="/activities/add" component={AddActivity} />
					<Route
						exact
						path="/activities/update/:activityId"
						component={UpdateActivity}
					/>
					<Route exact path="/inspections" component={InspectionList} />
					<Route exact path="/inspections/add" component={AddInspection} />
					<Route
						exact
						path="/inspections/update/:inspectionId"
						component={UpdateInspection}
					/>
					<Route exact path="/connections" component={ConnectionList} />
					<Route exact path="/connections/add" component={AddConnection} />
					<Route
						exact
						path="/connections/update/:connectionId"
						component={UpdateConnection}
					/>
					<Route exact path="/roles" component={RoleList} />
					<Route exact path="/roles/add" component={AddRole} />
					<Route exact path="/fluid-registries" component={FluidRegistryList} />
					<Route
						exact
						path="/fluid-registries/add"
						component={AddFluidRegistry}
					/>
					<Route
						exact
						path="/fluid-registries/update/:registryId"
						component={UpdateFluidRegistry}
					/>
					<Route exact path="/fluid-places" component={FluidPlaceList} />
					<Route exact path="/fluid-places/add" component={AddFluidPlace} />
					<Route
						exact
						path="/fluid-places/update/:placeId"
						component={UpdateFluidPlace}
					/>
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
				</div>
			</Router>
		</Provider>
	);
}

export default App;
