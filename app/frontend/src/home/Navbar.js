import React, {useEffect, useState} from 'react';
import {fade, makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginRight: theme.spacing(2),
    marginLeft: '10rem',
    width: '50rem',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7E7F9A',
  },


  inputRoot: {
    color: 'black',
  },
  logged:{
    marginLeft:"17rem",
  },
  notlogged:{
    marginLeft:"10rem",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuBackground:{
    backgroundColor: "white",
  }
}));

export default function Navbar() {
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    const temp = localStorage.getItem('token')
    if (temp) {
      setIsLogged(true)
    }
  }, []);

  const text = {
    color: "black"
  };

  let [isLogged,setIsLogged] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEljoint, setAnchorEljoint] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

 // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setAnchorEl(false);
  }

  const handlejointClose = () => {
    setAnchorEljoint(null);
  };
  const handlejointclick = (event) => {
    setAnchorEljoint(event.currentTarget);
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <StyledMenuItem style={{background:"white"}}>
        <Link style={{textDecoration: 'none'}} to="/profile">
          <ListItemText primaryTypographyProps={{ style: text }} primary="My Account"/>
       </Link>
      </StyledMenuItem>
      <Divider/>
      <StyledMenuItem style={{background:"white"}}>
        <ListItemText primaryTypographyProps={{ style: text }} primary="My Orders" />
      </StyledMenuItem>
      <Divider/>
      <StyledMenuItem style={{background:"white"}}>
        <ListItemText primaryTypographyProps={{ style: text }} primary="My Lists" />
      </StyledMenuItem>
      <Divider/>
      <StyledMenuItem style={{background:"white"}}>
        <ListItemText primaryTypographyProps={{ style: text }} primary="Messages" />
      </StyledMenuItem>
      <Divider/>
      <StyledMenuItem style={{background:"white"}}>
        <Link style={{textDecoration: 'none'}} to="/" onClick={handleLogout}>
          <ListItemText primaryTypographyProps={{ style: text }} primary="Log out" />
        </Link>
      </StyledMenuItem>
    </StyledMenu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon/>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const menujointId = 'login menu';
  const renderjointMenu = (
      <StyledMenu
          id="customized-menu"
          anchorEl={anchorEljoint}
          keepMounted
          open={Boolean(anchorEljoint)}
          onClose={handlejointClose}

      >
        <StyledMenuItem style={{backgroundColor: 'white'}}>
          <Link style={{textDecoration: 'none'}} to="/login">
            <ListItemText  primaryTypographyProps={{ style: text }} primary="Log In" />
          </Link>
        </StyledMenuItem>
        <Divider/>
        <StyledMenuItem style={{backgroundColor: 'white'}}>
          <Link style={{textDecoration: 'none'}} to="/signup">
            <ListItemText primaryTypographyProps={{ style: text }} primary="Sign Up" />
          </Link>
        </StyledMenuItem>

      </StyledMenu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: '#F3DE8A' }}>
        <Toolbar>
          <a className="navbar-brand" href="/">
            <img style={{
              height:"5rem",
              width:"5rem",
            }} src="/img/logo.png" className="navbar-logo" alt=""/>
          </a>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {isLogged ? (
            <div className={classes.logged}>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="primary">
                    <MailIcon style={{ color: '#7E7F9A' }}/>
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="primary">
                    <NotificationsIcon style={{ color: '#7E7F9A' }} />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="primary"
                >
                  <AccountCircle style={{ color: '#7E7F9A' }}/>
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </div>
          ):
          <div className={classes.notlogged}>
            <Button
                style={{backgroundColor:"#0B3954"}}
                variant="contained" color="primary"
                onMouseOver={handlejointclick}
                onClick={handlejointclick}
                >
           Log In
          </Button>



          </div>
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderjointMenu}
    </div>
  );
}
