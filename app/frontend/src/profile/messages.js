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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
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

function Messages() {

    const classes = useStyles();
    let [open, setOpen] = React.useState(false);
    let [loadPage, setLoadPage] = React.useState(true);

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






    const getchathistory = () => {
        const token = localStorage.getItem('token')
        let messagehistory;



        messagehistory= {
            "chat_id": '25',
        }


        console.log(token)

        if (token) {
            fetch(serverUrl + 'api/chats/get_chat_history/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify(messagehistory),
            }).then(res => res.json())
                .then(json => {
                   console.log(json)
                }).then(() => {
                setLoadPage(true)
            })
                .catch(err => console.log(err));
        } else {
            alert('Please login to see profile page')
        }

    };

    const getallchats = () => {
        const token = localStorage.getItem('token')

        console.log(token)



        if (token) {
            fetch(serverUrl + 'api/chats/get_all_chats/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: '',

            }).then(res => res.json())
                .then(json => {
                    console.log(json)
                }).then(() => {
                setLoadPage(true)
            })
                .catch(err => console.log(err));
        } else {
            alert('Please login to see profile page')
        }

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
                    <div style={{marginTop: "1rem"}}>
                        <Breadcrumbs style={{color: "#0B3954"}} separator="›">
                            <Link style={{marginLeft: "3rem", color: "#0B3954"}} to="/">
                                Home Page
                            </Link>
                            <Link style={{color: "#0B3954"}} to="/profile">
                                Messsages
                            </Link>
                        </Breadcrumbs>
                        <List dense >
                            {[0, 1, 2, 3].map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (

                                    <ListItem key={value} button>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°${value + 1}`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText onClick={getchathistory} id={labelId} primary={`Line item ${value + 1}`} secondary={`kkkkkkkkkkkkkkkkkkkk
                                        kkkkkkkkkkkkkkkkkkkkkkk`} /> {open ? <ExpandLess /> : <ExpandMore />}
                                        <ListItemSecondaryAction>

                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>


                    <div className={classes.gridroot}>
                        <Grid container>
                            <Grid item xs={3}>

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

export default Messages;
