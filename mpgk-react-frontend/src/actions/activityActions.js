import axios from "axios";
import {
	ADD_ACTIVITY,
	GET_ERRORS,
	GET_ACTIVITIES,
	UPDATE_ACTIVITY,
	GET_CONNECTION
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addActivity = (activity) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/activities`, activity);
			dispatch({
				type: ADD_ACTIVITY,
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

export const getActivities = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/activities`);
		dispatch({
			type: GET_ACTIVITIES,
			payload: res.data
		});
	}
};

export const updateActivity = (activityId, updatedActivity) => async (
	dispatch
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(
				`${hostName}/api/activities/${activityId}`,
				updatedActivity
			);
			dispatch({
				type: UPDATE_ACTIVITY,
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


export const getActivitiesByConnection = (connectionId, history) => async (
	dispach
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.get(`${hostName}/api/activities/list/${connectionId}`);
			dispach({
				type: GET_CONNECTION,
				payload: res.data
			});
		}
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
