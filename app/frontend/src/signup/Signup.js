import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import './Signup.css'
import { useState } from 'react';
import validate from './Validate.js'

const useStyles = makeStyles((theme) => ({
  loginFormRoot: {
    "& .left ": {
      display: 'inline',
      float: 'left',
      width: '223px',
      margin: '16px 8px 16px 16px',
    },

    "& .right ": {
      display: 'inline',
      float: 'right',
      width: '223px',
      margin: '16px 16px 16px 8px',
    },

    "& .left2 ": {
      display: 'inline',
      float: 'left',
      width: '223px',
      margin: '0px 8px 16px 16px',
    },

    "& .right2 ": {
      display: 'inline',
      float: 'right',
      width: '223px',
      margin: '0px 16px 16px 8px',
    },

    "& .MuiTextField-root": {
      width: '100%',
    },


    "& > div": {
      margin: theme.spacing(2),
    },
  },
  loginButtonRoot: {
    '& > *': {
      width: '100%',
      height: '56px',
    },

  },
}));


function Signup() {

  const classes = useStyles();

  const [state, setState] = useState({
    password: '',
    confirm: '',
  });

  const [val, setVal] = useState({
    password: { error: false, message: '' },
    confirm: { error: false, message: '' },
  });

  function onChangeUsername(event) {
    console.log(event.target.value)
  }

  function onChangePassword(event) {
    var mutableState = state
    mutableState.password = event.target.value
    setState(mutableState)
  }

  function onChangeConfirm(event) {
    var mutableState = state
    mutableState.confirm = event.target.value
    setState(mutableState)
  }

  function handleOnClick() {
    console.log(state)
    setVal(validate(state, val))
  }




  return (
    <div className="login">
      <div className="login-header">
        <img src="/img/logo.png" alt="bupazar logo" width="100" height="100" />
      </div>
      <div className="signup-container">
        <Typography className="h5-style" variant="h5" gutterBottom>
          Create your bupazar account
        </Typography>


        <form className={classes.loginFormRoot} noValidate autoComplete="off">
          <div className="left">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />
          </div>
          <div className="right">
            <TextField
              id="standard-lname-input"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <div className="username">
            <TextField
              id="standard-email-input"
              label="E-mail"
              variant="outlined"
            />
          </div>
          <div className="username">
            <TextField
              id="standard-uname-input"
              label="Username"
              variant="outlined"
              onChange={onChangeUsername}
            />
          </div>
          <div className="left2">
            <TextField
              error={val.password.error}
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText={val.password.message}
              onChange={onChangePassword}
            />
          </div>
          <div className="right2">
            <TextField
              error={val.confirm.error}
              id="standard-confirm-input"
              label="Confirm"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText={val.confirm.message}
              onChange={onChangeConfirm}
            />
          </div>
        </form>


        <div className="button-div">
          <div className={classes.loginButtonRoot}>
            <Button variant="contained" color="primary" onClick={handleOnClick}>
              <b>Create account</b>
            </Button>
          </div>
        </div>


        <div>
          <div className="forgot-password">
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              to="/signup/vendor"
              component={Link}
            >
              <b>Are you a vendor?</b>
            </Button>
          </div>
          <div className="signup">
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              to="/login"
              component={Link}
            >
              <b>Log In</b>
            </Button>
          </div>
        </div>
        <div>
          <div style={{ textAlign: 'center', margin: '8px' }}>
            <Typography variant="body1" gutterBottom>
              - or -
            </Typography>
          </div>
          <div className="button-div2">
            <div className={classes.loginButtonRoot}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<img src="/img/google-icon.svg" alt="facebook icon" />}
                style={{ textTransform: "none" }}
              >
                Continue with Google
              </Button>
            </div>
          </div>
          <div className="button-div2">
            <div className={classes.loginButtonRoot}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<img src="/img/facebook-icon.svg" alt="google icon" />}
                style={{ textTransform: "none" }}
              >
                Continue with Facebook
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Signup;