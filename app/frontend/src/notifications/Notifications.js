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
import List from "@material-ui/core/List";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: theme.spacing(5),
  },
}));

export default function Notifications() {

  const classes = useStyles();
  let history = useHistory();

  const token = localStorage.getItem('token')
  const vendor = localStorage.getItem('is_vendor')

  const [loadPage, setLoadPage] = React.useState(false);
  let [notifications, setNotifications] = React.useState("");
  var len;
  //get all notifications

  useEffect(() => {
    //if guest or vendor, dont give access
    if (!token || vendor=="true" ) {
      alert('Please login to see this page')
      history.push('/login')
    }

    fetch(serverUrl + 'api/notifications/my/', {
      method: 'GET',
      headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
    }).then(res => res.json())
      .then(json => {
        notifications = json;
        len = Object.keys(JSON.parse(JSON.stringify(json))).length
      }).then(() => {
        console.log(notifications)
    })
      .then(() => {
        var i;
        for(i=0; i<len; i++){
          let data = {
            notification_id: notifications[i].id
          }
          setNotifications(notifications)
          fetch(serverUrl + 'api/notifications/set_seen/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          }).then(res => res.json())
            .then(json => {
              console.log(json)
            }).catch(err => console.log(err));
        }
        setLoadPage(true); //render page
      }).catch(err => console.log(err ));

  }, []);
  return (
    <div>
      <div className="Home">
        <Navbar notificationpage={true}/>
      </div>
      <div>
        <CategoryTab />
      </div>

      {loadPage ? (
        <Grid container justify="center" spacing={3}>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <Typography variant="h4" gutterBottom>
                <Box color={"#0B3954"} fontWeight="fontWeightBold" m={1}>
                  Notifications
                </Box>
              </Typography>
              <Divider/>
              <List>
                {Object.keys(notifications).map((notification, index) => (
                  <Box style={{marginTop: "2rem", marginBottom: "2rem"}} key={index}>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography style={{marginTop:"0.5rem", marginBottom:"0.5rem",fontWeight:"bold",fontSize:"20px",color:"#a71325"}} >
                          {notifications[notification].text}
                        </Typography>
                      </Grid>
                      {notifications[notification].order !== null && notifications[notification].product === null ? (
                        <Grid item xs={2}>
                        <Link to={"/orders"} style={{ marginLeft:"5rem", textDecoration: "none", color: "black"}}>
                          <ArrowForwardIcon style={{fontSize:50, color:"#0B3954"}}/>
                        </Link>
                        </Grid>
                      ):(null)}
                    </Grid>
                    {notifications[notification].product !== null ? (
                      <Grid container>
                        <Grid item xs={2}>
                          <Link to={{pathname: `/product/${notifications[notification].product.id}`}}  style={{textDecoration: "none", color: "black"}}>
                            <img style={{margin:"1rem", width: "8rem", height: "8rem"}} src={notifications[notification].product.image_url} alt={notifications[notification].product.id}/>
                          </Link>
                        </Grid>
                        <Grid item xs={8} >
                          <Typography style={{marginTop:"0.5rem", marginBottom:"1.5rem", fontWeight:"bold", fontSize:"20px"}} >{notifications[notification].product.name}</Typography>
                          <Typography style={{marginTop:"0.5rem", marginBottom:"0.5rem"}} >{notifications[notification].product.description}</Typography>
                        </Grid>
                        <Grid item xs={2} style={{marginTop: "2rem"}}>
                          <Link to={{pathname: `/product/${notifications[notification].product.id}`}} style={{ marginLeft:"5rem", textDecoration: "none", color: "black"}}>
                            <ArrowForwardIcon style={{fontSize:50, color:"#0B3954"}}/>
                          </Link>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container>
                      <Grid item xs={2} style={{marginTop: "2rem"}}>
                      </Grid>
                    </Grid>)}
                    <Divider/>
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>) : null}
      <Footer/>
    </div>
  );
}

