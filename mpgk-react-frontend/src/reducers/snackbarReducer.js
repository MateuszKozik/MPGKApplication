import { SET_SNACKBAR } from "../actions/types";

const initialState = {
	snackbarOpen: false,
	snackbarMessage: "",
	snackbarTime: 3000
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SNACKBAR:
			const { snackbarOpen, snackbarMessage, snackbarTime } = action;
			return {
				...state,
				snackbarOpen,
				snackbarMessage,
				snackbarTime
			};
		default:
			return state;
	}
};

export const setSnackbar = (
	snackbarOpen,
	snackbarMessage = "",
	snackbarTime = 3000
) => ({
	type: SET_SNACKBAR,
	snackbarOpen,
	snackbarMessage,
	snackbarTime
});
