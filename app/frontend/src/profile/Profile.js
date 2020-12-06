import React, {useEffect, useState} from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import {Link} from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
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
import Footer from "../components/Footer";
import {serverUrl} from "../common/ServerUrl";
import {useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  gridroot: {
    flexGrow: 1,
    marginTop: "1rem",
    marginLeft: "1rem",
  },
  paper: {
    height:"30rem",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  txt: {
    fontSize: 20,
  },
  grid2: {
    marginBottom: "1.5rem",
  },
  ftr: {
    marginTop: "2rem",
  },
  txtfield: {
    width: "14rem",
    marginBottom: "2rem",
  },
  txtfield2: {
    width: "36rem",
    marginBottom: "2rem",
  },
  txtfield3: {
    width: "20rem",
    marginBottom: "2rem",
    marginLeft: "2rem",
  }
}));

function Profile() {

  const classes = useStyles();
  let [open, setOpen] = React.useState(false);
  let [loadPage, setLoadPage] = React.useState(false);
  let [edit, setEdit] = React.useState(false);
  let [nameChanged, setNameChanged] = React.useState(false);
  let [surnameChanged, setSurnameChanged] = React.useState(false);
  let [emailChanged, setEmailChanged] = React.useState(false);
  let [addressChanged, setAddressChanged] = React.useState(false);
  let [usernameChanged, setUsernameChanged] = React.useState(false);

  let history = useHistory();

  const handleClick = () => {
    setOpen(!open);
  };

  const [name, setName] = useState({
    first_name: '',
    last_name: '',
    email:'',
    address:'',
    username:'',
  });


  function handleOnClick() {
    let data;
    const token = localStorage.getItem('token')

    if(!usernameChanged && !emailChanged){
      data = {
        first_name : name.first_name,
        last_name : name.last_name,
        address : name.address,
      }
    }
    else if(usernameChanged && !emailChanged){
      data = {
        username : name.username,
        first_name : name.first_name,
        last_name : name.last_name,
        address : name.address,
      }
    }
    else if(!usernameChanged && emailChanged){
      data = {
        email : name.email,
        first_name : name.first_name,
        last_name : name.last_name,
        address : name.address,
      }
    }
    else{
      data = {
        email : name.email,
        username : name.username,
        first_name : name.first_name,
        last_name : name.last_name,
        address : name.address,
      }
    }

      fetch(serverUrl + 'api/auth/profile_update/', {
        method: 'POST',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(json => {
          console.log(json)
          const success = json.success
          if (success) {
            alert('Your profile is updated!')
            window.location.reload();
            setEdit(false);
          }
        })
        .catch(err => console.log(err));
  }

  function onChange(event) {

    if(event.target.id === "first_name"){
      setNameChanged(true);
      console.log(nameChanged)
    }
    if(event.target.id === "last_name"){
      setSurnameChanged(true);
      console.log(surnameChanged)
    }
    if(event.target.id === "email"){
      setEmailChanged(true);
      console.log(emailChanged)
    }
    if(event.target.id === "address"){
      setAddressChanged(true);
      console.log(addressChanged)
    }
    if(event.target.id === "username"){
      setUsernameChanged(true);
      console.log(usernameChanged)
    }

    let mutableState = name
    mutableState[event.target.id] = event.target.value
    setName(mutableState)
  }


  useEffect(() => {
    const token = localStorage.getItem('token')

    console.log(token)

    if (token) {
      fetch(serverUrl + 'api/auth/user_info/', {
        method: 'POST',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
      }).then(res => res.json())
        .then(json => {
          setName({
              first_name: json.first_name,
              last_name: json.last_name,
              email: json.email,
              address: json.address,
              username: json.username,
            }
          )
        }).then(() => {
        setLoadPage(true)
      })
        .catch(err => console.log(err));
    } else {
      alert('Please login to see profile page')
      history.push('/login')
    }

  }, []);
  return (

    <div>
      {loadPage ? (
        <div>
          <div className="Home">
            <Navbar/>
          </div>
          <div>
            <CategoryTab/>
          </div>
          <div style={{marginTop: "1rem"}}>
            <Breadcrumbs style={{color: "#0B3954"}} separator="›">
              <Link style={{marginLeft: "3rem", color: "#0B3954"}} to="/">
                Home Page
              </Link>
              <Link style={{color: "#0B3954"}} to="/profile">
                My Account
              </Link>
            </Breadcrumbs>
          </div>


          <div className={classes.gridroot}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <div style={{marginLeft: "1rem"}}>
                    <IconButton>
                      <Badge>
                        <AccountCircleOutlinedIcon
                          style={{fontSize: "2.5rem", color: "#525b60"}}/>
                      </Badge>
                    </IconButton>
                    <InputBase
                      style={{
                        color: "#525B60",
                        marginTop: "1.5rem",
                        marginBottom: "1rem"
                      }}
                      defaultValue={JSON.parse(JSON.stringify(name.first_name)) + ' ' + JSON.parse(JSON.stringify(name.last_name))}
                      inputProps={{'aria-label': 'new-arrivals'}}
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
                        <ListItemText primary="Orders"/>
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <ListIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Lists"/>
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Addresses"/>
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <PaymentIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Saved Credit Cards"/>
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <StarBorderIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Assessments"/>
                      </ListItem>
                      <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                          <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Settings"/>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                      </ListItem>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          <ListItem button className={classes.nested} component={Link}
                                    to="/profile/changepassword">
                            <ListItemText primary="Change Password"/>
                          </ListItem>
                          <ListItem button className={classes.nested}>
                            <ListItemText primary="Personal Information"/>
                          </ListItem>
                        </List>
                      </Collapse>
                    </List>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={5}>
                <Paper className={classes.paper}>
                  <div className={classes.grid2}>
                    <InputBase
                      style={{
                        color: "black",
                        fontSize: 30,
                        fontWeight: "500",
                        marginLeft: "12rem",
                        marginBottom: "2rem"
                      }}
                      defaultValue="My Account"
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div>
                      <TextField
                        className={classes.txtfield}
                        id="first_name"
                        label="Name"
                        variant="outlined"
                        defaultValue={JSON.parse(JSON.stringify(name.first_name))}
                        disabled={!edit}
                        onChange={onChange}
                        /*InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setEdit(true)}>
                                <EditIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}*/
                      />
                      <TextField
                        className={classes.txtfield3}
                        id="last_name"
                        label="Surname"
                        variant="outlined"
                        defaultValue={JSON.parse(JSON.stringify(name.last_name))}
                        disabled={!edit}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                      <TextField
                        className={classes.txtfield}
                        id="username"
                        label="Username"
                        variant="outlined"
                        defaultValue={JSON.parse(JSON.stringify(name.username))}
                        disabled={!edit}
                        onChange={onChange}
                      />
                      <TextField
                        className={classes.txtfield3}
                        id="email"
                        label="E-mail"
                        variant="outlined"
                        defaultValue={JSON.parse(JSON.stringify(name.email))}
                        disabled={!edit}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                      <TextField
                        className={classes.txtfield2}
                        id="address"
                        label="Address"
                        variant="outlined"
                        defaultValue={JSON.parse(JSON.stringify(name.address)) !== '' ?
                          (JSON.parse(JSON.stringify(name.address))) : (' ')
                        }
                        disabled={!edit}
                        multiline={true}
                        onChange={onChange}
                      />
                    </div>
                    <div>
                      {edit ? (
                        <Button
                          style={{width: "20rem",marginLeft:"8rem", marginRight:"8rem", backgroundColor: "#0B3954",}}
                          variant="contained" color="primary"
                          onClick={handleOnClick}
                        >
                          Save
                        </Button>
                      ) :
                        <Button
                          style={{width: "20rem",marginLeft:"8rem", marginRight:"8rem", backgroundColor: "#0B3954",}}
                          variant="contained" color="primary"
                          onClick={() => setEdit(true)}
                        >
                          Edit
                        </Button>
                      }
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <div className={classes.grid2}>
                    <InputBase
                      style={{
                        color: "black",
                        fontSize: 30,
                        fontWeight: "500",
                        marginLeft: "6rem",
                      }}
                      defaultValue="About Us"
                      disabled={true}
                    />
                  </div>

                  <div>
                    <text className={classes.txt}>
                      This page is here to guide you in your bupazar experience!
                    </text>
                  </div>
                  <div style={{marginTop: "1rem"}}>
                    <text className={classes.txt}>
                      You can follow up your orders, edit your addresses, save or remove credit
                      cards, revise your assessments,
                      and change your user settings.
                    </text>
                  </div>
                  <div style={{marginTop: "2rem"}}>
                    <text className={classes.txt}>
                      If you have any request or complain and need to communicate, you can contact
                      us via
                      <br/>
                      <br/>
                      Phone: <span style={{paddingLeft: '20px'}}>(555)-123-45-67</span>
                      <br/>
                      E-mail: <span style={{paddingLeft: '20px'}}>bupazar@contactus.com </span>
                    </text>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
          <div className={classes.ftr}>
            <Footer/>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
