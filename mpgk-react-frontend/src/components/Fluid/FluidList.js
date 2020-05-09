import React, { Component } from "react";
import AddFluidButton from "./AddFluidButton";
import { connect } from "react-redux";
import { getFluids, deleteFluid } from "../../actions/fluidActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class FluidList extends Component {
    componentDidMount() {
        this.props.getFluids();
    }

    onDeleteClick = (fluidId) => {
        this.props.deleteFluid(fluidId);
    };

    render() {
        const { fluids } = this.props.fluid;
        return (
            <div className="container mt-2">
                <h1 className="display-4 text-center mt-2">Płyny</h1>
                <div className="row">
                    <div className="col-md-4 my-1">
                        <AddFluidButton />
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fluids.map((fluid) => (
                                <tr key={fluid.fluidId}>
                                    <td>{fluid.name}</td>
                                    <td>
                                        <Link
                                            to={`/fluids/update/${fluid.fluidId}`}
                                            className="btn btn-primary my-1"
                                        >
                                            Edytuj
                                        </Link>
                                        <button
                                            onClick={this.onDeleteClick.bind(
                                                this,
                                                fluid.fluidId
                                            )}
                                            className="btn btn-danger ml-2 my-1"
                                        >
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

FluidList.propTypes = {
    fluid: PropTypes.object.isRequired,
    getFluids: PropTypes.func.isRequired,
    deleteFluid: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    fluid: state.fluid
});

export default connect(mapStateToProps, { getFluids, deleteFluid })(FluidList);
