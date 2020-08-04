import React, { Component } from "react";
import AddDeviceButton from "./AddDeviceButton";
import { connect } from "react-redux";
import { getDevices, deleteDevice } from "../../actions/deviceActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class DeviceList extends Component {
	componentDidMount() {
		this.props.getDevices();
	}

	onDeleteClick = (id) => {
		this.props.deleteDevice(id);
	};

	render() {
		const { devices } = this.props.device;
		return (
			<div className="container">
				<h1 className="display-4 text-center mt-2">Urządzenia</h1>
				<div className="row">
					<div className="col-md-4 my-1">
						<AddDeviceButton />
					</div>
				</div>

				<table className="table mt-4">
					<thead>
						<tr>
							<th>Nazwa</th>
							<th>Status</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						{devices.map((device) => (
							<tr key={device.deviceId}>
								<td>{device.name}</td>
								<td>
									{device.status === true && <div>Aktywne</div>}
									{device.status === false && <div>Nieaktywne</div>}
								</td>
								<td>
									<Link
										to={`/devices/update/${device.deviceId}`}
										className="btn btn-primary my-1"
									>
										Edytuj
									</Link>
									<button
										onClick={this.onDeleteClick.bind(this, device.deviceId)}
										className="btn btn-danger ml-2 my-1"
									>
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
	getDevices: PropTypes.func.isRequired,
	deleteDevice: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	device: state.device
});

export default connect(mapStateToProps, { getDevices, deleteDevice })(
	DeviceList
);
