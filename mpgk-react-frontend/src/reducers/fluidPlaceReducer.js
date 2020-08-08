import {
	GET_FLUID_PLACES,
	GET_FLUID_PLACE,
	DELETE_FLUID_PLACE
} from "../actions/types";

const initialState = {
	fluidPlaces: [],
	fluidPlace: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_FLUID_PLACES:
			return {
				...state,
				fluidPlaces: action.payload
			};

		case GET_FLUID_PLACE:
			return {
				...state,
				fluidPlace: action.payload
			};

		case DELETE_FLUID_PLACE:
			return {
				...state,
				fluidPlaces: state.fluidPlaces.filter(
					(fluidPlace) => fluidPlace.placeId !== action.payload
				)
			};
		default:
			return state;
	}
}
