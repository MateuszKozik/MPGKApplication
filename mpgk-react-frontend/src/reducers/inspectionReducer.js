import {
	GET_INSPECTIONS,
	CLEAR_INSPECTIONS_LIST_STATE,
	GET_INSPECTION_BY_CONNECTION,
	GET_OVERDUE_BY_CONNECTION,
	UPDATE_INSPECTION,
	GET_CONNECTION,
	UPDATE_OVERDUE_INSPECTION,
	DELETE_INSPECTION_BY_CONNECTION
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

		case UPDATE_OVERDUE_INSPECTION:
			return {
				...state,
				overdueInspection: state.overdueInspection.map((inspection) => {
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

		case DELETE_INSPECTION_BY_CONNECTION:
			let newList = [];
			state.inspectionsList.map((inspection) => {
				if (
					!(
						inspection.endTime === action.payload.endTime &&
						inspection.connection.connectionId === action.payload.connectionId
					)
				) {
					newList = [...newList, inspection];
				}
				return inspection;
			});
			return {
				...state,
				inspectionsList: newList
			};

		case GET_CONNECTION:
			return {
				...state,
				inspectionsList: action.payload
			};

		case CLEAR_INSPECTIONS_LIST_STATE:
			return {
				...state,
				inspectionsList: [],
				overdueInspection: [],
				actualInspection: []
			};

		default:
			return state;
	}
}
