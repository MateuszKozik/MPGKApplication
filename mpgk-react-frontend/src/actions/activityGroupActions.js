import axios from "axios";
import { GET_ERRORS, GET_GROUPS, GET_GROUP, DELETE_GROUP } from "./types";

export const addGroup = (group, history) => async (dispatch) => {
    try {
        await axios.post("/api/groups", group);
        history.push("/groups");
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

export const getGroups = () => async (dispatch) => {
    const res = await axios.get("/api/groups");
    dispatch({
        type: GET_GROUPS,
        payload: res.data
    });
};

export const getGroup = (groupId, history) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/groups/${groupId}`);
        dispatch({
            type: GET_GROUP,
            payload: res.data
        });
    } catch (error) {
        history.push("/groups");
    }
};

export const updateGroup = (groupId, updateGroup, history) => async (
    dispatch
) => {
    try {
        await axios.put(`/api/groups/${groupId}`, updateGroup);
        history.push("/groups");
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

export const deleteGroup = (groupId) => async (dispatch) => {
    if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie grupy")) {
        await axios.delete(`/api/groups/${groupId}`);
        dispatch({
            type: DELETE_GROUP,
            payload: groupId
        });
    }
};
