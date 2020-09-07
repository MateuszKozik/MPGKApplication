import React from "react";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import FormatDate from "../Common/FormatDate";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";


function Row(inspection) {
    const { row } = inspection;
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
          <TableCell align="left" style={{ fontSize: 15 }} >
            {row.activityGroup.name}
          </TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nazwa aktywności</TableCell>
                      <TableCell>Data wykonania</TableCell>
                      <TableCell align="left">Parametr</TableCell>
                      <TableCell align="left">Uwagi</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Pracownik</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {row.inspections.map((inspection, i) => (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {inspection.activity && inspection.activity.name}
                        </TableCell>
                        <TableCell><FormatDate date={inspection.datetime} /></TableCell>
                        <TableCell align="left">{inspection.parameter === "true" ? "Wykonany" :inspection.parameter !== null ? inspection.parameter: "Nie wykonany"}</TableCell>
                        <TableCell align="left">{inspection.comment}</TableCell>
                        <TableCell align="left">{inspection.status}</TableCell>
                  <TableCell align="left">{inspection.person && inspection.person.name+ " " + inspection.person.surname} {inspection.supervisor && inspection.supervisor.name+" "+inspection.supervisor.surname}</TableCell>
                      </TableRow>
                     
                    ))}
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
