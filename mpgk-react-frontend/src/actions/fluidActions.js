import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUIDS,
	GET_FLUID,
	DELETE_FLUID,
	ADD_FLUID,
	UPDATE_FLUID
} from "./types";

export const addFluid = (fluid) => async (dispatch) => {
	try {
		const res = await axios.post("/api/fluids", fluid);
		dispatch({
			type: ADD_FLUID,
			payload: res.date
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

export const getFluids = () => async (dispatch) => {
	const res = await axios.get("/api/fluids");
	dispatch({
		type: GET_FLUIDS,
		payload: res.data
	});
};

export const getFluid = (fluidId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/fluids/${fluidId}`);
		dispatch({
			type: GET_FLUID,
			payload: res.data
		});
	} catch (error) {
		history.push("/fluids");
	}
};

export const updateFluid = (fluidId, updateFluid) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/fluids/${fluidId}`, updateFluid);
		dispatch({
			type: UPDATE_FLUID,
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

export const deleteFluid = (fluidId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie płynu")) {
		await axios.delete(`/api/fluids/${fluidId}`);
		dispatch({
			type: DELETE_FLUID,
			payload: fluidId
		});
	}
};
