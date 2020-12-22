import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {},
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(10),
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
}));

export default function EmailVerification(props) {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="sm">
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.header}>
            <Typography variant="h4" gutterBottom>
              Email Verification
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              We have sent the verification mail to {props.email}. Please enter
              the code below.
            </Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <TextField
              className={classes.field}
              id="verification-code-field"
              label="Verification Code"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={6} />
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
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
