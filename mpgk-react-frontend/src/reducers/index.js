import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import deviceReducer from "./deviceReducer";

export default combineReducers({
    errors: errorReducer,
    device: deviceReducer
});
