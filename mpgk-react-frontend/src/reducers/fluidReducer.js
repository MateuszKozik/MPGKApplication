import {
	GET_FLUID,
	GET_FLUIDS,
	DELETE_FLUID,
	UPDATE_FLUID,
	ADD_FLUID,
	CLEAR_FLUID_STATE
} from "../actions/types";

const initialState = {
	fluids: [],
	fluid: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_FLUIDS:
			return {
				...state,
				fluids: action.payload
			};

		case GET_FLUID:
			return {
				...state,
				fluid: action.payload
			};

		case UPDATE_FLUID:
			return {
				...state,
				fluids: state.fluids.map((fluid) => {
					if (fluid.fluidId === action.payload.fluidId) {
						return {
							...fluid,
							...action.payload
						};
					} else {
						return fluid;
					}
				})
			};

		case ADD_FLUID:
			return {
				...state,
				fluids: [action.payload, ...state.fluids]
			};

		case DELETE_FLUID:
			return {
				...state,
				fluids: state.fluids.filter((fluid) => fluid.fluidId !== action.payload)
			};

		case CLEAR_FLUID_STATE:
			return {
				...state,
				fluids: []
			};

		default:
			return state;
	}
}
