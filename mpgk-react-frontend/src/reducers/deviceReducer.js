import { GET_DEVICES, GET_DEVICE, DELETE_DEVICE } from "../actions/types";

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
