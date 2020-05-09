import React, { Component } from "react";
import AddOvervievTypeButton from "./AddOverviewTypeButton";

class OverviewTypeList extends Component {
    render() {
        return (
            <div className="container mt-2">
                <h1 className="display-4 text-center mt-2">
                    Rodzaje przeglądów
                </h1>
                <div className="row">
                    <div className="col-md-4 my-1">
                        <AddOvervievTypeButton />
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default OverviewTypeList;
