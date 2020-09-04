import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Row from "./Row";

import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles } from "@material-ui/core/styles";
import { tableStyles } from "./../../consts/themeConsts";
import { connect } from "react-redux";
import {
   
    getInspectionByConnectionAndStartTimeAndEndTime,
    clearInspectionsListState
} from "../../actions/inspectionActions";
import {
    Grid,
    Typography,
    IconButton,
    Fab,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    LinearProgress,
    TextField,
    InputAdornment,
    Tooltip
} from "@material-ui/core";




    class InspectionListt extends Component{
        componentDidMount() {
            //this.props.getInspections();

            const { connectionId } = this.props.match.params;
            const { startTime } = this.props.match.params;
            const { endTime } = this.props.match.params;
            this.props.getInspectionByConnectionAndStartTimeAndEndTime(connectionId,startTime,endTime,this.props.history);
        }

        state = {
            open: false
        }
        
    render(){
        const {inspections} = this.props.inspection;
        const {classes} = this.props;
       
  return (
    <>
<Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Typography variant="h2" className={classes.title}>
                            Przegląd
                        </Typography>
                    </Grid>
                    <Grid item xs={false} md={2} />
                    <Grid item xs={12} md={8}>
                        <TableContainer>
                            <Table aria-label="collapsible table">
                                <TableBody>
                                {inspections.map((inspection) => (
                                    
                                    <Row  row={inspection} />

                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={false} md={2} />
                </Grid>

                
            </>
  );
}
    
}

const mapStateToProps = (state) => {
    return {
        inspection: state.inspection
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInspectionByConnectionAndStartTimeAndEndTime: (connectionId,starttime,endtime) => {
            dispatch(getInspectionByConnectionAndStartTimeAndEndTime(connectionId,starttime,endtime));
        },
        clearInspectionsListState: () => {
            dispatch(clearInspectionsListState());
        },
        
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(tableStyles)(InspectionListt));
