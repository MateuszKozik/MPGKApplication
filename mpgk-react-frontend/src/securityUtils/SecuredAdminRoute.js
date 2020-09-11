import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredAdminRoute = ({
	component: Component,
	security,
	...otherProps
}) => {
	return (
		<Route
			{...otherProps}
			render={(props) =>
				security.validToken === true &&
				security.user.authorities === "ROLE_ADMIN" ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

SecuredAdminRoute.propTypes = {
	security: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		security: state.security
	};
};

export default connect(mapStateToProps)(SecuredAdminRoute);
