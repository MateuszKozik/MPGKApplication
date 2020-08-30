import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { setSnackbar } from "../../reducers/snackbarReducer";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const CustomizedSnackbars = () => {
	const dispatch = useDispatch();
	const snackbarOpen = useSelector((state) => state.snackbar.snackbarOpen);
	const snackbarMessage = useSelector(
		(state) => state.snackbar.snackbarMessage
	);
	const snackbarTime = useSelector((state) => state.snackbar.snackbarTime);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		dispatch(setSnackbar(false, snackbarMessage, snackbarTime));
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left"
			}}
			open={snackbarOpen}
			autoHideDuration={snackbarTime}
			onClose={handleClose}
			message={snackbarMessage}
			action={
				<IconButton size="small" color="inherit" onClick={handleClose}>
					<CloseIcon fontSize="small" />
				</IconButton>
			}
		/>
	);
};

export default CustomizedSnackbars;
