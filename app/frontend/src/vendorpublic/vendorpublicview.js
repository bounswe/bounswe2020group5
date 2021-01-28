import React, {useEffect, useState, useRef} from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
import {serverUrl} from "../common/ServerUrl";
import {useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Vendorpublicproductlist from "./vendorpublicviewproduclist";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FaceIcon from '@material-ui/icons/Face';
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Badge from "@material-ui/core/Badge";


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
        marginTop: "3rem",
        marginLeft: "10rem",
    },
    paper: {
        margin:'3rem',
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    paper2: {


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
    griflist:{

        marginTop: "3rem",
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

function Vendorpublic() {

    const classes = useStyles();
    let [loadPage, setLoadPage] = React.useState(false);
    let [vendorrating, setVR] = React.useState();
    let [vendorprolist, setvendorprolist] = React.useState();
    let history = useHistory();


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




    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        let data;
        data={vendor_username:'UGURDUNDAR'}

        if (token) {
            fetch(serverUrl + 'api/users/vendor/details', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(json => {

                    {
                        console.log(json)
                        setName({
                        first_name: json.first_name,
                        last_name:  json.last_name,
                        email:  json.email,
                        username: json.username,})
                        setVR(json.rating)
                        setvendorprolist(json.products)

                        {/*json.address.split('/').length > 2 ?
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
                            })*/}


                    }

                }).then(() => {
                setLoadPage(true)
            }).then(json => {
            })
                .catch(err => console.log(err));



        } else {
            alert('Please login to see profile page')
            history.push('/login')
        }



    }, []);


    const renderProducts = () => {

        return vendorprolist.map((e, i) => {
            return (
                <Vendorpublicproductlist
                    product={e}
                />
            );
        });
    };

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


                    <div className={classes.gridroot}>
                        <Grid  container >
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={9} >
                                <Paper className={classes.paper2}>
                                   <div style={{display:'flex',flexDirection:'row'}}>
                                   <IconButton>
                                       <Badge>
                                           <FaceIcon
                                               style={{marginLeft: "15rem",marginBottom: "3rem",fontSize: "2rem", color: "#525b60"}}/>
                                       </Badge>

                                    </IconButton>

                                        <InputBase
                                            style={{
                                                color: "red",
                                                fontSize: 30,
                                                fontWeight: "500",
                                                marginLeft: "3rem",
                                                marginBottom: "3rem"
                                            }}
                                            defaultValue={name.username.toUpperCase()}
                                            disabled={true}
                                        />
                                    </div>

                                    <div style={{marginLeft: "8rem"}}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    fullWidth
                                                    id="first_name"
                                                    label="Name"
                                                    variant="outlined"
                                                    defaultValue={name.first_name}
                                                    disabled={true}
                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    fullWidth
                                                    id="last_name"
                                                    label="Surname"
                                                    variant="outlined"
                                                    defaultValue={name.last_name}
                                                    disabled={true}
                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    fullWidth
                                                    id="username"
                                                    label="Username"
                                                    variant="outlined"
                                                    defaultValue={name.username}
                                                    disabled={true}
                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    fullWidth
                                                    id="email"
                                                    label="E-mail"
                                                    variant="outlined"
                                                    defaultValue={name.email}
                                                    disabled={true}
                                                />
                                            </Grid>

                                            {/*  <Grid item xs={10}>
                                                <TextField
                                                    required
                                                    id="address_1"
                                                    name="address1"
                                                    label="Address line 1"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping address-line1"
                                                    disabled={true}

                                                    defaultValue={name.address_1}

                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    id="address_2"
                                                    name="city"
                                                    label="City"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping address-level2"
                                                    disabled={true}
                                                    defaultValue={name.address_2}


                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    id="address_3"
                                                    disabled={true}
                                                    variant="outlined"
                                                    name="state"
                                                    label="State/Province/Region"
                                                    fullWidth
                                                    defaultValue={name.address_3}

                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    id="address_4"
                                                    name="zip"
                                                    label="Zip / Postal code"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping postal-code"
                                                    disabled={true}
                                                    defaultValue={name.address_4}

                                                />
                                            </Grid>
                                            <Grid item xs={10} sm={5}>
                                                <TextField
                                                    required
                                                    id="address_5"
                                                    name="country"
                                                    label="Country"
                                                    fullWidth
                                                    variant="outlined"
                                                    autoComplete="shipping country"
                                                    disabled={true}
                                                    defaultValue={name.address_5}
                                                />
                                            </Grid>*/}
                                        </Grid>
                                    </div>
                                    <Typography gutterBottom variant="h4" style={{marginTop:'5rem',marginLeft:'13.5rem',color:'black'}}className={classes.griflist}>
                                        CHECK OUT VENDOR PRODUCTS
                                    </Typography>
                                    <Grid className={classes.griflist}>
                                        <React.Fragment>
                                            {vendorprolist&& vendorprolist.length > 0 && <Box>{renderProducts()}</Box>}
                                        </React.Fragment>

                                    </Grid>
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

export default Vendorpublic;
