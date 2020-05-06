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
                </div>
            </Router>
        </Provider>
    );
}

export default App;
