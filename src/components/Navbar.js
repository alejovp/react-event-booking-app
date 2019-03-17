import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import AccountCircle from '@material-ui/icons/AccountCircle';
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

class Navbar extends Component {

	state = {
		anchorEl: undefined
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	}
	
	handleClose = () => {
		this.setState({ anchorEl: undefined });
	}

	renderNavBar = context => {
		const { classes } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
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
						{ !context.token && 
							<Button
								component={NavLink}
								to="/auth"
								color="inherit">
									Login
							</Button>}
						{ context.token && 
							<div>
								<Button
									component={NavLink}
									to="/bookings"
									color="inherit">
										Bookings
								</Button>
								<IconButton
									aria-owns={open ? 'menu-appbar' : undefined}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Popper 
									open={open} 
									anchorEl={anchorEl} 
									transition 
									disablePortal
								>
									{({ TransitionProps, placement }) => (
										<Grow
											{...TransitionProps}
											id="menu-appbar"
											style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
										>
											<Paper>
												<ClickAwayListener onClickAway={this.handleClose}>
													<MenuList>
														<MenuItem>My account</MenuItem>
														<MenuItem onClick={context.logout}>Logout</MenuItem>
													</MenuList>
												</ClickAwayListener>
											</Paper>
										</Grow>
									)}
								</Popper>
							</div>
						}
					</Toolbar>
				</AppBar>
			</div>
		);
	}

	render () {
		return (
			<AuthContext.Consumer>
				{ context => this.renderNavBar(context) }
			</AuthContext.Consumer>
		);
	}
}

Navbar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);