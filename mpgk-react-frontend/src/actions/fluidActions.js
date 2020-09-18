import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUIDS,
	ADD_FLUID,
	UPDATE_FLUID
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addFluid = (fluid) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/fluids`, fluid);
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
		const res = await axios.get(`${hostName}/api/fluids`);
		dispatch({
			type: GET_FLUIDS,
			payload: res.data
		});
	}
};

export const updateFluid = (fluidId, updatedFluid) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(`${hostName}/api/fluids/${fluidId}`, updatedFluid);
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


export const clearFluidState = () => (dispatch) => {
	dispatch({
		type: GET_FLUIDS,
		payload: []
	});
};
