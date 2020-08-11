import axios from "axios";

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
