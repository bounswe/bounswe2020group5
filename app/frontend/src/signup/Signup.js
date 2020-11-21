import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import validate from './Validate.js'
import './Signup.css'
import Alert from '@material-ui/lab/Alert';
import { postData } from "../common/Requests";
import { serverUrl } from "../common/ServerUrl";
import React from 'react';



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
    alertRoot: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  },
}));


function Signup(props) {

  const classes = useStyles();

  const [state, setState] = useState({
    password: '',
    confirm: '',
    fname: '',
    lname: '',
    email: '',
    uname: '',
    address: '',
  });

  const [val, setVal] = useState({
    password: { error: false, message: '' },
    confirm: { error: false, message: '' },
    fname: { error: false, message: '' },
    lname: { error: false, message: '' },
    email: { error: false, message: '' },
    uname: { error: false, message: '' },
    address: { error: false, message: '' },
  });

  const [logged, setLogged] = useState(false); 

  const [alertMessage, setAlertMessage] = useState(''); 

  function onChange(event) {
    var mutableState = state
    mutableState[event.target.id] = event.target.value
    setState(mutableState)
    setAlertMessage('')
  }

  function handleOnClick() {
    let newVal = validate(state, val);
    if (!props.type) {
      newVal.address = { error: false, message: '' };
    }
    setVal(newVal)
    let valCheck = true;

    
    for (const key in newVal) {
      if (newVal.hasOwnProperty(key)) {
        const element = newVal[key];
        if (element.error) {
          valCheck = false;
        }
      }
    }

    if (valCheck) {
      const url = serverUrl + 'api/auth/register/';
      let data = {
        email: state.email,
        username: state.uname,
        first_name: state.fname,
        last_name: state.lname,
        password: state.password,
        is_customer: true,
        is_vendor: false,
      }

      if (props.type) {
        data.address = state.address;
      }
      
      postData(url, data)
        .then(handleResponse)
        .catch(rej => console.log(rej))
    }
  }

  function handleResponse(res) {
    try {
      const token = res.auth_token;
      if (token) {
        console.log(token)
        localStorage.setItem('token', token);
        setLogged(true);
      } else {
        setAlertMessage('User with this username already exists');
      }
    } catch (error) {
      setAlertMessage('Some error has occured');
    }
  }

  if (logged) {
    return <Redirect to='/' />
  }

  return (
    <div className="login">
      <div className="login-header">
        <Link to="/home">
          <img src="/img/logo.png" alt="bupazar logo" width="100" height="100" />
        </Link>    
      </div>
      <div className="signup-container">
        <Typography className="h5-style" variant="h5" gutterBottom>
          Create your bupazar account
        </Typography>
        <div className={classes.alertRoot} style={{ display: alertMessage ? 'block' : 'none'}}>
          <Alert severity="error">{alertMessage}</Alert>
        </div>

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
          {props.type && <div className="username">
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              error={val.address.error}
              helperText={val.address.message}
              onChange={onChange}
            />
          </div>}
        </form>


        <div className="button-div">
          <div className={classes.loginButtonRoot}>
            <Button variant="contained" color="primary" onClick={handleOnClick}>
              <b>Create account</b>
            </Button>
          </div>
        </div>


        <div>
          {!props.type && <div className="forgot-password">
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              to="/signup/vendor"
              component={Link}
            >
              <b>Are you a vendor?</b>
            </Button>
          </div>}
          {props.type && <div className="forgot-password">
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              to="/signup"
              component={Link}
            >
              <b>Not a vendor?</b>
            </Button>
          </div>}
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