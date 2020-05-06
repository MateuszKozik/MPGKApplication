import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import deviceReducer from "./deviceReducer";
import fluidReducer from "./fluidReducer";

export default combineReducers({
    errors: errorReducer,
    device: deviceReducer,
    fluid: fluidReducer
});
