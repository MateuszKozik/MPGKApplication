import {
	GET_FLUIDS,
	UPDATE_FLUID,
	ADD_FLUID
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


		default:
			return state;
	}
}
