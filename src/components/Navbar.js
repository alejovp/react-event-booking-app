import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../context/auth-context';


const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

const Navbar = ({ classes }) => {

	const renderNavBar = context => (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu">
							<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						color="inherit"
						className={classes.grow}>
							EBookings
					</Typography>
					<Button
						component={NavLink}
						to="/events"
						color="inherit">
							Events
					</Button>
					{ context.token && 
						<Button
							component={NavLink}
							to="/bookings"
							color="inherit">
								Bookings
						</Button>}
					{ !context.token && 
						<Button
							component={NavLink}
							to="/auth"
							color="inherit">
								Login
						</Button>}
				</Toolbar>
			</AppBar>
		</div>
	);

	return (
		<AuthContext.Consumer>
			{ context => renderNavBar(context) }
		</AuthContext.Consumer>
	);
};

Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);