import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUID_PLACES,
	GET_FLUID_PLACE,
	DELETE_FLUID_PLACE
} from "./types";

export const addFluidPlace = (fludidPlace, history) => async (dispatch) => {
	try {
		await axios.post("/api/fluid-places", fludidPlace);
		history.push("/fluid-places");
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

export const getFluidPlaces = () => async (dispatch) => {
	const res = await axios.get("/api/fluid-places");
	dispatch({
		type: GET_FLUID_PLACES,
		payload: res.data
	});
};

export const getFluidPlace = (placeId, history) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/fluid-places/${placeId}`);
		dispatch({
			type: GET_FLUID_PLACE,
			payload: res.data
		});
	} catch (error) {
		history.push("/fluid-places");
	}
};

export const updateFluidPlace = (placeId, updateFluidPlace, history) => async (
	dispatch
) => {
	try {
		await axios.put(`/api/fluid-places/${placeId}`, updateFluidPlace);
		history.push("/fluid-places");
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

export const deleteFluidPlace = (placeId) => async (dispatch) => {
	if (
		window.confirm(
			"Czy jesteś pewny? Spowoduje to usunięcie miejsca dodania płynu"
		)
	) {
		await axios.delete(`/api/fluid-places/${placeId}`);
		dispatch({
			type: DELETE_FLUID_PLACE,
			payload: placeId
		});
	}
};
