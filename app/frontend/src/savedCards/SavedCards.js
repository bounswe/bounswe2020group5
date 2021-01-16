import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Divider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {serverUrl} from "../common/ServerUrl";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Footer from "../components/Footer";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import {ExpandLess, ExpandMore, Favorite} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import Cards from "react-credit-cards";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: "0.5"
  },
}));

export default function ListPage() {

  const classes = useStyles();
  const token = localStorage.getItem('token')
  const [loadPage, setLoadPage] = React.useState(false);
  const [allCards, setAllCards] = React.useState([]);
  const [faves, setFaves] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [cardInfo, setCardInfo] = React.useState({
    cvc:'',
    expiration_date: '',
    card_owner:'',
    card_number:'',
    card_name: '',
  })

  let history = useHistory();

  const handleClick = (cardID) => {
    console.log(cardID)
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
        console.log(json)
      }).then(()=>{
        setOpen(true)
    })
      .catch(err => {
        alert('Some error has occurred')
        console.log(err)
      });
  };

  const handleDelete = () => {

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
          onClick={() => handleDelete}
        >
          Delete
        </Button>
      </div>
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
                          transparent={true}
                          onClose={() => setOpen(false)}
                          aria-labelledby="simple-modal-title"
                          aria-describedby="simple-modal-description"
                        >
                          {body}
                        </Modal>
                      <Divider/>
                    </Box>
                ))}
              </List>) : null}
          </Paper>
        </Grid>
      </Grid>
      <Footer/>
    </div>
  );
}

