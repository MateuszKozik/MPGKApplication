import jwt_decode from "jwt-decode";
import setJWTToken from "./setJWTToken";
import { SET_CURRENT_USER } from "./../actions/types";
import { logout } from "./../actions/securityActions";
import store from "./../store";

const isUserLogin = () => {
	const jwtToken = localStorage.jwtToken;
	if (jwtToken) {
		setJWTToken(jwtToken);
		const decodedJwtToken = jwt_decode(jwtToken);
		store.dispatch({
			type: SET_CURRENT_USER,
			payload: decodedJwtToken
		});

		const currentTime = Date.now() / 1000;
		if (decodedJwtToken.exp < currentTime) {
			store.dispatch(logout());
			window.location.href = "/login";
			return false;
		}
		return true;
	}
};

export default isUserLogin;
