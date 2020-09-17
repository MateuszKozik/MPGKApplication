import axios from "axios";
import { GET_INSPECTION_TYPES } from "./types";
import isUserLogin from "../securityUtils/isUserLogin";
import { hostName } from "./host";

export const getInspectionTypes = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(`${hostName}/api/inspection-types`);
		dispatch({
			type: GET_INSPECTION_TYPES,
			payload: res.data
		});
	}
};

export const clearInspectionTypeState = () => (dispatch) => {
	dispatch({
		type: GET_INSPECTION_TYPES,
		payload: []
	});
};
