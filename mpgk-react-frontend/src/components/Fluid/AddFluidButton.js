import React from "react";
import { Link } from "react-router-dom";

const AddFluidButton = () => {
    return (
        <React.Fragment>
            <Link to="/fluids/add" className="btn btn-info">
                Dodaj płyn
            </Link>
        </React.Fragment>
    );
};

export default AddFluidButton;
