import React from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PaymentIcon from '@material-ui/icons/Payment';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: "2rem",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  gridroot: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Profile() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="Home">
        <Navbar/>
      </div>
      <div>
        <CategoryTab/>
      </div>
      <div style={{marginTop: "1rem"}}>
        <Breadcrumbs style={{color:"#0B3954"}} separator="›">
          <Link style={{marginLeft: "3rem",color:"#0B3954"}} to="/">
            Home Page
          </Link>
          <Link style={{color:"#0B3954"}} to="/profile" >
            My Account
          </Link>
        </Breadcrumbs>
      </div>
      <div style={{marginLeft:"2.5rem"}}>
        <IconButton>
          <Badge>
            <AccountCircleOutlinedIcon style={{fontSize:"2.5rem",color:"#525b60"}}/>
          </Badge>
        </IconButton>
        <InputBase
          style={{
            color: "#525B60",
            marginTop:"1.5rem",
            marginBottom:"1rem"
          }}
          defaultValue="Zeynep Çayırçimen"
          inputProps={{ 'aria-label': 'new-arrivals' }}
          disabled={true}
        />
      </div>


      <div>
        <List
          component="nav"
          className={classes.root}
        >
          <ListItem button>
            <ListItemIcon>
              <LocalMallIcon/>
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ListIcon/>
            </ListItemIcon>
            <ListItemText primary="Lists" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Addresses" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PaymentIcon/>
            </ListItemIcon>
            <ListItemText primary="Saved Credit Cards" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <StarBorderIcon/>
            </ListItemIcon>
            <ListItemText primary="Assessments" />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <SettingsIcon/>
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Personal Information" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <text>dldldl</text>
      </div>

    </div>

  );
}

export default Profile;
