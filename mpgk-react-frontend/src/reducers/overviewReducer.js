import {
	GET_OVERVIEWS,
	GET_OVERVIEW,
	DELETE_OVERVIEW,
	CLEAR_OVERVIEWS_LIST_STATE,
	GET_OVERVIEWS_BY_NAME_ACTIONS,
	GET_OVERVIEW_BY_CONNECTION,
	GET_OVERVIEWS_BY_CONNECTION,
	GET_OVERDUE_BY_CONNECTION
} from "../actions/types";

const initialState = {
	overviews: [],
	overviewsList: [],
	overdueOverview: [],
	actualOverview: [],
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

		case GET_OVERVIEW_BY_CONNECTION:
			return {
				...state,
				actualOverview: action.payload
			};

		case GET_OVERVIEWS_BY_CONNECTION:
			return {
				...state,
				overviewsList: action.payload
			};

		case GET_OVERDUE_BY_CONNECTION:
			return {
				...state,
				overdueOverview: action.payload
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
				overviewsList: [],
				overdueOverview: [],
				actualOverview: []
			};

		case GET_OVERVIEWS_BY_NAME_ACTIONS:
			return {
				...state,
				overviews: action.payload
			};

		default:
			return state;
	}
}
