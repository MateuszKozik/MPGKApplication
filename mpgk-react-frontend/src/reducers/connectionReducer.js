import {
	GET_CONNECTIONS,
	GET_CONNECTION,
	DELETE_CONNECTION,
	GET_PERIODIC_CONNECTION,
	GET_ON_DEMAND_CONNECTION
} from "../actions/types";

const initialState = {
	connections: [],
	periodicConnections: [],
	onDemandConnections: [],
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

		case GET_PERIODIC_CONNECTION:
			return {
				...state,
				periodicConnections: action.payload
			};

		case GET_ON_DEMAND_CONNECTION:
			return {
				...state,
				onDemandConnections: action.payload
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
