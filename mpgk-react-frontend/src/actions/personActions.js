import axios from "axios";
import {
	GET_ERRORS,
	GET_PERSONS,
	DELETE_PERSON,
	ADD_PERSON,
	UPDATE_PERSON
} from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const addPerson = (person) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/persons`, person);
			dispatch({
				type: ADD_PERSON,
				payload: res.data
			});
			dispatch({
				type: GET_ERRORS,
				payload: {}
			});
			return res;
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const getPersons = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/persons`);
		dispatch({
			type: GET_PERSONS,
			payload: res.data
		});
	}
};

export const updatePerson = (personId, updatedPerson) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.put(`${hostName}/api/persons/${personId}`, updatedPerson);
			dispatch({
				type: UPDATE_PERSON,
				payload: res.data
			});
			dispatch({
				type: GET_ERRORS,
				payload: {}
			});
			return res;
		}
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		});
	}
};

export const deletePerson = (personId) => async (dispatch) => {
	if (isUserLogin()) {
		if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie osoby")) {
			await axios.delete(`${hostName}/api/persons/${personId}`);
			dispatch({
				type: DELETE_PERSON,
				payload: personId
			});
		}
	}
};

export const clearPersonState = () => (dispatch) => {
	dispatch({
		type: GET_PERSONS,
		payload: []
	});
};
