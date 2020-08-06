import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import deviceReducer from "./deviceReducer";
import fluidReducer from "./fluidReducer";
import overviewTypeReducer from "./overviewTypeReducer";
import personReducer from "./personReducer";
import activityGroupReducer from "./activityGroupReducer";
import activityReducer from "./activityReducer";
import overviewReducer from "./overviewReducer";

export default combineReducers({
    errors: errorReducer,
    device: deviceReducer,
    fluid: fluidReducer,
    overviewType: overviewTypeReducer,
    person: personReducer,
    group: activityGroupReducer,
    activity: activityReducer,
    overview: overviewReducer
});
