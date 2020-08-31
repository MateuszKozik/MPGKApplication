import axios from "axios";
import { 
    GET_ERRORS, 
    GET_PERSONS, 
    GET_PERSON, 
    DELETE_PERSON,
    ADD_PERSON,
    UPDATE_PERSON
} from "./types";

export const addPerson = (person) => async (dispatch) => {
    try {
        const res = await axios.post("/api/persons", person);
        dispatch({
			type: ADD_PERSON,
			payload: res.data
		});
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        return res;
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

export const updatePerson = (personId, updatePerson) => async (
    dispatch
) => {
    try {
        const res = await axios.put(`/api/persons/${personId}`, updatePerson);
        dispatch({
			type: UPDATE_PERSON,
			payload: res.data
		});
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        return res;
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

export const clearPersonState = () => (dispatch) => {
	dispatch({
		type: GET_PERSONS,
		payload: []
	});
};