import axios from "axios";
import download from "downloadjs";
import isUserLogin from "../securityUtils/isUserLogin";
import { hostName } from "./host";

export const generateInspectionReport = (
	connectionId,
	startTime,
	endTime,
	fileName
) => async (dispatch) => {
	if (isUserLogin()) {
		const res = await axios.get(
			`${hostName}/api/generate/inspection-report/${connectionId}/${startTime}/${endTime}`,
			{ responseType: "blob" }
		);
		const content = res.headers["content-type"];
		download(res.data, fileName, content);
	}
};
