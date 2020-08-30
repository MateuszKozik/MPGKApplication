import {
	GET_DEVICES,
	GET_DEVICE,
	DELETE_DEVICE,
	ADD_DEVICE,
	UPDATE_DEVICE
} from "../actions/types";

const initialState = {
	devices: [],
	device: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_DEVICES:
			return {
				...state,
				devices: action.payload
			};

		case GET_DEVICE:
			return {
				...state,
				device: action.payload
			};

		case UPDATE_DEVICE:
			return {
				...state,
				devices: state.devices.map((device) => {
					if (device.deviceId === action.payload.deviceId) {
						return {
							...device,
							...action.payload
						};
					} else {
						return device;
					}
				})
			};

		case ADD_DEVICE:
			return {
				...state,
				devices: [action.payload, ...state.devices]
			};

		case DELETE_DEVICE: {
			return {
				...state,
				devices: state.devices.filter(
					(device) => device.deviceId !== action.payload
				)
			};
		}

		default:
			return state;
	}
}
