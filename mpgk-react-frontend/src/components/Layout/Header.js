import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "./../../actions/securityActions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter, Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},

	title: {
		[theme.breakpoints.down("md")]: {
			flexGrow: 1
		}
	},
	headerOptions: {
		display: "flex",
		flex: 1
	},
	logoutButton: {
		position: "relative",
		[theme.breakpoints.up("sm")]: {
			marginLeft: "auto"
		}
	}
}));

const Header = (props) => {
	const { history } = props;

	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const handleLogout = () => {
		props.logout();
		window.location.href = "/login";
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClick = (pageURL) => {
		history.push(pageURL);
		setAnchorEl(null);
	};

	const handleButtonClick = (pageURL) => {
		history.push(pageURL);
	};

	const menuItems = [
		{
			menuTitle: "Urządzenia",
			pageURL: "/devices"
		},
		{
			menuTitle: "Czynniki",
			pageURL: "/fluids"
		},
		{
			menuTitle: "Pracownicy",
			pageURL: "/persons"
		},
		{
			menuTitle: "Kategorie czynności",
			pageURL: "/groups"
		},
		{
			menuTitle: "Czynności",
			pageURL: "/activities"
		},
		{
			menuTitle: "Przeglądy",
			pageURL: "/connections"
		},
		{
			menuTitle: "Rejestr płynów",
			pageURL: "/fluid-registries"
		},
		{
			menuTitle: "Miejsca dodania czynników",
			pageURL: "/fluid-places"
		}
	];

	const { validToken, user } = props.security;
	const { authorities } = user;

	const userIsAuthenticated = (
		<AppBar position="static">
			<Toolbar>
				<Link
					style={{ textDecoration: "none", color: "#fff" }}
					to="/"
					className={classes.title}
				>
					<Typography variant="h6">MPGK</Typography>
				</Link>
				{isMobile ? (
					<>
						<MenuItem button={false}>
							<Typography>{user.fullName}</Typography>
						</MenuItem>
						<IconButton
							edge="start"
							className={classes.menuButton}
							style={{ marginLeft: 1 }}
							color="inherit"
							aria-label="menu"
							onClick={() => handleLogout()}
						>
							<ExitToAppIcon />
						</IconButton>
					</>
				) : (
					<div className={classes.headerOptions}>
						<MenuItem button={false} className={classes.logoutButton}>
							<Typography>{user.fullName}</Typography>
						</MenuItem>
						<MenuItem
							className={classes.logoutButton}
							onClick={() => handleLogout()}
						>
							Wyloguj
						</MenuItem>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);

	const adminIsAuthenticated = (
		<AppBar position="static">
			<Toolbar>
				<Link
					style={{ textDecoration: "none", color: "#fff", marginRight: 20 }}
					to="/"
					className={classes.title}
				>
					<Typography variant="h6">MPGK</Typography>
				</Link>
				{isMobile ? (
					<>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
							onClick={handleMenu}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={open}
							onClose={() => setAnchorEl(null)}
						>
							{menuItems.map((menuItem, index) => {
								const { menuTitle, pageURL } = menuItem;
								return (
									<MenuItem
										key={index}
										onClick={() => handleMenuClick(pageURL)}
									>
										{menuTitle}
									</MenuItem>
								);
							})}
							<MenuItem
								className={classes.logoutButton}
								onClick={() => handleLogout()}
							>
								Wyloguj
							</MenuItem>
						</Menu>
					</>
				) : (
					<div className={classes.headerOptions}>
						{menuItems.map((menuItem, index) => {
							const { menuTitle, pageURL } = menuItem;
							return (
								<MenuItem
									key={index}
									onClick={() => handleButtonClick(pageURL)}
								>
									{menuTitle}
								</MenuItem>
							);
						})}
						<MenuItem
							className={classes.logoutButton}
							onClick={() => handleLogout()}
						>
							Wyloguj
						</MenuItem>
					</div>
				)}
			</Toolbar>
		</AppBar>
	);

	let headerLinks;

	if (validToken && user) {
		if (authorities === "ROLE_ADMIN") {
			headerLinks = adminIsAuthenticated;
		} else {
			headerLinks = userIsAuthenticated;
		}
	}
	return <div className={classes.root}>{headerLinks}</div>;
};

const mapStateToProps = (state) => {
	return {
		security: state.security
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(logout());
		}
	};
};

Header.propTypes = {
	security: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
