import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Divider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {serverUrl} from "../common/ServerUrl";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Footer from "../components/Footer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Link, useHistory} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Cards from "react-credit-cards";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Moment from "moment";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: theme.spacing(5),
  },
  paper2: {
    backgroundColor: "white",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:"400",
    textAlign:"center",
  },
  paper3: {
    backgroundColor: "white",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:"400",
    textAlign:"center",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: "1"
  },
  modal2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: "1"
  },
}));

export default function ListPage() {

  const classes = useStyles();
  const token = localStorage.getItem('token')
  const [loadPage, setLoadPage] = React.useState(false);
  const [allCards, setAllCards] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  let [selectedDate, setSelectedDate] = React.useState(null);
  let [focus, setFocus] = React.useState('');
  let [cardOwner, setCardOwner] = React.useState('');
  let [cardNumber, setCardNumber] = React.useState('');
  let [expirationDate, setExpirationDate] = React.useState('');
  let [cvc, setCvc] = React.useState('');
  let [cardName, setCardName] = React.useState('');
  let [errorCardNumber, setErrorCardNumber] = React.useState(false);
  let [errorCardName, setErrorCardName] = React.useState(false);
  let [errorCardOwner, setErrorCardOwner] = React.useState(false);
  let [errorCvc, setErrorCvc] = React.useState(false);
  let [errorDate, setErrorDate] = React.useState(false);
  let [CardMsg, setCardMsg] = React.useState('');
  let [CVCMsg, setCVCMsg] = React.useState('');
  let [dateMsg, setDateMsg] = React.useState('');

  const [cardInfo, setCardInfo] = React.useState({
    cvc:'',
    expiration_date: '',
    card_owner:'',
    card_number:'',
    card_name: '',
    card_id: '',
  })
  const [newCardInfo, setNewCardInfo] = React.useState({
    cvc:'',
    expiration_date: '',
    card_owner:'',
    card_number:'',
    card_name: '',
    card_id: '',
  })

  let history = useHistory();


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

  const handleClick = (cardID) => {
    fetch(serverUrl + 'api/credit-cards/'+cardID, {
      method: 'GET',
      headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
    }).then(res => res.json())
      .then(json => {
        cardInfo.card_owner = json.card_owner
        cardInfo.card_number= json.card_number
        cardInfo.expiration_date = json.expiration_date
        cardInfo.cvc = json.cvc_security_number
        cardInfo.card_name = json.name
        cardInfo.card_id = json.id
      }).then(()=>{
        setOpen(true)
    })
      .catch(err => {
        alert('Some error has occurred')
        console.log(err)
      });
  };

  const handleClickAdd = () => {
    setOpenAdd(true)
  }

  const handleDelete = () => {
    let data = {
      creditcard_id : cardInfo.card_id
    }
    fetch(serverUrl + 'api/credit-cards/opts/delete/', {
      method: 'POST',
      headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(json => {
        console.log(json)
      }).then(() => {
        setOpen(false)
        window.location.reload();
    })
      .catch(err => console.log(err));
  }

  const handleSave = () => {
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
    else if(!/[0-9]{16}/.test(cardNumber.replaceAll(" ",""))){
      setErrorCardNumber(true)
      setCardMsg('Only integer values')
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

      fetch(serverUrl + 'api/credit-cards/opts/add/', {
        method: 'POST',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
        body: JSON.stringify(data)

      }).then(res => res.json())
        .then(json => {
          if(json.success){
            alert("Your card is successfully added to the system.")
          }
          else{
            alert(json.error)
          }
          setOpenAdd(false)
          window.location.reload()
        })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    if (token) {
      fetch(serverUrl + 'api/credit-cards/opts/get_all_credit_cards/', {
        method: 'POST',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
      }).then(res => res.json())
        .then(json => {
          setAllCards(JSON.parse(JSON.stringify(json)));
        }).then(() => {
        setLoadPage(true);
      })
        .catch(err => console.log(err));
    } else {
      alert('Please login to order')
      history.push('/login')
    }

  },[]);

  const body = (
    <div className={classes.paper2} >
      <div>
        <Cards
          cvc={cardInfo.cvc}
          expiry={cardInfo.expiration_date}
          name={cardInfo.card_owner}
          number={cardInfo.card_number}
        />
      </div>
      <div>
        <TextField
          style={{width:"20rem", marginTop:"1rem"}}
          name="number"
          label="Card Number"
          inputProps={{ pattern: "[\d| ]{16,22}" }}
          value={cardInfo.card_number}
          disabled={true}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          style={{width:"20rem", marginTop:"1rem"}}
          name="name"
          label="Card Owner"
          value={cardInfo.card_owner}
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
          value={cardInfo.expiration_date}
          disabled={true}
          variant="outlined"
        />
        <TextField
          style={{width:"9rem", marginTop:"1rem",marginLeft:"2rem"}}
          name="cvc"
          inputProps={{ pattern: "\d{3,4}" }}
          label="CVC"
          value={cardInfo.cvc}
          disabled={true}
          variant="outlined"
        />
      </div>
      <div>
        <Button
          style={{
            width: "10rem",
            marginLeft: "8rem",
            marginRight: "8rem",
            marginTop: "2rem",
            backgroundColor: "#0B3954",
          }}
          variant="contained" color="primary"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  const bodyAdd = (
    <div className={classes.paper3} >
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
      <Button
        style={{
          width: "20rem",
          marginLeft: "10rem",
          marginRight: "10rem",
          marginTop: "2rem",
          backgroundColor: "#0B3954",
        }}
        variant="contained" color="primary"
        onClick={handleSave}
      >
        Save Card
      </Button>
    </div>
  );

  return (
    <div>
      <div className="Home">
        <Navbar/>
      </div>
      <div>
        <CategoryTab/>
      </div>
      <Breadcrumbs style={{color: "#0B3954", marginTop:"1rem"}} separator="›">
        <Link style={{marginLeft: "3rem", color: "#0B3954"}} to="/profile">
          My Account
        </Link>
        <Link style={{color: "#0B3954"}} to="/profile/savedCards">
          Saved Credit Cards
        </Link>
      </Breadcrumbs>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              <Box color={"#0B3954"} fontWeight="fontWeightBold" m={1}>
                Saved Credit Cards
              </Box>
            </Typography>
            {loadPage ? (
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >
                {allCards.map((card, index) => (
                    <Box style={{marginTop: "1rem", marginBottom: "1rem"}} key={index}>
                      <ListItem button onClick={() => handleClick(card.id)}>
                        <ListItemIcon>
                          <CreditCardIcon style={{color: "#0B3954", marginRight:"0.5rem"}} fontSize={"large"}/>
                        </ListItemIcon>
                        <ListItemText primary={card.name} />
                      </ListItem>
                        <Modal
                          className={classes.modal}
                          open={open}
                          onClose={() => setOpen(false)}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          {body}
                        </Modal>
                      <Divider/>
                    </Box>
                ))}
                <Button
                  style={{
                    width: "20rem",
                    marginLeft: "10rem",
                    marginRight: "10rem",
                    marginTop: "2rem",
                    backgroundColor: "#0B3954",
                  }}
                  variant="contained" color="primary"
                  onClick={handleClickAdd}
                >
                  Add New Credit Card
                </Button>
                <Modal
                  className={classes.modal2}
                  open={openAdd}
                  onClose={() => setOpenAdd(false)}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {bodyAdd}
                </Modal>
              </List>) : null}
          </Paper>
        </Grid>
      </Grid>
      <Footer/>
    </div>
  );
}

