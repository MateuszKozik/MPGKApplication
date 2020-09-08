import {
	GET_FLUID_PLACES,
	DELETE_FLUID_PLACE,
	ADD_FLUID_PLACE,
	UPDATE_FLUID_PLACE
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

		case ADD_FLUID_PLACE: {
			return {
				...state,
				fluidPlaces: [action.payload, ...state.fluidPlaces]
			};
		}

		case UPDATE_FLUID_PLACE: {
			return {
				...state,
				fluidPlaces: state.fluidPlaces.map((fluidPlace) => {
					if (fluidPlace.placeId === action.payload.placeId) {
						return {
							...fluidPlace,
							...action.payload
						};
					} else {
						return fluidPlace;
					}
				})
			};
		}

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
