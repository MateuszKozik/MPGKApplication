import React, { Component } from "react";
import AddDeviceButton from "./AddDeviceButton";
import { connect } from "react-redux";
import { getDevices } from "../../actions/deviceActions";
import PropTypes from "prop-types";

class DeviceList extends Component {
    componentDidMount() {
        this.props.getDevices();
    }

    render() {
        const { devices } = this.props.device;
        return (
            <div className="container">
                <h1 className="display-4 text-center mt-2">Urządzenia</h1>
                <div className="row">
                    <AddDeviceButton className="float-left" />
                </div>

                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Status</th>
                            <th>Typ urządzenia</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device.deviceId}>
                                <td>{device.name}</td>
                                <td>
                                    {device.status === true && (
                                        <div>Aktywne</div>
                                    )}
                                    {device.status === false && (
                                        <div>Nieaktywne</div>
                                    )}
                                </td>
                                <td>
                                    {device.type === true && (
                                        <div>Z przeglądem</div>
                                    )}
                                    {device.type === false && (
                                        <div>Bez przeglądu</div>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-primary my-1">
                                        Edytuj
                                    </button>
                                    <button className="btn btn-danger ml-2 my-1">
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

DeviceList.propTypes = {
    device: PropTypes.object.isRequired,
    getDevices: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    device: state.device
});

export default connect(mapStateToProps, { getDevices })(DeviceList);
