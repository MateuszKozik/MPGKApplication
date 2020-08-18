import axios from "axios";
import { GET_PERIODIC_CONNECTION, GET_ON_DEMAND_CONNECTION } from "./types";

export const createOnDemandOverviews = (connectionId, history) => async (
	dispatch
) => {
	if (window.confirm("Czy na pewno chcesz wygenerować przegląd?")) {
		try {
			await axios.post(`/api/tasks/on-demand/${connectionId}`);
			history.push("/");
		} catch (error) {
			history.push("/");
		}
	}
};

export const getPeriodicConnections = () => async (dispatch) => {
	const res = await axios.get("/api/home/periodic");
	dispatch({
		type: GET_PERIODIC_CONNECTION,
		payload: res.data
	});
};

export const getOnDemandConnections = () => async (dispatch) => {
	const res = await axios.get("/api/home/on-demand");
	dispatch({
		type: GET_ON_DEMAND_CONNECTION,
		payload: res.data
	});
};
