import axios from "axios";
import {
    GET_ERRORS,
    GET_OVERVIEW_TYPES,
    GET_OVERVIEW_TYPE,
    DELETE_OVERVIEW_TYPE
} from "./types";

export const addOverviewType = (overviewType, history) => async (dispatch) => {
    try {
        await axios.post("/api/overview-types", overviewType);
        history.push("/overview-types");
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

export const getOverviewTypes = () => async (dispatch) => {
    const res = await axios.get("/api/overview-types");
    dispatch({
        type: GET_OVERVIEW_TYPES,
        payload: res.data
    });
};

export const getOverviewType = (typeId, history) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/overview-types/${typeId}`);
        dispatch({
            type: GET_OVERVIEW_TYPE,
            payload: res.data
        });
    } catch (error) {
        history.push("/overview-types");
    }
};

export const updateOverviewType = (typeId, overviewType, history) => async (
    dispatch
) => {
    try {
        await axios.put(`/api/overview-types/${typeId}`, overviewType);
        history.push("/overview-types");
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

export const deleteOverviewType = (typeId) => async (dispatch) => {
    if (
        window.confirm(
            "Czy jesteś pewny? Spowoduje to usunięcie rodzaju przeglądu"
        )
    ) {
        await axios.delete(`api/overview-types/${typeId}`);
        dispatch({
            type: DELETE_OVERVIEW_TYPE,
            payload: typeId
        });
    }
};
