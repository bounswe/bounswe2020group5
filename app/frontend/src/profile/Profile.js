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
import validate from "./ValidateEditProfile";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  gridroot: {
    flexGrow: 1,
    marginTop: "1rem",
    marginLeft: "2rem",
  },
  paper: {
    height: "30rem",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  txt: {
    fontSize: 20,
  },
  grid2: {
    marginBottom: "1.5rem",
    marginLeft: "6rem",
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
  let [isvendor,setIsVendor] = React.useState(false);

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
  const [val, setVal] = useState({
    first_name: { error: false, message: '' },
    last_name: { error: false, message: '' },
    email: { error: false, message: '' },
    address: { error: false, message: '' },
    username: { error: false, message: '' },
  });


  function handleOnClick() {
    let data;
    const token = localStorage.getItem('token')

    let newVal = (validate(name, val));
    setVal(newVal)
    let valCheck = true;


    for (const key in newVal) {
      if (newVal.hasOwnProperty(key)) {
        const element = newVal[key];
        if (element.error) {
          console.log("error")
          valCheck = false;
        }
      }
    }
    if(valCheck){
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
            } else {
              alert('User with this username or email already exists');
            }
          })
          .catch(err => {
            alert('Some error has occurred')
            console.log(err)
          });
    }
  }

  function onChange(event) {

    if (event.target.id === "first_name") {
      setNameChanged(true);
    }
    if (event.target.id === "last_name") {
      setSurnameChanged(true);
    }
    if (event.target.id === "email") {
      setEmailChanged(true);
    }
    if (event.target.id === "address") {
      setAddressChanged(true);
    }
    if (event.target.id === "username") {
      setUsernameChanged(true);
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
          setIsVendor(json.is_vendor);
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
            <Grid container>
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
                      {!isvendor ? (
                        <ListItem button component={Link} to="/profile/lists">
                            <ListItemIcon>
                              <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Lists"/>
                          </ListItem>
                      ):(
                        <ListItem button component={Link}
                                  to="/add-product">
                          <ListItemIcon>
                            <ListIcon/>
                          </ListItemIcon>
                          <ListItemText primary="Add Product"/>
                        </ListItem>
                      )}
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
                  <Grid item xs={7} style={{marginLeft: "2rem"}}>
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
                      <div style={{marginLeft: "6rem"}}>
                        <div>
                          <TextField
                              className={classes.txtfield}
                              error={val.first_name.error}
                              helperText={val.first_name.message}
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
                              error={val.last_name.error}
                              helperText={val.last_name.message}
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
                              error={val.username.error}
                              helperText={val.username.message}
                              id="username"
                              label="Username"
                              variant="outlined"
                              defaultValue={JSON.parse(JSON.stringify(name.username))}
                              disabled={!edit}
                              onChange={onChange}
                          />
                          <TextField
                              className={classes.txtfield3}
                              error={val.email.error}
                              helperText={val.email.message}
                              id="email"
                              label="E-mail"
                              variant="outlined"
                              defaultValue={JSON.parse(JSON.stringify(name.email))}
                              disabled={true}
                              onChange={onChange}
                          />
                        </div>
                        <div>
                          <TextField
                              className={classes.txtfield2}
                              error={val.address.error}
                              helperText={val.address.message}
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
                                      style={{
                                        width: "20rem",
                                        marginLeft: "8rem",
                                        marginRight: "8rem",
                                        backgroundColor: "#0B3954",
                                      }}
                                      variant="contained" color="primary"
                                      onClick={handleOnClick}
                                  >
                                    Save
                                  </Button>
                              ) :
                              <Button
                                  style={{
                                    width: "20rem",
                                    marginLeft: "8rem",
                                    marginRight: "8rem",
                                    backgroundColor: "#0B3954",
                                  }}
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

