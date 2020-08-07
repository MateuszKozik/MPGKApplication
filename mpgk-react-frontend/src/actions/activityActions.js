import axios from "axios";
import {
	GET_ERRORS,
	GET_ACTIVITIES,
	GET_ACTIVITY,
	DELETE_ACTIVITY
} from "./types";

export const addActivity = (activity, history) => async (dispatch) => {
	try {
		await axios.post("/api/activities", activity);
		history.push("/activities");
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

export const updateActivity = (activityId, updateActivity, history) => async (
	dispatch
) => {
	try {
		await axios.put(`/api/activities/${activityId}`, updateActivity);
		history.push("/activities");
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

export const deleteActivity = (activityId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie czynności")) {
		await axios.delete(`/api/activities/${activityId}`);
		dispatch({
			type: DELETE_ACTIVITY,
			payload: activityId
		});
	}
};
