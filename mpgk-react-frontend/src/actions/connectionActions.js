import axios from "axios";
import {
	GET_ERRORS,
	GET_CONNECTIONS,
	GET_CONNECTION,
	DELETE_CONNECTION
} from "./types";

export const addConnection = (connection, history) => async (dispatch) => {
	try {
		await axios.post("/api/connections", connection);
		history.push("/connections");
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
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

export const getConnection = (connectionId, history) => async (dispach) => {
	try {
		const res = await axios.get(`/api/connections/${connectionId}`);
		dispach({
			type: GET_CONNECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/connections");
	}
};

export const updateConnection = (
	connectionId,
	updateConnection,
	history
) => async (dispatch) => {
	try {
		await axios.put(`/api/connections/${connectionId}`, updateConnection);
		history.push("/connections");
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
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
