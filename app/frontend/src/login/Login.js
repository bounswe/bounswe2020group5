import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Login.css'


const useStyles = makeStyles((theme) => ({
  loginFormRoot: {
    "& .MuiTextField-root": {
      width: '100%',
    },

    "& > div": {
      margin: '24px',
    }
  },
}));


function Login() {
  const classes = useStyles();
  return (
    <div className="login">
      <div className="login-header">
        <img src="/img/logo.png" alt="bupazar logo" width="100" height="100"/>
      </div>
      <div className="login-container">
        <h2 style={{textAlign: "center"}}>Log in</h2>
        <form className={classes.loginFormRoot}  noValidate autoComplete="off">
          <div className="username">
            <TextField id="outlined-basic" label="E-mail or username" variant="outlined" />
          </div>
          <div className="password">
            <TextField 
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
          </div>
        </form>
      </div>
    </div>
  );
}


export default Login;