import React, {useEffect, useState, useRef} from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import {Link} from "react-router-dom";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ReorderIcon from '@material-ui/icons/Reorder';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HomeIcon from '@material-ui/icons/Home';
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
import LockIcon from '@material-ui/icons/Lock';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MapContainer from "../components/googlemap";
import Geocoder from "react-native-geocoding";
import Tooltip from "@material-ui/core/Tooltip";


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

        height: "35rem",
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    paper2: {
        height: "60rem",

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
        width: "16rem",
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
    let [isvendor, setIsVendor] = React.useState(false);
    let [vendorrating, setVR] = React.useState();
    let [latt, setlat] = React.useState();
    let [lngg, setlng] = React.useState();
    let [address, setaddress] = React.useState();
    let [gooadd1, setgooadd1] = useState('');
    let [gooadd2, setgooadd2] = useState('');
    let [gooadd3, setgooadd3] = useState('');
    let [gooadd4, setgooadd4] = useState('');
    let [gooadd5, setgooadd5] = useState('');


    Geocoder.init("AIzaSyAMFkjk7UKH5zfJuVCzYbt5l_H4EP4CmiA")



    let history = useHistory();

    const handleClick = () => {
        setOpen(!open);

    };


    let [name, setName] = useState({

        first_name: '',
        last_name: '',
        email: '',
        username: '',
        address_1: '',
        address_2: '',
        address_3: '',
        address_4: '',
        address_5: '',
    });

    let [val, setVal] = useState({

        first_name: {error: false, message: ''},
        last_name: {error: false, message: ''},
        email: {error: false, message: ''},
        address_1: {error: false, message: ''},
        address_2: {error: false, message: ''},
        address_3: {error: false, message: ''},
        address_4: {error: false, message: ''},
        address_5: {error: false, message: ''},
        username: {error: false, message: ''},

    });


    function handlegoogleaddress() {
        let mutableState = name

        mutableState['address_1'] = gooadd1
        mutableState['address_2'] = gooadd2
        mutableState['address_3'] = gooadd3
        mutableState['address_4'] = gooadd4
        mutableState['address_5'] = gooadd5

        setName(mutableState)
        const token = localStorage.getItem('token')
        let data;

        data = {
            first_name: name.first_name,
            last_name: name.last_name,
            address: name.address_1 + "/" + name.address_2 + "/" + name.address_3 + "/" + name.address_4 + "/" + name.address_5,
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
                    alert('Address is successfully updated!')
                    window.location.reload();
                    setEdit(false);
                } else {

                }
            })
            .catch(err => {
                alert('Some error has occurred')
                console.log(err)
            });


    };


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
        if (valCheck) {
            if (!usernameChanged && !emailChanged) {
                data = {
                    first_name: name.first_name,
                    last_name: name.last_name,
                    address: name.address_1 + "/" + name.address_2 + "/" + name.address_3 + "/" + name.address_4 + "/" + name.address_5,
                }
            } else if (usernameChanged && !emailChanged) {
                data = {
                    username: name.username,
                    first_name: name.first_name,
                    last_name: name.last_name,
                    address: name.address_1 + "/" + name.address_2 + "/" + name.address_3 + "/" + name.address_4 + "/" + name.address_5,
                }
            } else if (!usernameChanged && emailChanged) {
                data = {
                    email: name.email,
                    first_name: name.first_name,
                    last_name: name.last_name,
                    address: name.address_1 + "/" + name.address_2 + "/" + name.address_3 + "/" + name.address_4 + "/" + name.address_5,
                }
            } else {
                data = {
                    email: name.email,
                    username: name.username,
                    first_name: name.first_name,
                    last_name: name.last_name,
                    address: name.address_1 + "/" + name.address_2 + "/" + name.address_3 + "/" + name.address_4 + "/" + name.address_5,
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


    function componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
                console.log(position.coords.longitude);
                setlat(position.coords.latitude);
                setlng(position.coords.longitude);
                Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                        console.log(json)
                        var addressComponent = json.results[0].formatted_address;
                        setaddress(addressComponent)

                        setgooadd1(addressComponent.toString().split(',')[0] + ',' +
                            addressComponent.toString().split(',')[1])
                        setgooadd2(addressComponent.toString().split(',')
                            [addressComponent.toString().split(',').length - 2].split('/')[1].split(',')[0])
                        setgooadd3(addressComponent.toString().split(',')[addressComponent.toString().split(',').length - 2].split('/')[0].split(' ')
                            [addressComponent.toString().split(',')[addressComponent.toString().split(',').length - 2].split('/')[0].split(' ').length - 1])
                        setgooadd4(addressComponent.toString().split(',')[addressComponent.toString().split(',').length - 2].split('/')[0].split(' ')
                            [addressComponent.toString().split(',')[addressComponent.toString().split(',').length - 2].split('/')[0].split(' ').length - 2])
                        setgooadd5(addressComponent.toString().split(',')[addressComponent.toString().split(',').length - 1].split(' ')[1])


                    })
                    .catch(error => console.warn(error));

            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        , []);
    }

    const isMounted = useRef(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        componentDidMount()
        console.log(token)
        isMounted.current = true;


        if (token) {
            fetch(serverUrl + 'api/auth/user_info/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
            }).then(res => res.json())
                .then(json => {

                    {
                        json.address.split('/').length > 2 ?
                            setName({
                                first_name: JSON.parse(JSON.stringify(json.first_name)),
                                last_name: JSON.parse(JSON.stringify(json.last_name)),
                                email: JSON.parse(JSON.stringify(json.email)),
                                address_1: JSON.parse(JSON.stringify(json.address.split("/")[0])),
                                address_2: JSON.parse(JSON.stringify(json.address.split("/")[1])),
                                address_3: JSON.parse(JSON.stringify(json.address.split("/")[2])),
                                address_4: JSON.parse(JSON.stringify(json.address.split("/")[3])),
                                address_5: JSON.parse(JSON.stringify(json.address.split("/")[4])),
                                username: JSON.parse(JSON.stringify(json.username)),
                            })
                            :
                            setName({
                                first_name: JSON.parse(JSON.stringify(json.first_name)),
                                last_name: JSON.parse(JSON.stringify(json.last_name)),
                                email: JSON.parse(JSON.stringify(json.email)),
                                address_1: ' ',
                                address_2: ' ',
                                address_3: ' ',
                                address_4: ' ',
                                address_5: ' ',
                                username: JSON.parse(JSON.stringify(json.username)),
                            })

                        if(json.is_vendor) {
                            fetch(serverUrl + 'api/orders/avg-rating-profile-page/', {
                                method: 'POST',
                                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                            }).then(res => res.json())
                                .then(json => {
                                    setVR(json.score.toFixed(1));
                                })
                        }
                    }
                    setIsVendor(json.is_vendor);
                }).then(() => {
                setLoadPage(true)
            }).then(json => {
            })
                .catch(err => console.log(err));



        } else {
            alert('Please login to see profile page')
            history.push('/login')
        }


        return () => isMounted.current = false;


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
                                    {!isvendor ? (
                                        <div>
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
                                                    defaultValue={name.first_name + ' ' + name.last_name}
                                                    inputProps={{'aria-label': 'new-arrivals'}}
                                                    disabled={true}
                                                />
                                            </div>
                                            <List
                                                component="nav"
                                                className={classes.root}
                                            >
                                                <ListItem style={{marginTop: '1rem', marginBottom: '1rem'}} button component={Link} to="/orders">
                                                    <ListItemIcon>
                                                        <LocalMallIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Orders"/>
                                                </ListItem>
                                                <ListItem style={{marginTop: '1rem', marginBottom: '1rem'}} button
                                                          component={Link} to="/profile/lists">
                                                    <ListItemIcon>
                                                        <ListIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText style={{marginTop: '1rem', marginBottom: '1rem'}}
                                                                  primary="Lists"/>
                                                </ListItem>
                                                <ListItem style={{marginTop: '1rem', marginBottom: '1rem'}} button 
                                                    component={Link} to="/profile/savedcards" >
                                                    <ListItemIcon>
                                                        <PaymentIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText style={{marginTop: '1rem', marginBottom: '1rem'}}
                                                                  primary="Saved Credit Cards"/>
                                                </ListItem>
                                                <ListItem style={{marginTop: '1rem', marginBottom: '1rem'}} button
                                                     component={Link} to="/profile/assessments">
                                                    <ListItemIcon>
                                                        <StarBorderIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Assessments"/>
                                                </ListItem>
                                                <ListItem button style={{marginTop: '1rem', marginBottom: '1rem'}} component={Link} to="/profile/changepassword">
                                                  <ListItemIcon>
                                                    <LockIcon/>
                                                  </ListItemIcon>
                                                  <ListItemText primary="Change Password"/>
                                                </ListItem>
                                               
                                            </List>
                                        </div>
                                    ) : (
                                        <div>
                                            <div>
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
                                                    defaultValue={name.first_name + ' ' + name.last_name}
                                                    inputProps={{'aria-label': 'new-arrivals'}}
                                                    disabled={true}
                                                />
                                                {vendorrating>=8 ? (<Button style={{background:"#40a119", fontSize:"1rem", color:"white", display: 'inline-block'}} variant="contained" disabled>{vendorrating}</Button>):
                                                    vendorrating>=5 ? (<Button style={{background:"#f3de8a", fontSize:"1rem", color:"#0b3954",display: 'inline-block'}} variant="contained" disabled>{vendorrating}</Button>):
                                                        (<Button style={{background:"#a71325", fontSize:"1rem", color:"white", display: 'inline-block'}} variant="contained" disabled>{vendorrating}</Button>)}
                                            </div>
                                            <List
                                                component="nav"
                                                className={classes.root}
                                            >
                                                <ListItem button style={{marginTop: '1rem', marginBottom: '1rem'}} component={Link} to="/vendororders">
                                                    <ListItemIcon>
                                                        <LocalMallIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Sales"/>
                                                </ListItem>
                                                <ListItem button style={{marginTop: '1rem', marginBottom: '1rem'}}
                                                          component={Link}
                                                          to="/vendorproduct">
                                                    <ListItemIcon>
                                                        <ReorderIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="My Products"/>
                                                </ListItem>
                                                <ListItem button style={{marginTop: '1rem', marginBottom: '1rem'}}
                                                          component={Link}
                                                          to="/add-product">
                                                    <ListItemIcon>
                                                        <AddCircleIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Add Product"/>
                                                </ListItem>
                                                <ListItem button style={{marginTop: '1rem', marginBottom: '1rem'}} component={Link} to="/profile/changepassword">
                                                  <ListItemIcon>
                                                    <LockIcon/>
                                                  </ListItemIcon>
                                                  <ListItemText primary="Change Password"/>
                                                </ListItem>
                                                
                                            </List>
                                        </div>

                                    )}
                                </Paper>
                            </Grid>
                            <Grid item xs={7} style={{marginLeft: "2rem"}}>
                                <Paper className={classes.paper2}>
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
                                      <Grid container spacing={3}>
                                        <Grid item xs={10} sm={5}>
                                            <TextField
                                               fullWidth
                                                error={val.first_name.error}
                                                helperText={val.first_name.message}
                                                id="first_name"
                                                label="Name"
                                                variant="outlined"
                                                defaultValue={name.first_name}
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
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                            <TextField
                                                fullWidth
                                                error={val.last_name.error}
                                                helperText={val.last_name.message}
                                                id="last_name"
                                                label="Surname"
                                                variant="outlined"
                                                defaultValue={name.last_name}
                                                disabled={!edit}
                                                onChange={onChange}
                                            />
                                            </Grid>
                                        <Grid item xs={10} sm={5}>
                                            <TextField
                                                fullWidth
                                                error={val.username.error}
                                                helperText={val.username.message}
                                                id="username"
                                                label="Username"
                                                variant="outlined"
                                                defaultValue={name.username}

                                                disabled={!edit}
                                                onChange={onChange}
                                            />
                                                  </Grid>
                                            <Grid item xs={10} sm={5}>
                                            <TextField
                                                fullWidth
                                                error={val.email.error}
                                                helperText={val.email.message}
                                                id="email"
                                                label="E-mail"
                                                variant="outlined"
                                                defaultValue={name.email}
                                                disabled={true}
                                                onChange={onChange}
                                            />
                                        </Grid>
                                        {/*<div>
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
                        </div>*/}


                                        
                                            <Grid item xs={10}>
                                                <TextField
                                                    required
                                                    error={val.address_1.error}
                                                    helperText={val.address_1.message}
                                                    id="address_1"
                                                    name="address1"
                                                    label="Address line 1"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping address-line1"
                                                    disabled={!edit}

                                                    defaultValue={name.address_1}

                                                    onChange={onChange}

                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    error={val.address_2.error}
                                                    helperText={val.address_2.message}
                                                    id="address_2"
                                                    name="city"
                                                    label="City"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping address-level2"
                                                    disabled={!edit}
                                                    onChange={onChange}
                                  defaultValue={name.address_2}


                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    id="address_3"
                                                    error={val.address_3.error}
                                                    helperText={val.address_3.message}
                                                    disabled={!edit}
                                                    variant="outlined"
                                                    name="state"
                                                    label="State/Province/Region"
                                                    fullWidth
                                                    onChange={onChange}

                                                    defaultValue={name.address_3}

                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    error={val.address_4.error}
                                                    helperText={val.address_4.message}
                                                    id="address_4"
                                                    name="zip"
                                                    label="Zip / Postal code"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping postal-code"
                                                    disabled={!edit}
                                                    onChange={onChange}

                                                    defaultValue={name.address_4}

                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    error={val.address_5.error}
                                                    helperText={val.address_5.message}
                                                    id="address_5"
                                                    name="country"
                                                    label="Country"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping country"
                                                    disabled={!edit}
                                                    onChange={onChange}
                                                    defaultValue={name.address_5}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <div style={{marginTop: '2rem', display: 'flex', flexDirection: 'row'}}>
                                                    <MapContainer lat={latt} lng={lngg} address={address}/>
                                                    {edit ? (<Tooltip
                                                        title="Direct Address Edit to Current Location"><IconButton
                                                        onClick={() => handlegoogleaddress()}
                                                        style={{
                                                            width: "5rem",
                                                            height: "5rem",
                                                            marginTop: '0rem',
                                                            marginLeft: "0.5rem",
                                                            marginRight: "0.5rem",
                                                            color: "#a71325"

                                                        }} aria-label="home">
                                                        <HomeIcon fontSize="large"/>
                                                    </IconButton></Tooltip>) : ''}
                                                </div>

                                            </Grid>
                                        </Grid>

                                        <div style={{marginTop: '2rem'}}>


                                            {edit ? (
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Button
                                                            style={{
                                                                width: "20rem",

                                                                marginLeft: "1rem",
                                                                marginRight: "1rem",

                                                                marginTop: "1rem",
                                                                backgroundColor: "#0B3954",
                                                            }}
                                                            variant="contained" color="primary"
                                                            onClick={handleOnClick}
                                                        >
                                                            Save
                                                        </Button>
                                                        <Button
                                                            style={{
                                                                width: "20rem",
                                                                marginLeft: "1rem",
                                                                marginRight: "8rem",
                                                                marginTop: "1rem",
                                                                backgroundColor: "#a71325",
                                                            }}
                                                            variant="contained" color="primary"
                                                            onClick={() => setEdit(false)}
                                                        >Cancel
                                                        </Button></div>
                                                ) :
                                                <Button
                                                    style={{
                                                        width: "20rem",
                                                        marginLeft: "10rem",
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
