import { GET_ACTIVITIES, GET_ACTIVITY, DELETE_ACTIVITY } from "../actions/types";

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

        case GET_ACTIVITY:
            return {
                ...state,
                activity: action.payload
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
