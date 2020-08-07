import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUID_REGISTRIES,
	GET_FLUID_REGISTRY,
	DELETE_FLUID_REGISTRY
} from "./types";

export const addFluidRegistry = (fluidRegistry, history) => async (
	dispatch
) => {
	try {
		await axios.post("/api/fluid-registries", fluidRegistry);
		history.push("/fluid-registries");
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

export const updateFluidRegistry = (
	registryId,
	fluidRegistry,
	history
) => async (dispatch) => {
	try {
		await axios.put(`/api/fluid-registries/${registryId}`, fluidRegistry);
		history.push("/fluid-registries");
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

export const deleteFluidRegistry = (registryId) => async (dispatch) => {
	if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie rejestru?")) {
		await axios.delete(`/api/fluid-registries/${registryId}`);
		dispatch({
			type: DELETE_FLUID_REGISTRY,
			payload: registryId
		});
	}
};
