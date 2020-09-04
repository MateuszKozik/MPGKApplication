import React from "react";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
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


function Row(inspection) {
    const { row } = inspection;
    const {inspections} = inspection;
    const [open, setOpen] = React.useState(false);
    
  
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.status}
          </TableCell>
          <TableCell align="left">{row.activityGroup.name}</TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Data wykonania</TableCell>
                      <TableCell align="right">Parametr</TableCell>
                      <TableCell align="right">Uwagi</TableCell>
                      <TableCell align="right">Pracownik</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                      <TableRow >
                        <TableCell component="th" scope="row">
                          {row.status}
                          {console.log(row.connection)}
                        </TableCell>
                        <TableCell>{row.inspectionId}</TableCell>
                        <TableCell align="right">{row.startTime}</TableCell>
                        <TableCell align="right">
                          {row.endTime}
                        </TableCell>
                      </TableRow>
                    
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
    
  }
export default Row;
