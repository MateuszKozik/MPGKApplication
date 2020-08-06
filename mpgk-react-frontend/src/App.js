import React from "react";
import "./App.css";
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
import OverviewTypeList from "./components/OverviewType/OverviewTypeList";
import AddOverviewType from "./components/OverviewType/AddOverviewType";
import UpdateOverviewType from "./components/OverviewType/UpdateOverviewType";
import PersonList from "./components/Person/PersonList";
import AddPerson from "./components/Person/AddPerson";
import UpdatePerson from "./components/Person/UpdatePerson";
import ActivityGroupList from "./components/ActivityGroup/ActivityGroupList";
import AddActivityGroup from "./components/ActivityGroup/AddActivityGroup";
import UpdateActivityGroup from "./components/ActivityGroup/UpdateActivityGroup";
import ActivityList from "./components/Activity/ActivityList";
import AddActivity from "./components/Activity/AddActivity";
import UpdateActivity from "./components/Activity/UpdateActivity";
import OverviewList from "./components/Overview/OverviewList";
import AddOverview from "./components/Overview/AddOverview";
import UpdateOverview from "./components/Overview/UpdateOverview";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Route exact path="/devices" component={DeviceList} />
                    <Route exact path="/devices/add" component={AddDevice} />
                    <Route
                        exact
                        path="/devices/update/:id"
                        component={UpdateDevice}
                    />
                    <Route exact path="/fluids" component={FluidList} />
                    <Route exact path="/fluids/add" component={AddFluid} />
                    <Route
                        exact
                        path="/fluids/update/:fluidId"
                        component={UpdateFluid}
                    />
                    <Route
                        exact
                        path="/overview-types"
                        component={OverviewTypeList}
                    />
                    <Route
                        exact
                        path="/overview-types/add"
                        component={AddOverviewType}
                    />
                    <Route
                        exact
                        path="/overview-types/update/:typeId"
                        component={UpdateOverviewType}
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
                    <Route exact path="/overviews" component={OverviewList} />
                    <Route exact path="/overviews/add" component={AddOverview} />
                    <Route
                        exact
                        path="/overviews/update/:overviewId"
                        component={UpdateOverview}
                    />
                    
                </div>
            </Router>
        </Provider>
    );
}

export default App;
