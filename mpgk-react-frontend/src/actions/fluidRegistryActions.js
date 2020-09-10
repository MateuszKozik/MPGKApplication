import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUID_REGISTRIES,
	DELETE_FLUID_REGISTRY,
	ADD_FLUID_REGISTRY,
	UPDATE_FLUID_REGISTRY
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addFluidRegistry = (fluidRegistry) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/fluid-registries`, fluidRegistry);
			dispatch({
				type: ADD_FLUID_REGISTRY,
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

export const getFluidRegistries = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/fluid-registries`);
		dispatch({
			type: GET_FLUID_REGISTRIES,
			payload: res.data
		});
	}
};

export const updateFluidRegistry = (registryId, updatedfluidRegistry) => async (
	dispatch
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(
				`${hostName}/api/fluid-registries/${registryId}`,
				updatedfluidRegistry
			);
			dispatch({
				type: UPDATE_FLUID_REGISTRY,
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

export const deleteFluidRegistry = (registryId) => async (dispatch) => {
	if (isUserLogin()) {
		if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie wpisu.")) {
			await axios.delete(`${hostName}/api/fluid-registries/${registryId}`);
			dispatch({
				type: DELETE_FLUID_REGISTRY,
				payload: registryId
			});
		}
	}
};

export const clearFluidRegistryState = () => (dispatch) => {
	dispatch({
		type: GET_FLUID_REGISTRIES,
		payload: []
	});
};
