import axios from "axios";
import {
	GET_ERRORS,
	GET_INSPECTION_TYPES,
	GET_INSPECTION_TYPE,
	DELETE_INSPECTION_TYPE
} from "./types";

export const addInspectionType = (inspectionType, history) => async (
	dispatch
) => {
	try {
		await axios.post("/api/inspection-types", inspectionType);
		history.push("/inspection-types");
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

export const getInspectionTypes = () => async (dispatch) => {
	const res = await axios.get("/api/inspection-types");
	dispatch({
		type: GET_INSPECTION_TYPES,
		payload: res.data
	});
};

export const getInspectionType = (typeId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/inspection-types/${typeId}`);
		dispatch({
			type: GET_INSPECTION_TYPE,
			payload: res.data
		});
	} catch (error) {
		history.push("/inspection-types");
	}
};

export const updateInspectionType = (typeId, inspectionType, history) => async (
	dispatch
) => {
	try {
		await axios.put(`/api/inspection-types/${typeId}`, inspectionType);
		history.push("/inspection-types");
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

export const deleteInspectionType = (typeId) => async (dispatch) => {
	if (
		window.confirm("Czy jesteś pewny? Spowoduje to usunięcie rodzaju przeglądu")
	) {
		await axios.delete(`api/inspection-types/${typeId}`);
		dispatch({
			type: DELETE_INSPECTION_TYPE,
			payload: typeId
		});
	}
};
