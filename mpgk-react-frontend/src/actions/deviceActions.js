import axios from "axios";
import { GET_ERRORS, GET_DEVICES, GET_DEVICE, DELETE_DEVICE } from "./types";

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

export const getDevice = (id, history) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/devices/${id}`);
        dispatch({
            type: GET_DEVICE,
            payload: res.data
        });
    } catch (error) {
        history.push("/devices");
    }
};

export const updateDevice = (id, updateDevice, history) => async (dispatch) => {
    try {
        await axios.put(`/api/devices/${id}`, updateDevice);
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

export const deleteDevice = (id) => async (dispatch) => {
    if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie urządzenia")) {
        await axios.delete(`/api/devices/${id}`);
        dispatch({
            type: DELETE_DEVICE,
            payload: id
        });
    }
};
