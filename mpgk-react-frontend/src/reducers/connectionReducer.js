import {
	GET_CONNECTIONS,
	DELETE_CONNECTION,
	GET_HOMEPAGE,
	UPDATE_CONNECTION,
	ADD_CONNECTION
} from "../actions/types";

const initialState = {
	connections: [],
	homePageConnections: [],
	connection: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CONNECTIONS:
			return {
				...state,
				connections: action.payload
			};

		case GET_HOMEPAGE:
			return {
				...state,
				homePageConnections: action.payload
			};

		case DELETE_CONNECTION:
			return {
				...state,
				connections: state.connections.filter(
					(connection) => connection.connectionId !== action.payload
				)
			};

		case ADD_CONNECTION:
			return {
				...state,
				connections: [action.payload, ...state.connections]
			};

		case UPDATE_CONNECTION:
			return {
				...state,
				connections: state.connections.map((connection) => {
					if (connection.connectionId === action.payload.connectionId) {
						return {
							...connection,
							...action.payload
						};
					} else {
						return connection;
					}
				})
			};
		default:
			return state;
	}
}
