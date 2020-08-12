import {
	GET_OVERVIEWS,
	GET_OVERVIEW,
	DELETE_OVERVIEW,
	GET_OVERVIEWS_BY_CONNECTION,
	CLEAR_OVERVIEWS_LIST_STATE
} from "../actions/types";

const initialState = {
	overviews: [],
	overviewsList: [],
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

		case GET_OVERVIEWS_BY_CONNECTION:
			return {
				...state,
				overviewsList: action.payload
			};

		case DELETE_OVERVIEW:
			return {
				...state,
				overviews: state.overviews.filter(
					(overview) => overview.overviewId !== action.payload
				)
			};

		case CLEAR_OVERVIEWS_LIST_STATE:
			return {
				...state,
				overviewsList: []
			};

		default:
			return state;
	}
}
