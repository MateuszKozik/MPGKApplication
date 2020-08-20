import {
	GET_ACTIVITIES,
	GET_ACTIVITY,
	DELETE_ACTIVITY,
	GET_ACTIVITIES_BY_CONNECTION
} from "../actions/types";

const initialState = {
	activities: [],
	homePageActivities: [],
	activity: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ACTIVITIES:
			return {
				...state,
				activities: action.payload
			};

		case GET_ACTIVITY:
			return {
				...state,
				activity: action.payload
			};

		case GET_ACTIVITIES_BY_CONNECTION:
			return {
				...state,
				homePageActivities: action.payload
			};

		case DELETE_ACTIVITY:
			return {
				...state,
				activities: state.activities.filter(
					(activity) => activity.activityId !== action.payload
				)
			};

		default:
			return state;
	}
}
