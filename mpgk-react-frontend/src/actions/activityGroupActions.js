import axios from "axios";
import { 
     ADD_GROUP,
     GET_ERRORS,
     GET_GROUPS,  
     DELETE_GROUP,
     UPDATE_GROUP 
} from "./types";

export const addGroup = (group) => async (dispatch) => {
    try {
        const res = await axios.post("/api/groups", group);
        dispatch({
			type: ADD_GROUP,
			payload: res.data
		});
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        return res;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const getGroups = () => async (dispatch) => {
    const res = await axios.get("/api/groups");
    dispatch({
        type: GET_GROUPS,
        payload: res.data
    });
};

export const updateGroup = (groupId, updateGroup) => async (
    dispatch
) => {
    try {
        const res = await axios.put(`/api/groups/${groupId}`, updateGroup);
        dispatch({
			type: UPDATE_GROUP,
			payload: res.data
		});
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        return res;
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deleteGroup = (groupId) => async (dispatch) => {
    if (window.confirm("Czy jesteś pewny? Spowoduje to usunięcie grupy")) {
        await axios.delete(`/api/groups/${groupId}`);
        dispatch({
            type: DELETE_GROUP,
            payload: groupId
        });
    }
};

export const clearGroupState = () => (dispatch) => {
	dispatch({
		type: GET_GROUPS,
		payload: []
	});
};
