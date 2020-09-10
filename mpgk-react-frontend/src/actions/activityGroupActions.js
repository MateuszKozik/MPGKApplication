import axios from "axios";
import {
	ADD_GROUP,
	GET_ERRORS,
	GET_GROUPS,
	DELETE_GROUP,
	UPDATE_GROUP
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addGroup = (group) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/groups`, group);
			dispatch({
				type: ADD_GROUP,
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

export const getGroups = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/groups`);
		dispatch({
			type: GET_GROUPS,
			payload: res.data
		});
	}
};

export const updateGroup = (groupId, updatedGroup) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(`${hostName}/api/groups/${groupId}`, updatedGroup);
			dispatch({
				type: UPDATE_GROUP,
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

export const deleteGroup = (groupId) => async (dispatch) => {
	if (isUserLogin()) {
		if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie grupy")) {
			await axios.delete(`${hostName}/api/groups/${groupId}`);
			dispatch({
				type: DELETE_GROUP,
				payload: groupId
			});
		}
	}
};

export const clearGroupState = () => (dispatch) => {
	dispatch({
		type: GET_GROUPS,
		payload: []
	});
};
