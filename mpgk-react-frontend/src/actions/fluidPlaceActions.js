import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUID_PLACES,
	DELETE_FLUID_PLACE,
	ADD_FLUID_PLACE,
	UPDATE_FLUID_PLACE
} from "./types";

export const addFluidPlace = (fludidPlace) => async (dispatch) => {
	try {
		const res = await axios.post("/api/fluid-places", fludidPlace);
		dispatch({
			type: ADD_FLUID_PLACE,
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

export const getFluidPlaces = () => async (dispatch) => {
	const res = await axios.get("/api/fluid-places");
	dispatch({
		type: GET_FLUID_PLACES,
		payload: res.data
	});
};

export const updateFluidPlace = (placeId, updatedFluidPlace) => async (
	dispatch
) => {
	try {
		const res = await axios.put(
			`/api/fluid-places/${placeId}`,
			updatedFluidPlace
		);
		dispatch({
			type: UPDATE_FLUID_PLACE,
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

export const clearFluidPlaceState = () => (dispatch) => {
	dispatch({
		type: GET_FLUID_PLACES,
		payload: []
	});
};
