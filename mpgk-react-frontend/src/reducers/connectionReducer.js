import {
	GET_CONNECTIONS,
	GET_CONNECTION,
	DELETE_CONNECTION
} from "../actions/types";

const initialState = {
	connections: [],
	connection: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CONNECTIONS:
			return {
				...state,
				connections: action.payload
			};

		case GET_CONNECTION:
			return {
				...state,
				connection: action.payload
			};

		case DELETE_CONNECTION:
			return {
				...state,
				connections: state.connections.filter(
					(connection) => connection.connectionId !== action.payload
				)
			};

		default:
			return state;
	}
}
