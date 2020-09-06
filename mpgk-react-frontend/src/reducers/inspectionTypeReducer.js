import { GET_INSPECTION_TYPES } from "../actions/types";

const initialState = {
	inspectionTypes: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_INSPECTION_TYPES:
			return {
				...state,
				inspectionTypes: action.payload
			};

		default:
			return state;
	}
}
