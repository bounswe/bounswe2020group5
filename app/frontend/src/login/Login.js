import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import './Login.css'


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
}));


function onChangeUsername(event) {
  console.log(event.target.value)
}


function onChangePassword(event) {
  console.log(event.target.value)
}


function Login() {
  const classes = useStyles();
  return (
    <div className="login">
      <div className="login-header">
        <img src="/img/logo.png" alt="bupazar logo" width="100" height="100" />
      </div>
      <div className="login-container">
        <Typography className="h5-style" variant="h5" gutterBottom>
          Log In to bupazar
        </Typography>
        <form className={classes.loginFormRoot} noValidate autoComplete="off">
          <div className="username">
            <TextField
              id="outlined-basic"
              label="E-mail or username"
              variant="outlined"
              onChange={onChangeUsername}
            />
          </div>
          <div className="password">
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={onChangePassword}
            />
          </div>
        </form>
        <div className="button-div">
          <div className={classes.loginButtonRoot}>
            <Button
              variant="contained"
              color="primary"
              className="button-style"
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
            <div className={classes.loginButtonRoot}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "None" }}
                startIcon={<img src="/img/google-icon.svg" alt="google icon" />}
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
                style={{ textTransform: "None" }}
                startIcon={<img src="/img/facebook-icon.svg" alt="facebook icon" />}
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


export default Login;