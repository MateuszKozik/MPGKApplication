import {
	GET_FLUID_REGISTRIES,
	GET_FLUID_REGISTRY,
	DELETE_FLUID_REGISTRY,
	UPDATE_FLUID_REGISTRY,
	ADD_FLUID_REGISTRY
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

		case UPDATE_FLUID_REGISTRY:
			return {
				...state,
				fluidRegistries: state.fluidRegistries.map((fluidRegistry) => {
					if (fluidRegistry.registryId === action.payload.registryId) {
						return {
							...fluidRegistry,
							...action.payload
						};
					} else {
						return fluidRegistry;
					}
				})
			};

		case ADD_FLUID_REGISTRY:
			return {
				...state,
				fluidRegistries: [action.payload, ...state.fluidRegistries]
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
