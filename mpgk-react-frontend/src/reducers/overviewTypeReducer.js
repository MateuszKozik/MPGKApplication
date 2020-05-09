import {
    GET_OVERVIEW_TYPE,
    GET_OVERVIEW_TYPES,
    DELETE_OVERVIEW_TYPE
} from "../actions/types";

const initialState = {
    overviewTypes: [],
    overviewType: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OVERVIEW_TYPES:
            return {
                ...state,
                overviewTypes: action.payload
            };

        case GET_OVERVIEW_TYPE:
            return {
                ...state,
                overviewType: action.payload
            };

        case DELETE_OVERVIEW_TYPE:
            return {
                ...state,
                overviewTypes: state.overviewTypes.filter(
                    (overviewType) => overviewType.typeId !== action.payload
                )
            };

        default:
            return state;
    }
}
