import {
	GET_CONNECTIONS,
	GET_CONNECTION,
	DELETE_CONNECTION,
	GET_HOMEPAGE_CONNECTIONS,
	ADD_FLUID_REGISTRY,
	UPDATE_FLUID_REGISTRY
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

		case GET_CONNECTION:
			return {
				...state,
				connection: action.payload
			};

		case GET_HOMEPAGE_CONNECTIONS:
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

		case ADD_FLUID_REGISTRY:
			return {
				...state,
				connections: [action.payload, ...state.connections]
			};

		case UPDATE_FLUID_REGISTRY:
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
