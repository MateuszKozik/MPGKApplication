import axios from "axios";
import {
	GET_ERRORS,
	GET_DEVICES,
	DELETE_DEVICE,
	ADD_DEVICE,
	UPDATE_DEVICE
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addDevice = (device) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/devices`, device);
			dispatch({
				type: ADD_DEVICE,
				payload: res.data
			});
			dispatch({
				type: GET_ERRORS,
				payload: {}
			});
			return res;
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const getDevices = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/devices`);
		dispatch({
			type: GET_DEVICES,
			payload: res.data
		});
	}
};

export const updateDevice = (deviceId, updatedDevice) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(`${hostName}/api/devices/${deviceId}`, updatedDevice);
			dispatch({
				type: UPDATE_DEVICE,
				payload: res.data
			});
			dispatch({
				type: GET_ERRORS,
				payload: {}
			});
			return res;
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const deleteDevice = (deviceId) => async (dispatch) => {
	if (isUserLogin()) {
		if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie urządzenia")) {
			await axios.delete(`${hostName}/api/devices/${deviceId}`);
			dispatch({
				type: DELETE_DEVICE,
				payload: deviceId
			});
		}
	}
};

export const clearDeviceState = () => (dispatch) => {
	dispatch({
		type: GET_DEVICES,
		payload: []
	});
};
