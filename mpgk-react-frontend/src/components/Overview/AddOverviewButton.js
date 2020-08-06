import React from "react";
import { Link } from "react-router-dom";

const AddOverviewButton = () => {
    return (
        <React.Fragment>
            <Link to="/overviews/add" className="btn btn-info">
                Dodaj przegląd
            </Link>
        </React.Fragment>
    );
};

export default AddOverviewButton;
