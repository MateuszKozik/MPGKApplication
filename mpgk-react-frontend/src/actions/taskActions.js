import axios from "axios";

import isUserLogin from "../securityUtils/isUserLogin";
import {hostName} from "./host";

export const createDailyInspections = (connectionId, history) => async (
	dispatch
) => {
	if (isUserLogin()) {
                try {
                const res = await axios.post(`${hostName}/api/tasks/daily/${connectionId}`); 
                history.push("/connections");
                return res;
                } catch (error) {
                        history.push("/");
                }	
        
	}
};

export const createWeeklyInspections = (connectionId, history) => async (
	dispatch
) => {
	if (isUserLogin()) {
		try {
                const res = await axios.post(`${hostName}/api/tasks/weekly/${connectionId}`); 
                history.push("/connections");
                return res;
		} catch (error) {
		        history.push("/");
                }	
        
	}
};

export const createDayShiftInspections = (connectionId, history) => async (
	dispatch
) => {
	if (isUserLogin()) {
		try {
                const res = await axios.post(`${hostName}/api/tasks/day-shift/${connectionId}`); 
                history.push("/connections");
                return res;
		} catch (error) {
			history.push("/");
                }	
        
	}
};

export const createTwoMonthsInspections = (connectionId, history) => async (
	dispatch
) => {
	if (isUserLogin()) {
		try {
                const res = await axios.post(`${hostName}/api/tasks/two-months/${connectionId}`); 
                history.push("/connections");
                return res;
		} catch (error) {
			history.push("/");
                }
        	
	}
};

export const createYearlyInspections = (connectionId, history) => async (
	dispatch
) => {
	if (isUserLogin()) {
		try {
                const res = await axios.post(`${hostName}/api/tasks/yearly/${connectionId}`); 
                history.push("/connections");
                return res;
		} catch (error) {
			history.push("/");
                }
        	
	}
};




