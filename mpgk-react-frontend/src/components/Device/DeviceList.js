import React, { Component } from "react";
import AddDeviceButton from "./AddDeviceButton";

class DeviceList extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="display-4 text-center">Urządzenia</h1>
                <AddDeviceButton />
            </div>
        );
    }
}

export default DeviceList;
