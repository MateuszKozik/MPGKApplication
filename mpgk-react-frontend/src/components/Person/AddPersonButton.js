import React from "react";
import { Link } from "react-router-dom";

const AddPersonButton = () => {
    return (
        <React.Fragment>
            <Link to="/persons/add" className="btn btn-info">
                Dodaj osobę
            </Link>
        </React.Fragment>
    );
};

export default AddPersonButton;
