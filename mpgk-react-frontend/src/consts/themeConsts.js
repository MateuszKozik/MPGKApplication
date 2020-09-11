export const tableStyles = (theme) => ({
	head: {
		backgroundColor: "#3f51b5",
		color: "#fff"
	},
	form: {
		padding: "40px 20px 10px 20px",
		textAlign: "center"
	},
	fab: {
		position: "fixed",
		bottom: "40px",
		right: "40px"
	},
	container: {
		marginTop: "20px"
	},
	title: {
		[theme.breakpoints.down("md")]: {
			fontSize: "30px"
		},
		padding: "5px",
		textAlign: "center"
	},
	search: {
		[theme.breakpoints.down("md")]: {
			textAlign: "center"
		},
		padding: "10px"
	},
	formControl: {
		width: "340px"
	},
	chip: {
		margin: 2
	},
	popover: {
		padding: theme.spacing(2)
	}
});
