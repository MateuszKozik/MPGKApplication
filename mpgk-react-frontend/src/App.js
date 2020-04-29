import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import DeviceList from "./components/Device/DeviceList";
import AddDevice from "./components/Device/AddDevice";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Route exact path="/devices" component={DeviceList} />
                <Route exact path="/devices/add" component={AddDevice} />
            </div>
        </Router>
    );
}

export default App;
