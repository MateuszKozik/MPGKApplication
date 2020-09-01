import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import deviceReducer from "./deviceReducer";
import fluidReducer from "./fluidReducer";
import personReducer from "./personReducer";
import activityGroupReducer from "./activityGroupReducer";
import activityReducer from "./activityReducer";
import inspectionReducer from "./inspectionReducer";
import connectionReducer from "./connectionReducer";
import fluidRegistryReducer from "./fluidRegistryReducer";
import fluidPlaceReducer from "./fluidPlaceReducer";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
	errors: errorReducer,
	device: deviceReducer,
	fluid: fluidReducer,
	person: personReducer,
	group: activityGroupReducer,
	activity: activityReducer,
	inspection: inspectionReducer,
	connection: connectionReducer,
	fluidRegistry: fluidRegistryReducer,
	fluidPlace: fluidPlaceReducer,
	snackbar: snackbarReducer
});
