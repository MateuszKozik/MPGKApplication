import axios from "axios";
import {
	GET_ERRORS,
	GET_CONNECTIONS,
	DELETE_CONNECTION,
	ADD_CONNECTION,
	UPDATE_CONNECTION,
	GET_CONNECTION
} from "./types";

export const addConnection = (connection) => async (dispatch) => {
	try {
		const res = await axios.post("/api/connections", connection);
		dispatch({
			type: ADD_CONNECTION,
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

export const getConnections = () => async (dispach) => {
	const res = await axios.get("/api/connections/");
	dispach({
		type: GET_CONNECTIONS,
		payload: res.data
	});
};

export const updateConnection = (connectionId, updatedConnection) => async (
	dispatch
) => {
	try {
		const res = await axios.put(
			`/api/connections/${connectionId}`,
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
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const deleteConnection = (connectionId) => async (dispach) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie powiązania")) {
		await axios.delete(`/api/connections/${connectionId}`);
		dispach({
			type: DELETE_CONNECTION,
			payload: connectionId
		});
	}
};

export const getHomePageConnections = () => async (dispatch) => {
	const res = await axios.get("/api/home/connections");
	dispatch({
		type: GET_CONNECTION,
		payload: res.data
	});
};

export const clearConnectionState = () => (dispach) => {
	dispach({
		type: GET_CONNECTIONS,
		payload: []
	});
};
