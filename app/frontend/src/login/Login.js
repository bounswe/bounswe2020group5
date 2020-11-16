import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
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
        <img src="/img/logo.png" alt="bupazar logo" width="100" height="100"/>
      </div>
      <div className="login-container">
        <h2 style={{textAlign: "center"}}>Login</h2>
        <form className={classes.loginFormRoot}  noValidate autoComplete="off">
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
        <div >
          <div className="forgot-password">
            <Link href="/forgot">
              <b>Forget password?</b>
            </Link>
          </div>
          <div className="signup">
            <Link href="/signup">
              <b>Sign Up</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;