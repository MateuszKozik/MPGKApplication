import axios from "axios";
import {
	GET_ERRORS,
	GET_OVERVIEWS,
	GET_OVERVIEW,
	DELETE_OVERVIEW,
	CLEAR_OVERVIEWS_LIST_STATE,
	GET_OVERVIEWS_BY_NAME_ACTIONS,
	GET_OVERVIEW_BY_CONNECTION,
	GET_OVERVIEWS_BY_CONNECTION,
	GET_OVERDUE_BY_CONNECTION
} from "./types";

export const addOverview = (overview, history) => async (dispatch) => {
	try {
		await axios.post("/api/overviews", overview);
		history.push("/overviews");
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

export const getOverviews = () => async (dispatch) => {
	const res = await axios.get("/api/overviews");
	dispatch({
		type: GET_OVERVIEWS,
		payload: res.data
	});
};

export const getOverview = (overviewId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/overviews/${overviewId}`);
		dispatch({
			type: GET_OVERVIEW,
			payload: res.data
		});
	} catch (error) {
		history.push("/overviews");
	}
};

export const updateOverview = (overviewId, updateOverview, history) => async (
	dispatch
) => {
	try {
		await axios.put(`/api/overviews/${overviewId}`, updateOverview);
		history.push("/overviews");
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

export const performOverview = (
	overviewId,
	updateOverview,
	connectionId,
	history
) => async (dispatch) => {
	try {
		await axios.put(`/api/overviews/${overviewId}`, updateOverview);
	} catch (error) {}
};

export const deleteOverview = (overviewId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie przeglądu")) {
		await axios.delete(`/api/overviews/${overviewId}`);
		dispatch({
			type: DELETE_OVERVIEW,
			payload: overviewId
		});
	}
};

export const getOverviewByConnection = (connectionId, history) => async (
	dispatch
) => {
	try {
		const res = await axios.get(`/api/overviews/list/${connectionId}/execute`);
		dispatch({
			type: GET_OVERVIEW_BY_CONNECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const getOverdueByConnection = (
	connectionId,
	endTime,
	history
) => async (dispatch) => {
	try {
		const res = await axios.get(
			`/api/overviews/list/${connectionId}/overdue/${endTime}`
		);
		dispatch({
			type: GET_OVERDUE_BY_CONNECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const getOverviewsByConnection = (connectionId, history) => async (
	dispatch
) => {
	try {
		const res = await axios.get(`/api/overviews/list/${connectionId}`);
		dispatch({
			type: GET_OVERVIEWS_BY_CONNECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const getActionsByName = (history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/overviews/nitrogen`);
		dispatch({
			type: GET_OVERVIEWS_BY_NAME_ACTIONS,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const clearOverviewsListState = () => (dispatch) => {
	dispatch({
		type: CLEAR_OVERVIEWS_LIST_STATE,
		payload: []
	});
};
