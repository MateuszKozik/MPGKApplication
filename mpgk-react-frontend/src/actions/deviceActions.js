import axios from "axios";
import { GET_ERRORS, GET_DEVICES } from "./types";

export const addDevice = (device, history) => async (dispatch) => {
    try {
        await axios.post("/api/devices", device);
        history.push("/devices");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getDevices = () => async (dispatch) => {
    const res = await axios.get("/api/devices");
    dispatch({
        type: GET_DEVICES,
        payload: res.data
    });
};
