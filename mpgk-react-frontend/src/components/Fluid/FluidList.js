import React, { Component } from "react";
import AddFluidButton from "./AddFluidButton";

class FluidList extends Component {
    render() {
        return (
            <div className="container mt-2">
                <h1 className="display-4 text-center mt-2">Płyny</h1>
                <div className="row">
                    <AddFluidButton />
                </div>
                <div className="table-responsive mt-2">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr className="active">
                                <th>Nazwa</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default FluidList;
