import axios from "axios";
import { GET_INSPECTION_TYPES } from "./types";
import isUserLogin from "../securityUtils/isUserLogin";

export const getInspectionTypes = () => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get("/api/inspection-types");
		dispatch({
			type: GET_INSPECTION_TYPES,
			payload: res.data
		});
	}
};
