import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import deviceReducer from "./deviceReducer";
import fluidReducer from "./fluidReducer";
import inspectionTypeReducer from "./inspectionTypeReducer";
import personReducer from "./personReducer";
import activityGroupReducer from "./activityGroupReducer";
import activityReducer from "./activityReducer";
import inspectionReducer from "./inspectionReducer";
import connectionReducer from "./connectionReducer";
import roleReducer from "./roleReducer";
import fluidRegistryReducer from "./fluidRegistryReducer";
import fluidPlaceReducer from "./fluidPlaceReducer";
import snackbarReducer from "./snackbarReducer";

export default combineReducers({
	errors: errorReducer,
	device: deviceReducer,
	fluid: fluidReducer,
	inspectionType: inspectionTypeReducer,
	person: personReducer,
	group: activityGroupReducer,
	activity: activityReducer,
	inspection: inspectionReducer,
	connection: connectionReducer,
	role: roleReducer,
	fluidRegistry: fluidRegistryReducer,
	fluidPlace: fluidPlaceReducer,
	snackbar: snackbarReducer
});
