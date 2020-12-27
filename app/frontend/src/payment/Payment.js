import React, {useEffect, useState} from 'react';
import Navbar from "../home/Navbar";
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
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import 'date-fns';
import Moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
    height: "35rem",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    minHeight:"40rem"
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
    marginRight: theme.spacing(10),
    borderWidth:"1rem",
    borderColor:"black",
    width:"10rem"
  },
  instructions2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper:{
    width:"100%",
    margin:"auto",
  },
  selectcard:{
    width:"20rem",
  }
}));


function Payment() {

  const classes = useStyles();
  let [loadPage, setLoadPage] = React.useState(false);
  let [edit, setEdit] = React.useState(false);
  let [address, setAddress] = React.useState("");
  let [value, setValue] = React.useState('');
  let [creditCardList, setCreditCardList] = React.useState('');
  let [selectVal, setSelectVal] = React.useState('');
  let [cardOwner, setCardOwner] = React.useState('');
  let [cardOwner2, setCardOwner2] = React.useState('');
  let [cardNumber, setCardNumber] = React.useState('');
  let [cardNumber2, setCardNumber2] = React.useState('');
  let [expirationDate2, setExpirationDate2] = React.useState('');
  let [cvc, setCvc] = React.useState('');
  let [cvc2, setCvc2] = React.useState('');
  let [cardID, setCardID] = React.useState('');
  let [focus, setFocus] = React.useState('');
  let [focus2, setFocus2] = React.useState('');
  let [vendor, setVendor] = React.useState('');
  let [cardName, setCardName] = React.useState('');
  let [cardName2, setCardName2] = React.useState('');
  let [selectedDate, setSelectedDate] = React.useState(null);
  let [errorCardNumber, setErrorCardNumber] = React.useState(false);
  let [errorCardName, setErrorCardName] = React.useState(false);
  let [errorCardOwner, setErrorCardOwner] = React.useState(false);
  let [errorCvc, setErrorCvc] = React.useState(false);
  let [errorDate, setErrorDate] = React.useState(false);
  let [CardMsg, setCardMsg] = React.useState('');
  let [CVCMsg, setCVCMsg] = React.useState('');
  let [dateMsg, setDateMsg] = React.useState('');




  let history = useHistory();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "number"){
      let newVal = value
      if(value.length<20){
        if(value.length===4 || value.length===9 || value.length===14){
          newVal = value + " "
        }
        setCardNumber(newVal)
      }
    }
    else if(name==="name"){
      setCardOwner(value)
    }
    else if(name === "cardname"){
      setCardName(value)
    }
    else if(name === "cvc"){
      if(value.length<4){
        setCvc(value)
      }
    }
  }

  const handleChangeSelect = (event) => {
    setSelectVal(event.target.value)
    const token = localStorage.getItem('token')

    fetch(serverUrl + 'api/credit-cards/'+event.target.value, {
      method: 'GET',
      headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
    }).then(res => res.json())
      .then(json => {
        setCardName2(json.name)
        setCardID(json.id)
        setCardOwner2(json.card_owner)
        setCardNumber2(json.card_number)
        setExpirationDate2(json.expiration_date)
        setCvc2(json.cvc_security_number)
        console.log(json)
      })
      .catch(err => {
        alert('Some error has occurred')
        console.log(err)
      });
  }
  function onChange(event) {
    setAddress(event.target.value)
  }

  function getSteps() {
    return ['Address Info', 'Payment Info'];
  }

  function handleOnClick() {
    const token = localStorage.getItem('token')
    const data = {
      address : address,
    }

    if(data.address!==""){
      fetch(serverUrl + 'api/auth/profile_update/', {
        method: 'POST',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then(json => {
          console.log(json)
          const success = json.success
          if (success) {
            alert('Your profile is updated!')
            setEdit(false);
          }
          else {
            alert('Error Occurred');
          }
        })
        .catch(err => {
          alert('Some error has occurred')
          console.log(err)
        });
    }
    else{
      alert("Address field cannot be empty.Please enter an address")
    }
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container>
            <Grid item xs={8} style={{margin:"auto"}}>
              <Paper className={classes.paper}>
                <div className={classes.grid2}>
                  <h3 style={{color: "#0B3954", fontSize: 25, fontWeight: "500", marginLeft: "15rem", marginBottom: "2rem"}}>
                    Address Information
                  </h3>
                </div>
                <div style={{width:"50rem",margin:"auto",background:"#0B3954",borderRadius:"1rem",height:"4rem",
                  textAlign:"center",color:"white"}}>
                  <p>You can edit your address from your profile page or continue with your registered address.
                    To continue the payment process with your registered address, please proceed to the next step.</p>
                </div>
                <div style={{width:"30rem",margin:"auto",marginTop:"5rem"}}>
                  <TextField
                    style={{width:"30rem"}}
                    //error={val.address.error}
                    //helperText={val.address.message}
                    id="address"
                    label="Address"
                    rows={5}
                    variant="outlined"
                    disabled={!edit}
                    multiline
                    onChange={onChange}
                    defaultValue={JSON.parse(JSON.stringify(address)) !== '' ?
                      (JSON.parse(JSON.stringify(address))) : (' ')
                    }
                  />
                </div>
                <div style={{width:"20rem",margin:"auto"}}>
                  {edit ? (
                      <Button
                        style={{width: "20rem",marginTop:"2rem", backgroundColor: "#0B3954",}}
                        variant="contained" color="primary"
                        onClick={handleOnClick}
                      >
                        Save
                      </Button>
                    ) :
                    <Button
                      style={{width: "20rem",marginTop:"2rem",backgroundColor: "#0B3954",}}
                      variant="contained" color="primary"
                      onClick={() => setEdit(true)}
                    >
                      Edit
                    </Button>
                  }
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
                  <h3 style={{color: "#0B3954", fontSize: 25, fontWeight: "500", marginLeft: "15rem", marginBottom: "2rem"}}>
                    Payment Information
                  </h3>
                </div>
                <div style={{width:"50rem",margin:"auto", textAlign:"center"}}>
                  <TextField style={{width:"50rem"}} id="outlined-basic" variant="outlined" disabled
                             defaultValue={"You can use one of the registered credit cards or continue with a new one. Select one of the options."}/>
                </div>
                <div style={{margin:"auto", textAlign:"center",marginTop:"1rem"}}>
                  <FormControl component="fieldset">
                    <RadioGroup row aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                      <FormControlLabel style={{marginRight:"5rem"}} value="saved" control={<Radio style={{color:"#0B3954"}}/>} label="Saved Credit Cards" />
                      <FormControlLabel value="new" control={<Radio style={{color:"#0B3954"}} />} label="New Credit Card" />
                    </RadioGroup>
                  </FormControl>
                </div>
                {value === "saved" ? (
                  <div>
                    <div style={{width:"50rem",margin:"auto",borderRadius:"1rem",marginTop:"2rem",textAlign:"center"}}>
                      <FormControl>
                        <InputLabel >Saved Credit Cards</InputLabel>
                        <Select className={classes.selectcard} native id="countrySelect" onChange={handleChangeSelect} value={selectVal}>
                          <option value={''} disabled/>
                          {creditCardList.map(({name,id}, index) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      {creditCardList.length === 0 ? (
                        <div style={{width:"40rem",margin:"auto",marginTop:"3rem",background:"#0B3954",borderRadius:"1rem",height:"3rem",
                          textAlign:"center",color:"white"}}>
                          <p>You do not have any saved credit card. Please enter a new credit card.</p>
                        </div>): null}
                    </div>
                    {selectVal !== '' ? (
                      <div style={{width:"100%",borderRadius:"1rem",marginTop:"2rem",textAlign:"center"}}>
                        <div>
                          <Cards
                            cvc={cvc2}
                            expiry={expirationDate2}
                            focused={focus2}
                            name={cardOwner2}
                            number={cardNumber2}
                          />
                        </div>
                        <div>
                          <TextField
                            style={{width:"20rem", marginTop:"1rem"}}
                            name="cardname"
                            label="Card Name"
                            inputProps={{ pattern: "[\d| ]{16,22}" }}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            value={cardName2}
                            disabled={true}
                            variant="outlined"
                          />
                        </div>
                        <div>
                          <TextField
                            style={{width:"20rem", marginTop:"1rem"}}
                            name="number"
                            label="Card Number"
                            inputProps={{ pattern: "[\d| ]{16,22}" }}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            value={cardNumber2}
                            disabled={true}
                            variant="outlined"
                          />
                        </div>
                        <div>
                          <TextField
                            style={{width:"20rem", marginTop:"1rem"}}
                            name="name"
                            label="Card Owner"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            value={cardOwner2}
                            disabled={true}
                            variant="outlined"
                          />
                        </div>
                        <div>
                          <TextField
                            style={{width:"9rem", marginTop:"1rem"}}
                            name="expiry"
                            inputProps={{ pattern: "\d\d/\d\d" }}
                            label="Expiry Date"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            value={expirationDate2}
                            disabled={true}
                            variant="outlined"
                          />
                          <TextField
                            style={{width:"9rem", marginTop:"1rem",marginLeft:"2rem"}}
                            name="cvc"
                            inputProps={{ pattern: "\d{3,4}" }}
                            label="CVC"
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            value={cvc2}
                            disabled={true}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ): null}
                {value === "new" ? (
                  <div style={{width:"100%",borderRadius:"1rem",marginTop:"2rem",textAlign:"center"}}>
                    <div>
                      <Cards
                        cvc={cvc}
                        expiry={Moment(selectedDate).format('MM/YY')}
                        focused={focus}
                        name={cardOwner}
                        number={cardNumber}
                      />
                    </div>

                    <div>
                      <TextField
                        style={{width:"20rem", marginTop:"1rem"}}
                        name="cardname"
                        label="Card Name"
                        inputProps={{ pattern: "[\d| ]{16,22}" }}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={cardName}
                        variant="outlined"
                        error={errorCardName}
                        helperText={errorCardName && "Card name is required"}
                      />
                    </div>
                    <div>
                      <TextField
                        style={{width:"20rem", marginTop:"1rem"}}
                        name="number"
                        label="Card Number"
                        inputProps={{ pattern: "[\d| ]{16,22}" }}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={cardNumber}
                        variant="outlined"
                        error={errorCardNumber}
                        helperText={errorCardNumber && CardMsg}
                      />
                    </div>
                    <div>
                      <TextField
                        style={{width:"20rem", marginTop:"1rem"}}
                        name="name"
                        label="Card Owner"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={cardOwner}
                        variant="outlined"
                        error={errorCardOwner}
                        helperText={errorCardOwner && "Card owner is required"}
                      />
                    </div>
                    <div>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            style={{width:"9rem", marginTop:"1rem"}}
                            variant="inline"
                            format="MM/yy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Expiry Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            keyboardIcon
                            open={false}
                            disablePast
                            error={errorDate}
                            helperText={errorDate && dateMsg}
                          />
                      </MuiPickersUtilsProvider>
                      <TextField
                        style={{width:"9rem", marginTop:"1rem",marginLeft:"2rem"}}
                        name="cvc"
                        inputProps={{ pattern: "\d{3,4}" }}
                        label="CVC"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={cvc}
                        error={errorCvc}
                        helperText={errorCvc && CVCMsg}
                      />
                    </div>
                  </div>
                ): null}

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
          setVendor(json.is_vendor)
          setAddress(json.address)
        }).then(() => {
        setLoadPage(true)
      })
        .catch(err => console.log(err));
    } else {
      alert('Please login to order')
      history.push('/login')
    }
    if(vendor){
      alert("Vendors cannot order. Please login as customer.")
      history.push('/login')
    }

    if (token) {
      fetch(serverUrl + 'api/credit-cards/opts/get_all_credit_cards/', {
        method: 'POST',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
      }).then(res => res.json())
        .then(json => {
          setCreditCardList(JSON.parse(JSON.stringify(json)));
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
    if(activeStep === 0){
      if(address === ''){
        alert("Shipping address can not be empty. \n Please enter a shipping address.")
      }
      else{
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else if(activeStep === 1){
      if(value === ''){
        alert("Select one of the options")
      }
      else if(value === "saved"){
        if(selectVal === ''){
          alert("You need to select a credit card to proceed.")
        }
        else{
          const token = localStorage.getItem('token')

          fetch(serverUrl + 'api/orders/make_purchase/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
          }).then(res => res.json())
            .then(json => {
              if(json.success){
                alert("Payment is completed")
                history.push("/")
              }
              else{
                alert(json.error)
              }
            })
            .catch(err => console.log(err));
        }
      }
      else if(value === "new"){
        let valCheck = true



        if(cardNumber === ''){
          setErrorCardNumber(true)
          setCardMsg('Card number is required')
          valCheck = false;
        }
        else if(cardNumber.length < 19){
          setErrorCardNumber(true)
          setCardMsg('Not in the correct form')
          valCheck = false;
        }
        else{
          setErrorCardNumber(false)
        }

        if(cardOwner === ''){
          setErrorCardOwner(true);
          valCheck = false;
        }
        else{
          setErrorCardOwner(false)
        }
        if(cardName === ''){
          setErrorCardName(true);
          valCheck = false;
        }
        else{
          setErrorCardName(false)
        }

        if(cvc === ''){
          setErrorCvc(true)
          setCVCMsg("CVC is required")
          valCheck = false;
        }
        else if(cvc.length <3){
          setErrorCvc(true)
          setCVCMsg("Not in correct form")
          valCheck = false;
        }
        else{
          setErrorCvc(false)
        }
        if(parseInt(Moment(selectedDate).format('MM/YY').toString().split("/")[1]) < 20){
          setErrorDate(true)
          setDateMsg("Date can not be in the past")
          valCheck = false
        }
        else if(Moment(selectedDate).format('MM/YY').toString()==="Invalid date"){
          setErrorDate(true)
          setDateMsg("Expiry date is required")
          valCheck = false
        }
        else{
          setErrorDate(false)
        }

          if(valCheck){
            const token = localStorage.getItem('token')
            let data = {
              name: cardName,
              card_owner: cardOwner,
              card_number: cardNumber,
              expiration_date: Moment(selectedDate).format('MM/YY').toString(),
              cvc_security_number: cvc,
            }

            fetch(serverUrl + 'api/orders/make_purchase/', {
              method: 'POST',
              headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            }).then(res => res.json())
              .then(json => {
                if(json.success){
                  fetch(serverUrl + 'api/credit-cards/opts/add/', {
                    method: 'POST',
                    headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                  }).then(res => res.json())
                    .then(json => {
                      if(json.success){
                        alert("Payment is completed and credit card is added to system")
                        history.push("/")
                      }
                      else{
                        alert("Payment is completed but credit card \n could not be saved.")
                        history.push("/")
                      }
                    })
                    .catch(err => console.log(err));
                }
                else{
                  alert(json.error)
                }
              })
              .catch(err => console.log(err));
          }
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
              <div>
                <Typography className={classes.instructions2}>{getStepContent(activeStep)}</Typography>
                <div style={{marginLeft:"33rem"}}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton2}
                  >
                    Back
                  </Button>
                  {!edit ? (
                    <Button variant="contained" style={{backgroundColor: "#0B3954",color:"white",borderWidth:"1rem",borderColor:"black",width:"10rem"}}
                            onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  ): null}

                </div>
              </div>
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
