import React from "react";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds }) => {
	if (days === 0) {
		if (hours === 0) {
			if (minutes === 0) {
				if (seconds === 1) {
					return <span>{seconds} sekunda </span>;
				} else if (
					seconds <= 4 ||
					(seconds >= 22 && seconds <= 24) ||
					(seconds >= 32 && seconds <= 34) ||
					(seconds >= 42 && seconds <= 44) ||
					(seconds >= 52 && seconds <= 54)
				) {
					return <span>{seconds} sekundy </span>;
				} else {
					return <span>{seconds} sekund </span>;
				}
			}
			if (minutes === 1) {
				return <span>{minutes} minuta </span>;
			} else if (
				minutes <= 4 ||
				(minutes >= 22 && minutes <= 24) ||
				(minutes >= 32 && minutes <= 34) ||
				(minutes >= 42 && minutes <= 44) ||
				(minutes >= 52 && minutes <= 54)
			) {
				return <span>{minutes} minuty </span>;
			} else {
				return <span>{minutes} minut </span>;
			}
		} else if (hours === 1) {
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
