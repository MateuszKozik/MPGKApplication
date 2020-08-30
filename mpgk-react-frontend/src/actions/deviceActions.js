import axios from "axios";
import {
	GET_ERRORS,
	GET_DEVICES,
	GET_DEVICE,
	DELETE_DEVICE,
	ADD_DEVICE,
	UPDATE_DEVICE
} from "./types";

export const addDevice = (device) => async (dispatch) => {
	try {
		const res = await axios.post("/api/devices", device);
		dispatch({
			type: ADD_DEVICE,
			payload: res.data
		});
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		return res;
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const getDevices = () => async (dispatch) => {
	const res = await axios.get("/api/devices");
	dispatch({
		type: GET_DEVICES,
		payload: res.data
	});
};

export const getDevice = (deviceId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/devices/${deviceId}`);
		dispatch({
			type: GET_DEVICE,
			payload: res.data
		});
	} catch (error) {
		history.push("/devices");
	}
};

export const updateDevice = (deviceId, updatedDevice) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/devices/${deviceId}`, updatedDevice);
		dispatch({
			type: UPDATE_DEVICE,
			payload: res.data
		});
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		return res;
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const deleteDevice = (deviceId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie urządzenia")) {
		await axios.delete(`/api/devices/${deviceId}`);
		dispatch({
			type: DELETE_DEVICE,
			payload: deviceId
		});
	}
};

export const clearDeviceState = () => (dispatch) => {
	dispatch({
		type: GET_DEVICES,
		payload: []
	});
};
