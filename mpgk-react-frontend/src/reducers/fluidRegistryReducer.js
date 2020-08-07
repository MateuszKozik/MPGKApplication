import {
	GET_FLUID_REGISTRIES,
	GET_FLUID_REGISTRY,
	DELETE_FLUID_REGISTRY
} from "../actions/types";

const initialState = {
	fluidRegistries: [],
	fluidRegistry: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_FLUID_REGISTRIES:
			return {
				...state,
				fluidRegistries: action.payload
			};

		case GET_FLUID_REGISTRY:
			return {
				...state,
				fluidRegistry: action.payload
			};

		case DELETE_FLUID_REGISTRY:
			return {
				...state,
				fluidRegistries: state.fluidRegistries.filter(
					(fluidRegistry) => fluidRegistry.registryId !== action.payload
				)
			};

		default:
			return state;
	}
}
