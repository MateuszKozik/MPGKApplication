import axios from "axios";
import { GET_ERRORS, GET_ROLES, GET_ROLE, DELETE_ROLE } from "./types";

export const addRole = (role, history) => async (dispatch) => {
	try {
		await axios.post("/api/roles", role);
		history.push("/roles");
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
	} catch (errors) {
		dispatch({
			type: GET_ERRORS,
			payload: errors.response.data
		});
	}
};

export const getRoles = () => async (dispatch) => {
	const res = await axios.get("/api/roles");
	dispatch({
		type: GET_ROLES,
		payload: res.data
	});
};

export const getRole = (name, history) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/roles/${name}`);
		dispatch({
			type: GET_ROLE,
			payload: res.data
		});
	} catch (error) {
		history.push("/roles");
	}
};

export const deleteRole = (name) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie uprawnienia")) {
		await axios.delete(`/api/roles/${name}`);
		dispatch({
			type: DELETE_ROLE,
			payload: name
		});
	}
};
