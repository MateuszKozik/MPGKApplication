import { GET_FLUID, GET_FLUIDS, DELETE_FLUID } from "../actions/types";

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

        case DELETE_FLUID:
            return {
                ...state,
                fluids: state.fluids.filter(
                    (fluid) => fluid.fluidId !== action.payload
                )
            };

        default:
            return state;
    }
}
