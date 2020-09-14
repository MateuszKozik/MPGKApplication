import axios from "axios";
import { GET_ROLES } from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import { hostName } from "./host";

export const getRoles = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/roles`);
		dispatch({
			type: GET_ROLES,
			payload: res.data
		});
	}
};

export const clearRoleState = () => (dispatch) => {
	dispatch({
		type: GET_ROLES,
		payload: []
	});
};
