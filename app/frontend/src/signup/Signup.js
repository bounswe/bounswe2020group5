import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import validate from "./Validate.js";
import "./Signup.css";
import Alert from "@material-ui/lab/Alert";
import { postData } from "../common/Requests";
import { serverUrl } from "../common/ServerUrl";
import React from "react";
import Grid from "@material-ui/core/Grid";
import MapContainer from "../components/googlemap";
import Geocoder from "react-native-geocoding";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import CancelIcon from "@material-ui/icons/Cancel";
import Terms from "../agreements/Terms.js";

const useStyles = makeStyles((theme) => ({
  loginFormRoot: {
    "& .left ": {
      display: "inline",
      float: "left",
      width: "223px",
      margin: "16px 8px 16px 16px",
    },

    "& .right ": {
      display: "inline",
      float: "right",
      width: "223px",
      margin: "16px 16px 16px 8px",
    },

    "& .left2 ": {
      display: "inline",
      float: "left",
      width: "223px",
      margin: "0px 8px 16px 16px",
    },

    "& .right2 ": {
      display: "inline",
      float: "right",
      width: "223px",
      margin: "0px 16px 16px 8px",
    },

    "& .MuiTextField-root": {
      width: "100%",
    },

    "& > div": {
      margin: theme.spacing(2),
    },
  },
  loginButtonRoot: {
    "& > *": {
      width: "100%",
      height: "56px",
    },
    alertRoot: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  },
}));

function Signup(props) {
  const classes = useStyles();
  let [address, setaddress] = React.useState();
  let [latt, setlat] = React.useState();
  let [lngg, setlng] = React.useState();
  let [gooadd1, setgooadd1] = useState("");
  let [gooadd2, setgooadd2] = useState("");
  let [gooadd3, setgooadd3] = useState("");
  let [gooadd4, setgooadd4] = useState("");
  let [gooadd5, setgooadd5] = useState("");
  let [gooadd1dis, setgooadd1dis] = useState();
  let [gooadd2dis, setgooadd2dis] = useState();
  let [gooadd3dis, setgooadd3dis] = useState();
  let [gooadd4dis, setgooadd4dis] = useState();
  let [gooadd5dis, setgooadd5dis] = useState();
  let [addressenable, setaddressenable] = useState(false);
  let [addgooicon, setaddgooicon] = useState(true);
  let [shrink, setshrink] = useState(false);

  useEffect(() => {
    localStorage.setItem("terms", "0");
  }, []);

  Geocoder.init("AIzaSyAMFkjk7UKH5zfJuVCzYbt5l_H4EP4CmiA");
  useEffect(() => {
    componentDidMount();
  }, []);

  const [state, setState] = useState({
    password: "",
    confirm: "",
    fname: "",
    lname: "",
    email: "",
    uname: "",
    address_1: "",
    address_2: "",
    address_3: "",
    address_4: "",
    address_5: "",
  });

  const [val, setVal] = useState({
    password: { error: false, message: "" },
    confirm: { error: false, message: "" },
    fname: { error: false, message: "" },
    lname: { error: false, message: "" },
    email: { error: false, message: "" },
    uname: { error: false, message: "" },
    address_1: { error: false, message: "" },
    address_2: { error: false, message: "" },
    address_3: { error: false, message: "" },
    address_4: { error: false, message: "" },
    address_5: { error: false, message: "" },
  });

  const [logged, setLogged] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  function onChange(event) {
    console.log("saaaa");
    console.log(event.target.id);
    var mutableState = state;
    mutableState[event.target.id] = event.target.value;
    setState(mutableState);
    setAlertMessage("");
  }
  function onchangeaddress() {
    if (!addressenable) {
      setgooadd1dis(null);
      setgooadd2dis(null);
      setgooadd3dis(null);
      setgooadd4dis(null);
      setgooadd5dis(null);
    }
    setshrink(true);
  }

  function handlegoogleaddress() {
    setaddressenable(true);
    setshrink(true);
    var mutableState = state;
    setgooadd1dis(gooadd1);
    setgooadd2dis(gooadd2);
    setgooadd3dis(gooadd3);
    setgooadd4dis(gooadd4);
    setgooadd5dis(gooadd5);
    mutableState.address_1 = gooadd1;
    mutableState.address_2 = gooadd2;
    mutableState.address_3 = gooadd3;
    mutableState.address_4 = gooadd4;
    mutableState.address_5 = gooadd5;
    setState(mutableState);
    setAlertMessage("");
    setaddgooicon(false);
  }
  function cancelgoogleaddress() {
    var mutableState = state;
    setgooadd1dis("");
    setgooadd2dis("");
    setgooadd3dis("");
    setgooadd4dis("");
    setgooadd5dis("");
    mutableState.address_1 = "";
    mutableState.address_2 = "";
    mutableState.address_3 = "";
    mutableState.address_4 = "";
    mutableState.address_5 = "";
    setState(mutableState);
    setAlertMessage("");
    setaddgooicon(true);
    setaddressenable(false);
    setshrink(false);
  }
  function componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        console.log(position.coords.longitude);
        setlat(position.coords.latitude);
        setlng(position.coords.longitude);
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then((json) => {
            console.log(json);
            var addressComponent = json.results[0].formatted_address;
            setaddress(addressComponent);

            setgooadd1(
              addressComponent.toString().split(",")[0] +
                "," +
                addressComponent.toString().split(",")[1]
            );
            setgooadd2(
              addressComponent
                .toString()
                .split(",")
                [addressComponent.toString().split(",").length - 2].split(
                  "/"
                )[1]
                .split(",")[0]
            );
            setgooadd3(
              addressComponent
                .toString()
                .split(",")
                [addressComponent.toString().split(",").length - 2].split(
                  "/"
                )[0]
                .split(" ")[
                addressComponent
                  .toString()
                  .split(",")
                  [addressComponent.toString().split(",").length - 2].split(
                    "/"
                  )[0]
                  .split(" ").length - 1
              ]
            );
            setgooadd4(
              addressComponent
                .toString()
                .split(",")
                [addressComponent.toString().split(",").length - 2].split(
                  "/"
                )[0]
                .split(" ")[
                addressComponent
                  .toString()
                  .split(",")
                  [addressComponent.toString().split(",").length - 2].split(
                    "/"
                  )[0]
                  .split(" ").length - 2
              ]
            );
            setgooadd5(
              addressComponent
                .toString()
                .split(",")
                [addressComponent.toString().split(",").length - 1].split(
                  " "
                )[1]
            );
          })
          .catch((error) => console.warn(error));
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }

  function handleOnClick() {
    let newVal = validate(state, val);
    if (!props.type) {
      newVal.address_1 = { error: false, message: "" };
      newVal.address_2 = { error: false, message: "" };
      newVal.address_3 = { error: false, message: "" };
      newVal.address_4 = { error: false, message: "" };
      newVal.address_5 = { error: false, message: "" };
    }
    setVal(newVal);
    let valCheck = true;

    for (const key in newVal) {
      if (newVal.hasOwnProperty(key)) {
        const element = newVal[key];
        if (element.error) {
          valCheck = false;
        }
      }
    }

    if (localStorage.getItem("terms") === "0") {
      valCheck = false;
      alert("Please accept Terms and Conditions")
    }

    if (valCheck) {
      const url = serverUrl + "api/auth/register/";
      let data = {
        email: state.email,
        username: state.uname,
        first_name: state.fname,
        last_name: state.lname,
        password: state.password,
        is_customer: true,
        is_vendor: false,
      };

      if (props.type) {
        localStorage.setItem("is_vendor", true);
      } else {
        localStorage.setItem("is_vendor", false);
      }

      if (props.type) {
        data.address = state.address_1.replace("/", " ")+"/"+state.address_2.replace("/", " ")+"/"+state.address_3.replace("/", " ")+"/"+state.address_4.replace("/", " ")+"/"+state.address_5.replace("/", " ");
        data.is_customer = false;
        data.is_vendor = true;
      }

      postData(url, data)
        .then(handleResponse)
        .catch((rej) => console.log(rej));
    }
  }

  function handleResponse(res) {
    try {
      const success = res.success;
      if (success) {
        // console.log(token)
        localStorage.setItem("mail-for-register", state.email);
        setLogged(true);
      } else {
        if (res.email) {
          setAlertMessage("User with this email already exists");
        } else if (res.username) {
          setAlertMessage("User with this username already exists");
        } else {
          setAlertMessage("Some error has occured");
          console.log(res);
        }
      }
    } catch (error) {
      setAlertMessage("Some error has occured");
    }
  }

  if (logged) {
    return <Redirect to="/email-verification" />;
  }

  return (
    <div className="login">
      <div className="login-header">
        <Link to="/home">
          <img
            src="/img/logo.png"
            alt="bupazar logo"
            width="100"
            height="100"
          />
        </Link>
      </div>
      <div className="signup-container">
        <Typography className="h5-style" variant="h5" gutterBottom>
          Create your bupazar account
        </Typography>
        <div
          className={classes.alertRoot}
          style={{ display: alertMessage ? "block" : "none" }}
        >
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
          {props.type && (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    error={val.address_1.error}
                    helperText={val.address_1.message}
                    id="address_1"
                    InputLabelProps={{
                      shrink: shrink,
                    }}
                    value={gooadd1dis}
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    variant="outlined"
                    autoComplete="shipping address-line1"
                    onChange={onChange}
                    onClickCapture={onchangeaddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    error={val.address_2.error}
                    helperText={val.address_2.message}
                    InputLabelProps={{
                      shrink: shrink,
                    }}
                    value={gooadd2dis}
                    id="address_2"
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    autoComplete="shipping address-level2"
                    onChange={onChange}
                    onClickCapture={onchangeaddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="address_3"
                    error={val.address_3.error}
                    helperText={val.address_3.message}
                    InputLabelProps={{
                      shrink: shrink,
                    }}
                    value={gooadd3dis}
                    variant="outlined"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    onChange={onChange}
                    onClickCapture={onchangeaddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    error={val.address_4.error}
                    helperText={val.address_4.message}
                    value={gooadd4dis}
                    InputLabelProps={{
                      shrink: shrink,
                    }}
                    id="address_4"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    variant="outlined"
                    autoComplete="shipping postal-code"
                    onChange={onChange}
                    onClickCapture={onchangeaddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    error={val.address_5.error}
                    helperText={val.address_5.message}
                    value={gooadd5dis}
                    id="address_5"
                    name="country"
                    label="Country"
                    fullWidth
                    variant="outlined"
                    autoComplete="shipping country"
                    onChange={onChange}
                    InputLabelProps={{
                      shrink: shrink,
                    }}
                    onClickCapture={onchangeaddress}
                  />
                </Grid>
                <Grid item xs={12} sm={11}>
                  <MapContainer lat={latt} lng={lngg} address={address} />
                </Grid>
                <Grid item xs={12} sm={1}>
                  {addgooicon ? (
                    <Tooltip title="Use Current Location as Address">
                      <IconButton
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                        }}
                        onClick={handlegoogleaddress}
                        aria-label="home"
                      >
                        <HomeIcon color="primary" fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Cancel Current Location Use">
                      <IconButton
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                        }}
                        onClick={cancelgoogleaddress}
                        aria-label="home"
                      >
                        <CancelIcon color="secondary" fontSize="large" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
        </form>
        <div style={{ paddingBottom: "16px" }}>
          <Terms />
        </div>
        <div className="button-div">
          <div className={classes.loginButtonRoot}>
            <Button variant="contained" color="primary" onClick={handleOnClick}>
              <b>Create account</b>
            </Button>
          </div>
        </div>

        <div>
          {!props.type && (
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
          )}
          {props.type && (
            <div className="forgot-password">
              <Button
                color="primary"
                style={{ textTransform: "none" }}
                to="/signup"
                component={Link}
              >
                <b>Not a vendor?</b>
              </Button>
            </div>
          )}
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
      </div>
    </div>
  );
}

export default Signup;
