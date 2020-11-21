import React, {useState} from 'react';
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
import Snackbar from '@material-ui/core/Snackbar';
import Link from "@material-ui/core/Link";


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
    const [open, setOpen] = React.useState(false);

    const [state, setState] = useState({
        current_pw: '',
        new_pw: '',
        confirm: '',
    });

    const [val, setVal] = useState({
        current_pw: { error: false, message: '' },
        new_pw: { error: false, message: '' },
        confirm: { error: false, message: '' },
    });

    function onChange(event) {
        var mutableState = state
        mutableState[event.target.id] = event.target.value
        setState(mutableState)
    }

    function handleOnClick() {
        setVal(validate(state, val))

        //if validated ???????
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return(
        <div>
            <div className="Home">
                <Navbar/>
            </div>
            <div>
                <CategoryTab/>
            </div>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper} >
                        <Typography align={"center"} variant="h4" gutterBottom>
                            <Box color={"black"} fontWeight="fontWeightBold" m={1}>
                                Change Password
                            </Box>
                        </Typography>
                        <form className={classes.form} align={"center"} autoComplete="off">
                            <div className={classes.password} >
                                <TextField
                                    id="current_pw"
                                    label="Current Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    style ={{width: '70%'}}
                                    error={val.current_pw.error}
                                    helperText={val.current_pw.message}
                                    onChange={onChange}            />
                            </div>
                            <div className={classes.password} >
                                <TextField
                                    id="new_pw"
                                    label="New Password"
                                    type="password"
                                    variant="outlined"
                                    style ={{width: '70%'}}
                                    error={val.new_pw.error}
                                    helperText={val.new_pw.message}
                                    onChange={onChange}            />
                            </div>
                            <div className={classes.password} >
                                <TextField
                                    id="confirm"
                                    label="Repeat New Password"
                                    type="password"
                                    variant="outlined"
                                    style ={{width: '70%'}}
                                    error={val.confirm.error}
                                    helperText={val.confirm.message}
                                    onChange={onChange}            />
                            </div>
                            <Button
                                className={classes.button}
                                style={{align:"center"}}
                                variant="contained"
                                onClick={handleOnClick}
                                component={Link}
                                to="/profile" >
                                <b>SAVE</b>
                            </Button>

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'bottom',
                                }}
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message="Password is changed successfully."
                            />

                        </form>

                    </Paper>
                </Grid>
            </Grid>
        </div>

    );
}

