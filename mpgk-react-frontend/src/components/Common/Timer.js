import React from "react";
import Countdown from "react-countdown";

const renderer = ({ days, hours }) => {
	if (days === 0) {
		if (hours === 1) {
			return <span>{hours} godzina</span>;
		} else if (hours <= 4 || hours >= 22) {
			return <span>{hours} godziny</span>;
		} else {
			return <span>{hours} godzin</span>;
		}
	} else if (days === 1) {
		if (hours === 1) {
			return (
				<span>
					{days} dzień {hours} godzina
				</span>
			);
		} else if (hours <= 4 || hours >= 22) {
			return (
				<span>
					{days} dzień {hours} godziny
				</span>
			);
		} else {
			return (
				<span>
					{days} dzień {hours} godzin
				</span>
			);
		}
	} else {
		if (hours === 1) {
			return (
				<span>
					{days} dni {hours} godzina
				</span>
			);
		} else if (hours <= 4 || hours >= 22) {
			return (
				<span>
					{days} dni {hours} godziny
				</span>
			);
		} else {
			return (
				<span>
					{days} dni {hours} godzin
				</span>
			);
		}
	}
};

function Timer({ date }) {
	return <Countdown date={date} renderer={renderer} />;
}

export default Timer;
