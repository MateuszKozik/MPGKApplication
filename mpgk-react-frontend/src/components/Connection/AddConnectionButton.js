import React from "react";
import { Link } from "react-router-dom";

const AddConnectionButton = () => {
	return (
		<React.Fragment>
			<Link to="/connections/add" className="btn btn-info">
				Dodaj powiązanie
			</Link>
		</React.Fragment>
	);
};

export default AddConnectionButton;
