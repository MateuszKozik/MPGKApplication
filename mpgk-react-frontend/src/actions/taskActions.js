import axios from "axios";
import isUserLogin from "../securityUtils/isUserLogin";

export const createOnDemandInspections = (connectionId, history) => async (
	dispatch
) => {
	if (isUserLogin()) {
		if (window.confirm("Czy na pewno chcesz wygenerować przegląd?")) {
			try {
				await axios.post(`/api/tasks/on-demand/${connectionId}`);
				history.push("/");
			} catch (error) {
				history.push("/");
			}
		}
	}
};
