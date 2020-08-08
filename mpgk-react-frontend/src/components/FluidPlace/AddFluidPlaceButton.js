import React from "react";
import { Link } from "react-router-dom";

const addFluidPlaceButton = () => {
	return (
		<React.Fragment>
			<Link to="/fluid-places/add" className="btn btn-info">
				Dodaj miejsce dodania płynu
			</Link>
		</React.Fragment>
	);
};

export default addFluidPlaceButton;
