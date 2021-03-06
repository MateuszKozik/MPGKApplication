import axios from "axios";
import {
	GET_ERRORS,
	GET_INSPECTIONS,
	CLEAR_INSPECTIONS_LIST_STATE,
	GET_INSPECTION_BY_CONNECTION,
	GET_OVERDUE_BY_CONNECTION,
	UPDATE_INSPECTION,
	GET_CONNECTION,
	UPDATE_OVERDUE_INSPECTION,
	DELETE_INSPECTION_BY_CONNECTION
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import { hostName } from "./host";

export const addInspection = (inspection, history) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			await axios.post(`${hostName}/api/inspections`, inspection);
			history.push("/inspections");
			dispatch({
				type: GET_ERRORS,
				payload: {}
			});
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const getInspections = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/inspections`);
		dispatch({
			type: GET_INSPECTIONS,
			payload: res.data
		});
	}
};

export const updateInspection = (inspectionId, updatedInspection) => async (
	dispatch
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(
				`${hostName}/api/inspections/${inspectionId}`,
				updatedInspection
			);
			dispatch({
				type: UPDATE_INSPECTION,
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

export const updateOverdueInspection = (
	inspectionId,
	updatedInspection
) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(
				`${hostName}/api/inspections/overdue/${inspectionId}`,
				updatedInspection
			);
			dispatch({
				type: UPDATE_OVERDUE_INSPECTION,
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
		return error.response.data;
	}
};

export const getInspectionByConnection = (connectionId, history) => async (
	dispatch
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.get(
				`${hostName}/api/inspections/list/${connectionId}/execute`
			);
			dispatch({
				type: GET_INSPECTION_BY_CONNECTION,
				payload: res.data
			});
		}
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
		if (isUserLogin()) {
			const res = await axios.get(
				`${hostName}/api/inspections/list/${connectionId}/overdue/${endTime}`
			);
			dispatch({
				type: GET_OVERDUE_BY_CONNECTION,
				payload: res.data
			});
		}
	} catch (error) {
		history.push("/");
	}
};

export const getInspectionsByConnection = (connectionId, history) => async (
	dispatch
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.get(
				`${hostName}/api/inspections/list/${connectionId}`
			);
			dispatch({
				type: GET_CONNECTION,
				payload: res.data
			});
		}
	} catch (error) {
		history.push("/");
	}
};

export const getActionsByName = (history) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.get(`${hostName}/api/inspections/nitrogen`);
			dispatch({
				type: GET_INSPECTIONS,
				payload: res.data
			});
		}
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
		if (isUserLogin()) {
			const res = await axios.get(
				`${hostName}/api/inspections/list/${id}/from/${startTime}/to/${endTime}?type=${typeName}`
			);
			dispatch({
				type: GET_CONNECTION,
				payload: res.data
			});

			return res;
		}
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
		if (isUserLogin()) {
			const res = await axios.get(
				`${hostName}/api/inspections/list/${connectionId}/${startTime}/to/${endTime}/show`
			);
			dispatch({
				type: GET_INSPECTIONS,
				payload: res.data
			});
		}
	} catch (error) {
		history.push("/");
	}
};

export const deleteInspectionByConnectionAndStartTimeAndEndTime = (
	connectionId,
	startTime,
	endTime
) => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.delete(
			`${hostName}/api/inspections/list/${connectionId}/${startTime}/to/${endTime}/delete`
		);

		dispatch({
			type: DELETE_INSPECTION_BY_CONNECTION,
			payload: { endTime, connectionId }
		});
		return res;
	}
};

export const createOnDemandInspections = (connectionId, history) => async (
	dispatch
) => {
	if (isUserLogin()) {
		if (window.confirm("Czy na pewno chcesz wygenerować przegląd?")) {
			try {
				await axios.post(`${hostName}/api/tasks/on-demand/${connectionId}`);
				history.push("/");
			} catch (error) {
				history.push("/");
			}
		}
	}
};

export const clearInspectionsListState = () => (dispatch) => {
	dispatch({
		type: CLEAR_INSPECTIONS_LIST_STATE,
		payload: []
	});
};

export const clearInspectionState = () => (dispatch) => {
	dispatch({
		type: GET_INSPECTIONS,
		payload: []
	});
};
