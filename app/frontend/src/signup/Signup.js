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
    fname: '',
    lname: '',
    email: '',
    uname: '',
  });

  const [val, setVal] = useState({
    password: { error: false, message: '' },
    confirm: { error: false, message: '' },
    fname: { error: false, message: '' },
    lname: { error: false, message: '' },
    email: { error: false, message: '' },
    uname: { error: false, message: '' },
  });

  function onChange(event) {
    var mutableState = state
    mutableState[event.target.id] = event.target.value
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
              error={val.fname.error}
              helperText={val.fname.message}
              id="fname"
              label="First Name"
              variant="outlined"
              onChange={onChange}
            />
          </div>
          <div className="right">
            <TextField
              error={val.lname.error}
              helperText={val.lname.message}
              id="lname"
              label="Last Name"
              variant="outlined"
              onChange={onChange}
            />
          </div>
          <div className="username">
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              error={val.email.error}
              helperText={val.email.message}
              onChange={onChange}
            />
          </div>
          <div className="username">
            <TextField
              id="uname"
              label="Username"
              variant="outlined"
              error={val.uname.error}
              helperText={val.uname.message}
              onChange={onChange}
            />
          </div>
          <div className="left2">
            <TextField
              error={val.password.error}
              helperText={val.password.message}
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={onChange}
            />
          </div>
          <div className="right2">
            <TextField
              error={val.confirm.error}
              id="confirm"
              label="Confirm"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              helperText={val.confirm.message}
              onChange={onChange}
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