import React from "react";
import { Link } from "react-router-dom";

const addFluidRegistryButton = () => {
	return (
		<React.Fragment>
			<Link to="/fluid-registries/add" className="btn btn-info">
				Dodaj rejestr płynu
			</Link>
		</React.Fragment>
	);
};

export default addFluidRegistryButton;
