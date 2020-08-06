import { GET_OVERVIEWS, GET_OVERVIEW, DELETE_OVERVIEW } from "../actions/types";

const initialState = {
    overviews: [],
    overview: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OVERVIEWS:
            return {
                ...state,
                overviews: action.payload
            };

        case GET_OVERVIEW:
            return {
                ...state,
                overview: action.payload
            };

        case DELETE_OVERVIEW:
            return {
                ...state,
                overviews: state.overviews.filter(
                    (overview) => overview.overviewId !== action.payload
                )
            };

        default:
            return state;
    }
}
