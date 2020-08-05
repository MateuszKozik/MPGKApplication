import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON, DELETE_PERSON } from "./types";

export const addPerson = (person, history) => async (dispatch) => {
    try {
        await axios.post("/api/persons", person);
        history.push("/persons");
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

export const getPersons = () => async (dispatch) => {
    const res = await axios.get("/api/persons");
    dispatch({
        type: GET_PERSONS,
        payload: res.data
    });
};

export const getPerson = (personId, history) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/persons/${personId}`);
        dispatch({
            type: GET_PERSON,
            payload: res.data
        });
    } catch (error) {
        history.push("/persons");
    }
};

export const updatePerson = (personId, updatePerson, history) => async (
    dispatch
) => {
    try {
        await axios.put(`/api/persons/${personId}`, updatePerson);
        history.push("/persons");
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

export const deletePerson = (personId) => async (dispatch) => {
    if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie osoby")) {
        await axios.delete(`/api/persons/${personId}`);
        dispatch({
            type: DELETE_PERSON,
            payload: personId
        });
    }
};