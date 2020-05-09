import React from "react";
import { Link } from "react-router-dom";

const AddOvervievTypeButton = () => {
    return (
        <React.Fragment>
            <Link to="/overview-types/add" className="btn btn-info">
                Dodaj rodzaj przeglądu
            </Link>
        </React.Fragment>
    );
};

export default AddOvervievTypeButton;
