import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUIDS,
	DELETE_FLUID,
	ADD_FLUID,
	UPDATE_FLUID
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";

export const addFluid = (fluid) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post("/api/fluids", fluid);
			dispatch({
				type: ADD_FLUID,
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

export const getFluids = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get("/api/fluids");
		dispatch({
			type: GET_FLUIDS,
			payload: res.data
		});
	}
};

export const updateFluid = (fluidId, updatedFluid) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(`/api/fluids/${fluidId}`, updatedFluid);
			dispatch({
				type: UPDATE_FLUID,
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

export const deleteFluid = (fluidId) => async (dispatch) => {
	if (isUserLogin()) {
		if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie płynu")) {
			await axios.delete(`/api/fluids/${fluidId}`);
			dispatch({
				type: DELETE_FLUID,
				payload: fluidId
			});
		}
	}
};

export const clearFluidState = () => (dispatch) => {
	dispatch({
		type: GET_FLUIDS,
		payload: []
	});
};
