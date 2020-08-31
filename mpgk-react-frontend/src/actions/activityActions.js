import axios from "axios";
import {
	ADD_ACTIVITY,
	GET_ERRORS,
	GET_ACTIVITIES,
	GET_ACTIVITY,
	DELETE_ACTIVITY,
	UPDATE_ACTIVITY,
	GET_ACTIVITIES_BY_CONNECTION
} from "./types";

export const addActivity = (activity) => async (dispatch) => {
	try {
		const res = await axios.post("/api/activities", activity);
		dispatch({
			type: ADD_ACTIVITY,
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

export const getActivities = () => async (dispatch) => {
	const res = await axios.get("/api/activities");
	dispatch({
		type: GET_ACTIVITIES,
		payload: res.data
	});
};

export const getActivity = (activityId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/activities/${activityId}`);
		dispatch({
			type: GET_ACTIVITY,
			payload: res.data
		});
	} catch (error) {
		history.push("/activities");
	}
};

export const updateActivity = (activityId, updateActivity) => async (
	dispatch
) => {
	try {
		const res = await axios.put(`/api/activities/${activityId}`, updateActivity);
		dispatch({
			type: UPDATE_ACTIVITY,
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

export const deleteActivity = (activityId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie czynności")) {
		await axios.delete(`/api/activities/${activityId}`);
		dispatch({
			type: DELETE_ACTIVITY,
			payload: activityId
		});
	}
};

export const getActivitiesByConnection = (connectionId, history) => async (
	dispach
) => {
	try {
		const res = await axios.get(`/api/activities/list/${connectionId}`);
		dispach({
			type: GET_ACTIVITIES_BY_CONNECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const clearActivityState = () => (dispatch) => {
	dispatch({
		type: GET_ACTIVITIES,
		payload: []
	});
};
