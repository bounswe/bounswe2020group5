import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import validate from './Validate'
import './Login.css'
import { postData } from "../common/Requests";
import Alert from '@material-ui/lab/Alert';
import { serverUrl } from "../common/ServerUrl";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import secrets from './secrets.json';
//styles
const useStyles = makeStyles((theme) => ({
  loginFormRoot: {
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
  alertRoot: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Login() {

  //states
  const classes = useStyles();

  const [state, setState] = useState({
    password: '',
    uid: '',
    keys: secrets
  });

  const [val, setVal] = useState({
    password: { error: false, message: '' },
    uid: { error: false, message: '' },
  });

  const [logged, setLogged] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const responseGoogleSuccess = (response) => {
    const url = serverUrl + 'api/auth/google_login/';
    const data = {
      auth_token: response.tokenId,
    }

    postData(url, data)
      .then(handleResponse)
      .catch((rej) => { setAlertMessage('Some error has occured'); console.log(rej) })
  }

  const responseGoogleFail = (response) => {
    setLogged(false);
    console.log('Google response is not successfull');
  }

  const responseFacebook = (response) => {
    console.log("responseFacebook", response)
    if (response.status == "unknown") {
      setLogged(false);
      console.log('Facebook response is not successfull');
      return;
    }
    console.log("Facebook response is successfull")

    const url = serverUrl + 'api/auth/facebook_login/';
    const data = {
      auth_token: response.accessToken,
    }

    postData(url, data)
      .then(handleResponse)
      .catch((rej) => { setAlertMessage('Some error has occured'); console.log(rej) })
  }







  //handlers
  function onChange(event) {
    var mutableState = state
    mutableState[event.target.id] = event.target.value
    setState(mutableState)
    setAlertMessage('')
  }

  function handleOnClick() {
    const newVal = validate(state, val);
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
      const url = serverUrl + 'api/auth/login/';
      const data = {
        email: state.uid,
        password: state.password,
      }

      postData(url, data)
        .then(handleResponse)
        .catch((rej) => { setAlertMessage('Some error has occured'); console.log(rej) })
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
        setAlertMessage('Invalid credentials');
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
      <div className="login-container">
        <Typography className="h5-style" variant="h5" gutterBottom>
          Welcome to bupazar
        </Typography>
        <div className={classes.alertRoot} style={{ display: alertMessage ? 'block' : 'none' }}>
          <Alert severity="error">{alertMessage}</Alert>
        </div>
        <form className={classes.loginFormRoot} noValidate autoComplete="off">
          <div className="username">
            <TextField
              id="uid"
              label="E-mail or username"
              variant="outlined"
              error={val.uid.error}
              helperText={val.uid.message}
              onChange={onChange} />
          </div>
          <div className="password">
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              error={val.password.error}
              helperText={val.password.message}
              onChange={onChange} />
          </div>
        </form>
        <div className="button-div">
          <div className={classes.loginButtonRoot}>
            <Button
              variant="contained"
              color="primary"
              className="button-style"
              onClick={handleOnClick}
            >
              <b>Continue</b>
            </Button>
          </div>
        </div>
        <div>
          <div className="forgot-password">
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              to="/forgot"
              component={Link}
            >
              <b>Forgot password?</b>
            </Button>
          </div>
          <div className="signup">
            <Button
              color="primary"
              style={{ textTransform: "none" }}
              to="/signup"
              component={Link}
            >
              <b>Sign Up</b>
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
            <GoogleLogin
              clientId={state.keys['g_client_id']}
              render={renderProps => (
                <div className={classes.loginButtonRoot}>
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: "None" }}
                    startIcon={<img src="/img/google-icon.svg" alt="google icon" />}
                  >
                    Continue with Google
              </Button>
                </div>
              )}
              buttonText="Login"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleFail}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <div className="button-div2">
            <FacebookLogin
              appId={state.keys['f_app_id']}
              render={renderProps => (
                <div className={classes.loginButtonRoot}>
                  <Button
                    onClick={renderProps.onClick}
                    variant="outlined"
                    color="primary"
                    style={{ textTransform: "None" }}
                    startIcon={<img src="/img/facebook-icon.svg" alt="facebook icon" />}
                  >
                    Continue with Facebook
            </Button>
                </div>
              )}
              callback={responseFacebook}

            />
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;