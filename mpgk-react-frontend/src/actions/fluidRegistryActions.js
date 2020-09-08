import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUID_REGISTRIES,
	GET_FLUID_REGISTRY,
	DELETE_FLUID_REGISTRY,
	ADD_FLUID_REGISTRY,
	UPDATE_FLUID_REGISTRY
} from "./types";

export const addFluidRegistry = (fluidRegistry) => async (dispatch) => {
	try {
		const res = await axios.post("/api/fluid-registries", fluidRegistry);
		dispatch({
			type: ADD_FLUID_REGISTRY,
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

export const getFluidRegistries = () => async (dispatch) => {
	const res = await axios.get("/api/fluid-registries");
	dispatch({
		type: GET_FLUID_REGISTRIES,
		payload: res.data
	});
};

export const getFluidRegistry = (registryId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/fluid-registries/${registryId}`);
		dispatch({
			type: GET_FLUID_REGISTRY,
			payload: res.data
		});
	} catch (error) {
		history.push("/fluid-registries");
	}
};

export const updateFluidRegistry = (registryId, updatedfluidRegistry) => async (
	dispatch
) => {
	try {
		const res = await axios.put(
			`/api/fluid-registries/${registryId}`,
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
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const deleteFluidRegistry = (registryId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie wpisu.")) {
		await axios.delete(`/api/fluid-registries/${registryId}`);
		dispatch({
			type: DELETE_FLUID_REGISTRY,
			payload: registryId
		});
	}
};

export const clearFluidRegistryState = () => (dispatch) => {
	dispatch({
		type: GET_FLUID_REGISTRIES,
		payload: []
	});
};
