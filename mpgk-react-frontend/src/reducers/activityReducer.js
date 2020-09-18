import {
	ADD_ACTIVITY,
	GET_ACTIVITIES,
	UPDATE_ACTIVITY
} from "../actions/types";

const initialState = {
	activities: [],
	activity: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ACTIVITIES:
			return {
				...state,
				activities: action.payload
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

		default:
			return state;
	}
}
