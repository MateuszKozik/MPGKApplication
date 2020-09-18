import axios from "axios";
import {
	GET_ERRORS,
	GET_FLUID_PLACES,
	ADD_FLUID_PLACE,
	UPDATE_FLUID_PLACE
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addFluidPlace = (fludidPlace) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/fluid-places`, fludidPlace);
			dispatch({
				type: ADD_FLUID_PLACE,
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

export const getFluidPlaces = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/fluid-places`);
		dispatch({
			type: GET_FLUID_PLACES,
			payload: res.data
		});
	}
};

export const updateFluidPlace = (placeId, updatedFluidPlace) => async (
	dispatch
) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(
				`${hostName}/api/fluid-places/${placeId}`,
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
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const clearFluidPlaceState = () => (dispatch) => {
	dispatch({
		type: GET_FLUID_PLACES,
		payload: []
	});
};
