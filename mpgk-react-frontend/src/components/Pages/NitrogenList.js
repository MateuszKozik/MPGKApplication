import React, { Component } from "react";
import { connect } from "react-redux";
import { getActionsByName,clearOverviewsListState } from "../../actions/overviewActions";
import PropTypes from "prop-types";



class NitrogenList extends Component {
	componentDidMount() {
        this.props.getActionsByName(this.props.history);
        
	}

	componentWillUnmount() {
		this.props.clearOverviewsListState();
	}


	render() {
        const { overviews } = this.props.overview;
        
		return (
			<div className="container mt-2">
				<h1 className="display-4 text-center mt-2">Rejest wymiany butli z azotem w instalacji ORC</h1>			
				<div className="table-responsive mt-2">
					<table className="table mt-4">
						<thead>
							<tr>
								<th>Nazwa</th>
								<th>Data i godzina</th>
                                <th>Imię i nazwisko</th>
                                
							</tr>
						</thead>
						<tbody>
							{overviews.map((overview) => (
                                
                                
                                    <tr key={overview.overviewId}>
                                        <td>Wymiana butli</td>
                                        <td>{overview.endTime}</td>
                                        <td>{overview.person ? overview.person.name+ " "+ overview.person.surname : null }</td>
                                    </tr>
                                
                                
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

NitrogenList.propTypes = {
	overview: PropTypes.object.isRequired,
	getActionsByName: PropTypes.func.isRequired,
	clearOverviewsListState: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    overview: state.overview
});

export default connect(mapStateToProps, { 
	getActionsByName, 
	clearOverviewsListState
})(NitrogenList);
