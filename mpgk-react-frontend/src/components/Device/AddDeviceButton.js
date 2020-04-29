import React from "react";
import { Link } from "react-router-dom";

const AddDeviceButton = () => {
    return (
        <React.Fragment>
            <Link to="/devices/add" className="btn btn-info">
                Dodaj urządzenie
            </Link>
        </React.Fragment>
    );
};

export default AddDeviceButton;
