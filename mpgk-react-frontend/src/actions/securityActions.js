import axios from "axios";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import {hostName} from "./host";

export const login = (LoginRequest) => async (dispatch) => {
	try {
		const res = await axios.post(`${hostName}/api/users/login`, LoginRequest);
		const { token } = res.data;

		// Store the token in the localStorage
		localStorage.setItem("jwtToken", token);

		// Set the token in the header
		setJWTToken(token);

		// Decode token on React
		const decoded = jwt_decode(token);

		// Dispatch to securityReducer
		dispatch({
			type: SET_CURRENT_USER,
			payload: decoded
		});
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

export const logout = () => (dispatch) => {
	localStorage.removeItem("jwtToken");
	setJWTToken(false);
	dispatch({
		type: SET_CURRENT_USER,
		payload: {}
	});
};
