import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import FormatDate from "../../Common/FormatDate";
import {
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";

function Row(inspection) {
	const { row } = inspection;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.status}
				</TableCell>
				<TableCell align="left" style={{ fontSize: 18 }}>
					{row.activityGroup && row.activityGroup.name}
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
									{row.inspections &&
										row.inspections.map((item, i) => (
											<TableRow key={i}>
												<TableCell component="th" scope="row">
													{item.activity && item.activity.name}
												</TableCell>
												<TableCell>
													<FormatDate date={item.datetime} />
												</TableCell>
												<TableCell align="left">
													{item.parameter === "true"
														? "Wykonany"
														: item.parameter !== null
														? item.parameter
														: "Nie wykonany"}
												</TableCell>
												<TableCell align="left">{item.comment}</TableCell>
												<TableCell align="left">
													{item.status === "Wykonany" ? (
														<CheckCircleIcon fontSize="large" color="primary" />
													) : item.status === "Nowy" ? (
														<CancelIcon fontSize="large" color="primary" />
													) : (
														<ErrorIcon fontSize="large" color="secondary" />
													)}
												</TableCell>
												<TableCell align="left">
													{item.person &&
														item.person.name + " " + item.person.surname}
												</TableCell>
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
