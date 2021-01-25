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
import {useHistory} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import SearchBar from "material-ui-search-bar";

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {serverUrl} from "../common/ServerUrl";

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
    logged: {
        marginLeft: "17rem",
    },
    notlogged: {
        marginLeft: "10rem",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '40rem',
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
    menuBackground: {
        backgroundColor: "white",
    }
}));


export default function Navbar({notificationpage, messagespage}) {

    const [isLogged, setIsLogged] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [vendoranchorEl, setvendorAnchorEl] = React.useState(null);
    const [anchorEljoint, setAnchorEljoint] = React.useState(null);
    const [value, setValue] = React.useState();
    let [isvendor, setIsVendor] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const classes = useStyles();
    let [unreadmessages, setunreadmessages] = React.useState(null)
    let [notifications, setNotifications] = React.useState("");
    var len;
    let [unseen, setUnseen] = React.useState(0)

    let history = useHistory();


    useEffect(() => {
        const token = localStorage.getItem('token')

        console.log(token)


        if (token) {
            setIsLogged(true)

            fetch(serverUrl + 'api/chats/get_unread_messages_number/', {
                method: 'GET',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},


            }).then(res => res.json())
                .then(json => {

                    if (JSON.parse(JSON.stringify(json)).error == "there is no chat the user is involved") {
                        console.log(json)
                    } else {
                        setunreadmessages(json)
                    }


                })

                .catch(err => console.log(err));
        }
        if(token){
        fetch(serverUrl + 'api/notifications/my/', {
            method: 'GET',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
        }).then(res => res.json())
            .then(json => {
                notifications = json;
                len = Object.keys(JSON.parse(JSON.stringify(json))).length
            }).then(() => {
            var i;
            for(i=0; i<len; i++){
                setNotifications(notifications)
                if(!notifications[i].isSeen){
                    setUnseen(unseen+1)
                }
            }
        }).catch(err => console.log(err ));}


        if (token) {
            fetch(serverUrl + 'api/auth/user_info/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
            }).then(res => res.json())
                .then(json => {
                    setIsVendor(json.is_vendor);
                    localStorage.setItem('isvendor', true)


                })
                .catch(err => console.log(err));
        }


    }, []);


    const text = {
        color: "black"
    };


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
    const handlevendorMenuClose = () => {
        setvendorAnchorEl(null);
        handleMobileMenuClose();
    };

    const handlevendorMenuOpen = (event) => {
        setvendorAnchorEl(event.currentTarget);
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('is_vendor');
        setIsLogged(false);
        setAnchorEl(false);
        setvendorAnchorEl(false)
        history.push("/")
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
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to="/profile">
                    <ListItemText primaryTypographyProps={{style: text}} primary="My Account"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to="/orders">
                    <ListItemText primaryTypographyProps={{style: text}} primary="My Orders"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to="/profile/lists">
                    <ListItemText primaryTypographyProps={{style: text}} primary="My Lists"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to={"/profile/messages"}>
                    <ListItemText primaryTypographyProps={{style: text}} primary="Messages"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to="/" onClick={handleLogout}>
                    <ListItemText primaryTypographyProps={{style: text}} primary="Log out"/>
                </Link>
            </StyledMenuItem>
        </StyledMenu>
    );
    const vendormenuId = 'vendor menu';
    const rendervendorMenu = (
        <StyledMenu
            id="customized-menu"
            anchorEl={vendoranchorEl}
            keepMounted
            open={Boolean(vendoranchorEl)}
            onClose={handlevendorMenuClose}
        >
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to="/profile">
                    <ListItemText primaryTypographyProps={{style: text}} primary="My Account"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <ListItemText primaryTypographyProps={{style: text}} primary="My Sales"/>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to="/vendorproduct">
                    <ListItemText primaryTypographyProps={{style: text}} primary="My Products"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to={"/profile/messages"}>
                    <ListItemText primaryTypographyProps={{style: text}} primary="Messages"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{background: "white"}}>
                <Link style={{textDecoration: 'none'}} to="/" onClick={handleLogout}>
                    <ListItemText primaryTypographyProps={{style: text}} primary="Log out"/>
                </Link>
            </StyledMenuItem>
        </StyledMenu>
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
                    <ListItemText primaryTypographyProps={{style: text}} primary="Log In"/>
                </Link>
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem style={{backgroundColor: 'white'}}>
                <Link style={{textDecoration: 'none'}} to="/signup">
                    <ListItemText primaryTypographyProps={{style: text}} primary="Sign Up"/>
                </Link>
            </StyledMenuItem>

        </StyledMenu>
    );
    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{background: '#F3DE8A'}}>
                <Toolbar>
                    <a className="navbar-brand" href="/">
                        <img style={{
                            height: "5rem",
                            width: "5rem",
                        }} src="/img/logo.png" className="navbar-logo" alt=""/>
                    </a>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={event => {
                                setValue(event.target.value)
                            }}
                            inputProps={{'aria-label': 'search'}}
                            onKeyPress={(ev) => {
                                console.log(`Pressed keyCode ${ev.key}`);
                                if (ev.key === 'Enter') {
                                    localStorage.setItem('searchkey', value)
                                    window.location.replace('/search')

                                }
                            }}
                        />
                    </div>

                    {isLogged ? (

                            <div className={classes.logged}>
                                <div className={classes.grow}/>
                                <div className={classes.sectionDesktop}>

                                    {!isvendor ? <IconButton aria-label="cart" onClick={() => {
                                        history.push("/payment")
                                    }}>
                                        <ShoppingCartIcon style={{color: '#7A0010'}}/>
                                    </IconButton> : null}
                                    <Link to={'/profile/messages'}>
                                        <IconButton aria-label="show new mails" color="inherit">
                                            <Badge badgeContent={messagespage == true ? null : unreadmessages}
                                                   color="primary">
                                                <MailIcon style={{color: '#7E7F9A'}}/>
                                            </Badge>
                                        </IconButton>
                                    </Link>
                                    {!isvendor ?<div style={{display:'flex',flexDirection:'row'}}>
                                    <Link to={'/notifications'}>
                                        <IconButton aria-label="show new notifications" color="inherit">
                                            <Badge badgeContent={notificationpage==true ? null:unseen} color="primary">
                                                <NotificationsIcon style={{ color: '#7E7F9A' }} />
                                            </Badge>
                                        </IconButton>
                                    </Link>


                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={handleProfileMenuOpen}
                                            color="primary"
                                        >
                                            <AccountCircle style={{color: '#7E7F9A'}}/>
                                        </IconButton> </div>:
                                        <IconButton

                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={vendormenuId}
                                            aria-haspopup="true"
                                            onClick={handlevendorMenuOpen}
                                            color="primary"

                                        >
                                            <AccountCircle style={{color: '#7E7F9A'}}/>
                                        </IconButton>}
                                </div>


                            </div>
                        ) :

                        <div className={classes.notlogged}>
                            <Button
                                style={{backgroundColor: "#0B3954"}}
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

            {isvendor ? rendervendorMenu : renderMenu}

            {renderjointMenu}

        </div>
    );
}
