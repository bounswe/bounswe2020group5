import React, {useEffect, useState} from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import validate from "./Validate";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import {serverUrl} from "../common/ServerUrl";
import {useHistory} from "react-router-dom";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: "2rem",
        padding: theme.spacing(10),
        color: theme.palette.text.secondary,
    },
    password: {
        paddingTop: "1rem",
        paddingBottom: "1rem",
    },
    button: {
        color: "white",
        backgroundColor: "#0B3954",
        '&:hover': {
            backgroundColor: "#2a5673",
        },
        width: "70%",
        height: "3rem",
        marginTop: "1rem",
        fontSize: "18px"
    }
}));

export default function ChangePassword() {
    const classes = useStyles();
    const [loadPage, setLoadPage] = React.useState(false);
    let history = useHistory();

    const [state, setState] = useState({
        current_pw: '',
        new_pw: '',
        confirm: '',
    });

    const [val, setVal] = useState({
        current_pw: {error: false, message: ''},
        new_pw: {error: false, message: ''},
        confirm: {error: false, message: ''},
    });

    function onChange(event) {
        var mutableState = state
        mutableState[event.target.id] = event.target.value
        setState(mutableState)
    }

    function handleOnClick() {
        let validated = (validate(state, val))
        setVal(validated)
        let check = true;

        for (const field in validated) {
            if (validated.hasOwnProperty(field)) {
                const temp = validated[field];
                if (temp.error) {
                    check = false;
                }
            }
        }

        const token = localStorage.getItem('token')

        if (check) {
            let data = {
                current_password: state.current_pw,
                new_password: state.new_pw,
            }
                fetch(serverUrl + 'api/auth/password_change/', {
                    method: 'POST',
                    headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }).then(res => res.json())
                    .then(json => {
                        const success = json.success
                        if (success) {
                            alert('Password is changed successfully!')
                            history.push('/profile')
                        }
                    })
                    .catch(err => console.log(err));

        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setLoadPage(true)
        } else {
            alert("You need to login to change your password")
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
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <Typography align={"center"} variant="h4" gutterBottom>
                                    <Box color={"black"} fontWeight="fontWeightBold" m={1}>
                                        Change Password
                                    </Box>
                                </Typography>
                                <form className={classes.form} align={"center"} autoComplete="off">
                                    <div className={classes.password}>
                                        <TextField
                                            id="current_pw"
                                            label="Current Password"
                                            type="password"
                                            autoComplete="current-password"
                                            variant="outlined"
                                            style={{width: '70%'}}
                                            error={val.current_pw.error}
                                            helperText={val.current_pw.message}
                                            onChange={onChange}/>
                                    </div>
                                    <div className={classes.password}>
                                        <TextField
                                            id="new_pw"
                                            label="New Password"
                                            type="password"
                                            variant="outlined"
                                            style={{width: '70%'}}
                                            error={val.new_pw.error}
                                            helperText={val.new_pw.message}
                                            onChange={onChange}/>
                                    </div>
                                    <div className={classes.password}>
                                        <TextField
                                            id="confirm"
                                            label="Repeat New Password"
                                            type="password"
                                            variant="outlined"
                                            style={{width: '70%'}}
                                            error={val.confirm.error}
                                            helperText={val.confirm.message}
                                            onChange={onChange}/>
                                    </div>
                                    <Button
                                        className={classes.button}
                                        style={{align: "center"}}
                                        variant="contained"
                                        onClick={handleOnClick}
                                        component={Link}
                                        to="/profile">
                                        <b>SAVE</b>
                                    </Button>

                                </form>

                            </Paper>
                        </Grid>
                    </Grid>
                    <Footer />
                </div>
            ) : null}
        </div>

    );
}


