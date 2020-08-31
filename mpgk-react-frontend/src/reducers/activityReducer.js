import {
	ADD_ACTIVITY,
	GET_ACTIVITIES,
	GET_ACTIVITY,
	DELETE_ACTIVITY,
	UPDATE_ACTIVITY,
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
		case UPDATE_ACTIVITY:
			return {
				...state,
				activities: state.activities.map((activity) => {
					if (activity.activityId === action.payload.activityId) {
						return {
							...activity,
							...action.payload
						};
					} else {
						return activity;
					}
				})
			};
		case ADD_ACTIVITY:
			return {
				...state,
				activities: [action.payload, ...state.activities]
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
