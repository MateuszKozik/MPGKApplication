import React from "react";
import { Link } from "react-router-dom";

const AddActivityGroupButton = () => {
    return (
        <React.Fragment>
            <Link to="/groups/add" className="btn btn-info">
                Dodaj grupę
            </Link>
        </React.Fragment>
    );
};

export default AddActivityGroupButton;
