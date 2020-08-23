import {
	GET_INSPECTION_TYPE,
	GET_INSPECTION_TYPES,
	DELETE_INSPECTION_TYPE
} from "../actions/types";

const initialState = {
	inspectionTypes: [],
	inspectionType: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_INSPECTION_TYPES:
			return {
				...state,
				inspectionTypes: action.payload
			};

		case GET_INSPECTION_TYPE:
			return {
				...state,
				inspectionType: action.payload
			};

		case DELETE_INSPECTION_TYPE:
			return {
				...state,
				inspectionTypes: state.inspectionTypes.filter(
					(inspectionType) => inspectionType.typeId !== action.payload
				)
			};

		default:
			return state;
	}
}
