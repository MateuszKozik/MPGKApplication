import React, { Component } from "react";
import AddOvervievTypeButton from "./AddOverviewTypeButton";
import { connect } from "react-redux";
import {
    getOverviewTypes,
    deleteOverviewType
} from "../../actions/overviewTypeActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class OverviewTypeList extends Component {
    componentDidMount() {
        this.props.getOverviewTypes();
    }

    onDeleteClick = (typeId) => {
        this.props.deleteOverviewType(typeId);
    };

    render() {
        const { overviewTypes } = this.props.overviewType;
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
                        <tbody>
                            {overviewTypes.map((overviewType) => (
                                <tr key={overviewType.typeId}>
                                    <td>{overviewType.name}</td>
                                    <td>
                                        <Link
                                            to={`/overview-types/update/${overviewType.typeId}`}
                                            className="btn btn-primary my-1"
                                        >
                                            Edytuj
                                        </Link>
                                        <button
                                            onClick={this.onDeleteClick.bind(
                                                this,
                                                overviewType.typeId
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

OverviewTypeList.propTypes = {
    overviewType: PropTypes.object.isRequired,
    getOverviewTypes: PropTypes.func.isRequired,
    deleteOverviewType: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    overviewType: state.overviewType
});

export default connect(mapStateToProps, {
    getOverviewTypes,
    deleteOverviewType
})(OverviewTypeList);
