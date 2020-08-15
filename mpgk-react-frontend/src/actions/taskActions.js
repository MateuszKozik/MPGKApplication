import axios from "axios";
import { GET_PERIODIC_CONNECTION } from "./types";

export const createOnDemandOverviews = (connectionId, history) => async (
	dispatch
) => {
	try {
		await axios.post(`/api/tasks/on-demand/${connectionId}`);
		history.push("/");
	} catch (error) {
		history.push("/");
	}
};

export const getPeriodicConnections = () => async (dispatch) => {
	const res = await axios.get("/api/home/periodic");
	dispatch({
		type: GET_PERIODIC_CONNECTION,
		payload: res.data
	});
};
