import React from "react";
import { Link } from "react-router-dom";

function AddButton({ className, link, message }) {
	return (
		<Link to={link} className={className}>
			{message}
		</Link>
	);
}

export default AddButton;
