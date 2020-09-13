import axios from "axios";
import { ADD_USER, GET_ERRORS } from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import { hostName } from "./host";

export const addUser = (user) => async (dispatch) => {
	try {
		if (isUserLogin()) {
			const res = await axios.post(`${hostName}/api/users/register`, user);
			dispatch({
				type: ADD_USER,
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
		return error.response;
	}
};
