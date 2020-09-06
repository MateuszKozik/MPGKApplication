import axios from "axios";
import {
	GET_ERRORS,
	GET_INSPECTIONS,
	GET_INSPECTION,
	DELETE_INSPECTION,
	CLEAR_INSPECTIONS_LIST_STATE,
	GET_INSPECTIONS_BY_NAME_ACTIONS,
	GET_INSPECTION_BY_CONNECTION,
	GET_INSPECTIONS_BY_CONNECTION,
	GET_OVERDUE_BY_CONNECTION,
	GET_CONNECTION_START_TIME_BETWEEN,
	GET_INSPECTION_BY_CONNECTION_STARTTIME_ENDTIME
} from "./types";

export const addInspection = (inspection, history) => async (dispatch) => {
	try {
		await axios.post("/api/inspections", inspection);
		history.push("/inspections");
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

export const getInspections = () => async (dispatch) => {
	const res = await axios.get("/api/inspections");
	dispatch({
		type: GET_INSPECTIONS,
		payload: res.data
	});
};

export const getInspection = (inspectionId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/inspections/${inspectionId}`);
		dispatch({
			type: GET_INSPECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/inspections");
	}
};

export const updateInspection = (
	inspectionId,
	updateInspection,
	history
) => async (dispatch) => {
	try {
		await axios.put(`/api/inspections/${inspectionId}`, updateInspection);
		history.push("/inspections");
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

export const performInspection = (
	inspectionId,
	updateInspection,
	connectionId,
	history
) => async (dispatch) => {
	try {
		await axios.put(`/api/inspections/${inspectionId}`, updateInspection);
	} catch (error) {}
};

export const deleteInspection = (inspectionId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie przeglądu")) {
		await axios.delete(`/api/inspections/${inspectionId}`);
		dispatch({
			type: DELETE_INSPECTION,
			payload: inspectionId
		});
	}
};

export const getInspectionByConnection = (connectionId, history) => async (
	dispatch
) => {
	try {
		const res = await axios.get(
			`/api/inspections/list/${connectionId}/execute`
		);
		dispatch({
			type: GET_INSPECTION_BY_CONNECTION,
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
			`/api/inspections/list/${connectionId}/overdue/${endTime}`
		);
		dispatch({
			type: GET_OVERDUE_BY_CONNECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const getInspectionsByConnection = (connectionId, history) => async (
	dispatch
) => {
	try {
		const res = await axios.get(`/api/inspections/list/${connectionId}`);
		dispatch({
			type: GET_INSPECTIONS_BY_CONNECTION,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const getActionsByName = (history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/inspections/nitrogen`);
		dispatch({
			type: GET_INSPECTIONS_BY_NAME_ACTIONS,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const getConnectionAndStartTimeBetween = (
	id,
	startTime,
	endTime,
	typeName,
	history
) => async (dispatch) => {
	try {
		const res = await axios.get(
			`/api/inspections/list/${id}/from/${startTime}/to/${endTime}?type=${typeName}`
		);
		dispatch({
			type: GET_CONNECTION_START_TIME_BETWEEN,
			payload: res.data
		});

		return res;
	} catch (error) {
		history.push("/");
	}
};

export const getInspectionByConnectionAndStartTimeAndEndTime = (
	connectionId,
	startTime,
	endTime,
	history
) => async (dispatch) => {
	try {
		const res = await axios.get(
			`/api/inspections/list/${connectionId}/${startTime}/to/${endTime}/show`
		);
		dispatch({
			type: GET_INSPECTION_BY_CONNECTION_STARTTIME_ENDTIME,
			payload: res.data
		});
	} catch (error) {
		history.push("/");
	}
};

export const clearInspectionsListState = () => (dispatch) => {
	dispatch({
		type: CLEAR_INSPECTIONS_LIST_STATE,
		payload: []
	});
};
