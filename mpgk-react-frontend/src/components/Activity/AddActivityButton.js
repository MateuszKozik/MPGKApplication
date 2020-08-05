import React from "react";
import { Link } from "react-router-dom";

const AddActivityButton = () => {
    return (
        <React.Fragment>
            <Link to="/activities/add" className="btn btn-info">
                Dodaj czynność
            </Link>
        </React.Fragment>
    );
};

export default AddActivityButton;
