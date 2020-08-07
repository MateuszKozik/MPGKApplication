import { GET_ROLES, GET_ROLE, DELETE_ROLE } from "../actions/types";

const initialState = {
	roles: [],
	role: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ROLES:
			return {
				...state,
				roles: action.payload
			};

		case GET_ROLE:
			return {
				...state,
				role: action.payload
			};

		case DELETE_ROLE:
			return {
				...state,
				roles: state.roles.filter((role) => role.name !== action.payload)
			};

		default:
			return state;
	}
}
