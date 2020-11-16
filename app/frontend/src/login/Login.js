import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import SvgIcon from '@material-ui/core/SvgIcon';
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
        <h2 style={{ textAlign: "center" }}>Login</h2>
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
            <Button variant="contained" color="primary">
              <b>Log In</b>
            </Button>
          </div>
        </div>
        <div>
          <div className="forgot-password">
            <Link href="/forgot">
              <b>Forgot password?</b>
            </Link>
          </div>
          <div className="signup">
            <Link href="/signup">
              <b>Sign Up</b>
            </Link>
          </div>
        </div>

        <div>
          <div style={{ textAlign: 'center' }}>
            <p>
              - or -
            </p>
          </div>
          <div className="button-div2">
            <div className={classes.loginButtonRoot}>
              <Button
                variant="outlined"
                color="primary"
                //className={classes.button}
                startIcon={<SvgIcon>
                  <path d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z" id="Shape" fill="#34A853"></path>
                  <path d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z" id="Shape" fill="#FBBC05"></path>
                  <path d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z" id="Shape" fill="#EA4335"></path>
                  <path d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z" id="Shape" fill="#4285F4"></path>
                </SvgIcon>}
              >
                Log in with google
              </Button>
            </div>
          </div>
          <div className="button-div2">
            <div className={classes.loginButtonRoot}>
              <Button
                variant="outlined"
                color="primary"
                //className={classes.button}
                startIcon={
                  <SvgIcon>
                    <rect fill="#3B5998" width="20" height="20"/>
                    <path fill="#FFFFFF" d="M30.895,16.535l-0.553,5.23h-4.181v15.176h-6.28V21.766H16.75v-5.23h3.131v-3.149  c0-4.254,1.768-6.796,6.796-6.796h4.181v5.23h-2.615c-1.952,0-2.081,0.736-2.081,2.1v2.615H30.895z"/>
                  </SvgIcon>}
              >
                Log in with Facebook
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;