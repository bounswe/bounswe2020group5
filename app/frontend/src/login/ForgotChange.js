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

export default function ForgotChange() {
  const classes = useStyles();

  const [alertMessage, setAlertMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [error, setError] = useState("");

  function handleResponse(res) {
    try {
      const token = res.auth_token;
      if (token) {
        // console.log(token)
        setLogged(true);
      } else {
        setAlertMessage("Some error has occured");
        console.log(res);
      }
    } catch (error) {
      setAlertMessage("Some error has occured");
    }
  }
  function handleOnClick() {
    const url = serverUrl + "api/auth/password_reset_confirm/?" + window.location.href.split("?")[1];

    const data = {
      new_password: number,
      new_password_again: number2,
    };

    postData(url, data)
      .then(handleResponse)
      .catch((rej) => {
        console.log(rej);
        setAlertMessage("Some error has occured");
      });
  }

  function onChange(event) {
    if (!event.target.value) {
      setError("Required");
    } else {
      setError("");
      setNumber(event.target.value);
    }
  }

  function onChange2(event) {
    if (!event.target.value) {
      setError("Required");
    } else {
      setError("");
      setNumber2(event.target.value);
    }
  }

  if (logged) {
    console.log("Successfully changed password");
    return <Redirect to="/login" />;
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={2} />
          <Grid item xs={10} className={classes.header}>
            <Typography variant="h4" gutterBottom>
              Password Reset
            </Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={10}>
            <Typography variant="body1" gutterBottom>
              Please enter your new password below:
            </Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={8}>
            {alertMessage && (
              <Alert className={classes.alert} severity="error">
                {alertMessage}
              </Alert>
            )}
            {logged && (
              <Alert className={classes.alert} severity="success">
                Successfully changed password
              </Alert>
            )}
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={8}>
            <TextField
              className={classes.field}
              id="verification-code-field"
              label="Password"
              type="password"
              variant="outlined"
              error={error}
              helperText={error}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={8}>
            <TextField
              className={classes.field}
              id="verification-code-field"
              label="Confirm"
              variant="outlined"
              type="password"
              error={error}
              helperText={error}
              onChange={onChange2}
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
              Confirm
            </Button>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Paper>
    </Container>
  );
}
