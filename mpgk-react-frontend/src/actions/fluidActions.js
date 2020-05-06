import axios from "axios";
import { GET_ERRORS, GET_FLUIDS, GET_FLUID, DELETE_FLUID } from "./types";

export const addFluid = (fluid, history) => async (dispatch) => {
    try {
        await axios.post("/api/fluids", fluid);
        history.push("/fluids");
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

export const getFluids = () => async (dispatch) => {
    const res = await axios.get("/api/fluids");
    dispatch({
        type: GET_FLUIDS,
        payload: res.data
    });
};

export const getFluid = (fluidId, history) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/fluids/${fluidId}`);
        dispatch({
            type: GET_FLUID,
            payload: res.data
        });
    } catch (error) {
        history.push("/fluids");
    }
};

export const updateFluid = (fluidId, updateFluid, history) => async (
    dispatch
) => {
    try {
        await axios.put(`/api/fluids/${fluidId}`, updateFluid);
        history.push("/fluids");
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

export const deleteFluid = (fluidId) => async (dispatch) => {
    if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie płynu")) {
        await axios.delete(`/api/fluids/${fluidId}`);
        dispatch({
            type: DELETE_FLUID,
            payload: fluidId
        });
    }
};
