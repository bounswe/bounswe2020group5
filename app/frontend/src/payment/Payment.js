import React, {useEffect, useState} from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
import {serverUrl} from "../common/ServerUrl";
import {useHistory} from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Login from "../login/Login";
import TextField from "@material-ui/core/TextField";


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
    marginLeft: "2rem",
  },
  paper: {
    height: "40rem",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  paper2: {
    height: "40rem",
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
  grid3: {
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
  },
  root2: {
    width: '100%',
  },
  backButton2: {
    marginRight: theme.spacing(1),
  },
  instructions2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper:{
    width:"100%",
    margin:"auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Payment() {

  const classes = useStyles();
  let [open, setOpen] = React.useState(false);
  let [loadPage, setLoadPage] = React.useState(false);
  let [edit, setEdit] = React.useState(false);
  let [address, setAddress] = React.useState("");

  let history = useHistory();

  const handleClick = () => {
    setOpen(!open);
  };

  function getSteps() {
    return ['Address Info', 'Payment Info'];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container>
            <Grid item xs={8} style={{margin:"auto"}}>
              <Paper className={classes.paper}>
                <div className={classes.grid2}>
                  <h3 style={{color: "black", fontSize: 25, fontWeight: "500", marginLeft: "12rem", marginBottom: "2rem"}}>
                    Address Information
                  </h3>
                </div>
                <div style={{width:"100%"}}>
                  <TextField
                    style={{width:"100%"}}
                    id="filled-multiline-flexible"
                    multiline
                    rowsMax={4}
                    value={"You can edit your address"}
                    variant="filled"
                    disabled
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>);
      case 1:
        return (
          <Grid container>
            <Grid item xs={8} style={{margin:"auto"}}>
              <Paper className={classes.paper2}>
                <div className={classes.grid3}>
                  <h3 style={{color: "black", fontSize: 25, fontWeight: "500", marginLeft: "12rem", marginBottom: "2rem"}}>
                    Payment Information
                  </h3>
                </div>
              </Paper>
            </Grid>
          </Grid>);
      default:
        return 'Unknown stepIndex';
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      fetch(serverUrl + 'api/auth/user_info/', {
        method: 'POST',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
      }).then(res => res.json())
        .then(json => {
          setAddress(json.address)
        }).then(() => {
        setLoadPage(true)
      })
        .catch(err => console.log(err));
    } else {
      alert('Please login to order')
      history.push('/login')
    }
  }, []);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (

    <div>
      {loadPage ? (
        <div>
          <div className="Home">
            <Navbar/>
          </div>
          <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions2}>All steps completed</Typography>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions2}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton2}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>


          <div className={classes.ftr}>
            <Footer/>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Payment;
