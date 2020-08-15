import React from "react";

const format = (date, datetime) => {
	const year = date.substring(0, 4);
	const month = date.substring(5, 7);
	const day = date.substring(8, 10);
	const hours = date.substring(11, 13);
	const minutes = date.substring(14, 16);

	if (datetime) {
		return day + "-" + month + "-" + year + " " + hours + ":" + minutes;
	} else {
		return day + "-" + month + "-" + year;
	}
};

function FormatDate({ date, datetime }) {
	return <div>{date && format(date, datetime)}</div>;
}

export default FormatDate;
