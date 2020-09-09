import {
	GET_INSPECTIONS,
	DELETE_INSPECTION,
	CLEAR_INSPECTIONS_LIST_STATE,
	GET_INSPECTIONS_BY_NAME_ACTIONS,
	GET_INSPECTION_BY_CONNECTION,
	GET_OVERDUE_BY_CONNECTION,
	GET_INSPECTION_BY_CONNECTION_STARTTIME_ENDTIME,
	UPDATE_INSPECTION,
	GET_CONNECTION
} from "../actions/types";

const initialState = {
	inspections: [],
	inspectionsList: [],
	overdueInspection: [],
	actualInspection: [],
	inspection: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_INSPECTIONS:
			return {
				...state,
				inspections: action.payload
			};

		case UPDATE_INSPECTION:
			return {
				...state,
				actualInspection: state.actualInspection.map((inspection) => {
					let edited = [];
					inspection.inspections.map((item) => {
						if (item.inspectionId === action.payload.inspectionId) {
							edited = [...edited, action.payload];
						} else {
							edited = [...edited, item];
						}
						return item;
					});
					inspection.inspections = edited;
					return inspection;
				})
			};

		case GET_INSPECTION_BY_CONNECTION:
			return {
				...state,
				actualInspection: action.payload
			};

		case GET_OVERDUE_BY_CONNECTION:
			return {
				...state,
				overdueInspection: action.payload
			};

		case DELETE_INSPECTION:
			return {
				...state,
				inspections: state.inspections.filter(
					(inspection) => inspection.inspectionId !== action.payload
				)
			};

		case GET_CONNECTION:
			return {
				...state,
				inspectionsList: action.payload
			};

		case GET_INSPECTION_BY_CONNECTION_STARTTIME_ENDTIME:
			return {
				...state,
				inspections: action.payload
			};

		case CLEAR_INSPECTIONS_LIST_STATE:
			return {
				...state,
				inspectionsList: [],
				overdueInspection: [],
				actualInspection: []
			};

		case GET_INSPECTIONS_BY_NAME_ACTIONS:
			return {
				...state,
				inspections: action.payload
			};

		default:
			return state;
	}
}
