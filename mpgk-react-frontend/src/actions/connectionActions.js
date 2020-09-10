import axios from "axios";
import {
	GET_ERRORS,
	GET_CONNECTIONS,
	DELETE_CONNECTION,
	ADD_CONNECTION,
	UPDATE_CONNECTION,
	GET_HOMEPAGE
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addConnection = (connection) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/connections`, connection);
			dispatch({
				type: ADD_CONNECTION,
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

export const getConnections = () => async (dispach) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/connections/`);
		dispach({
			type: GET_CONNECTIONS,
			payload: res.data
		});
	}
};

export const updateConnection = (connectionId, updatedConnection) => async (
	dispatch
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(
				`${hostName}/api/connections/${connectionId}`,
				updatedConnection
			);
			dispatch({
				type: UPDATE_CONNECTION,
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

export const deleteConnection = (connectionId) => async (dispach) => {
	if (isUserLogin()) {
		if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie powiązania")) {
			await axios.delete(`${hostName}/api/connections/${connectionId}`);
			dispach({
				type: DELETE_CONNECTION,
				payload: connectionId
			});
		}
	}
};

export const getHomePageConnections = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/home/connections`);
		dispatch({
			type: GET_HOMEPAGE,
			payload: res.data
		});
	}
};

export const clearConnectionState = () => (dispach) => {
	dispach({
		type: GET_CONNECTIONS,
		payload: []
	});
};
