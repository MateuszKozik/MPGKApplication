import axios from "axios";
import { GET_INSPECTION_TYPES } from "./types";

export const getInspectionTypes = () => async (dispatch) => {
	const res = await axios.get("/api/inspection-types");
	dispatch({
		type: GET_INSPECTION_TYPES,
		payload: res.data
	});
};
