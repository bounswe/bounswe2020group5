import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { isInteger } from "formik";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { postData } from "../common/Requests";
import { serverUrl } from "../common/ServerUrl";

const useStyles = makeStyles((theme) => ({
  container: {},
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(10),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  button: {
    minWidth: "100%",
    marginTop: theme.spacing(1),
    minHeight: "100%",
  },
  field: {
    minWidth: "100%",
  },
  buttonText: {
    fontw: "100%",
  },
  text: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: 550,
  },
}));

export default function EmailVerification() {
  const classes = useStyles();

  const [alertMessage, setAlertMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  function handleResponse(res) {
    try {
      const token = res.auth_token;
      if (token) {
        // console.log(token)
        localStorage.removeItem("mail-for-register");
        localStorage.setItem("token", token);
        setLogged(true);
      } else {
        if (res.user) {
          setLogged(true);
          localStorage.removeItem("mail-for-register");
        } else if (res.email) {
          setAlertMessage("Email is not found");
        } else if (res.number) {
          setAlertMessage("Incorrect verification number");
        } else {
          setAlertMessage("Some error has occured");
          console.log(res);
        }
      }
    } catch (error) {
      setAlertMessage("Some error has occured");
    }
  }
  function handleOnClick() {
    const url = serverUrl + "api/auth/register_activate/";

    const data = {
      email: localStorage.getItem("mail-for-register"),
      number: number,
    };

    postData(url, data)
      .then(handleResponse)
      .catch((rej) => {
        console.log(rej);
        setAlertMessage("Some error has occured");
      });
  }

  function onChange(event) {
    // var mutableState = state;
    // mutableState[event.target.id] = event.target.value;

    if (!event.target.value) {
      setError("Required");
    } else if (!isInteger(event.target.value)) {
      setError("This field must be a number");
    } else if (event.target.value < 1) {
      setError("This field must have a positive value");
    } else {
      setError("");
      setNumber(event.target.value);
    }
    // setAlertMessage("");
  }

  if (logged) {
    return <Redirect to="/" />;
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={2} />
          <Grid item xs={10} className={classes.header}>
            <Typography variant="h4" gutterBottom>
              Email Verification
            </Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={10}>
            <Typography variant="body1" gutterBottom>
              We have sent the verification mail to:
            </Typography>
            <Typography className={classes.text} variant="body1" gutterBottom>
              {localStorage.getItem("mail-for-register")}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please enter the code below.
            </Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={8}>
            {alertMessage && (
              <Alert className={classes.alert} severity="error">
                {alertMessage}
              </Alert>
            )}
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={8}>
            <TextField
              className={classes.field}
              id="verification-code-field"
              label="Verification Code"
              variant="outlined"
              error={error}
              helperText={error}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={6} />
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleOnClick}
            >
              Verify
            </Button>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Paper>
    </Container>
  );
}
