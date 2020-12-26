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
import {Favorite} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";

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
}));

export default function ListPage() {

    const classes = useStyles();
    const token = localStorage.getItem('token')
    const [loadPage, setLoadPage] = React.useState(false);
    const [listlist, setlistlist] = React.useState([]);
    const [faves, setFaves] = React.useState([]);
    let history = useHistory();

    useEffect(() => {
        if(token) {
            fetch(serverUrl + 'api/product-lists/opts/my/', {
                method: 'GET',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
            }).then(res => res.json())
                .then(json => {
                    setlistlist(json);
                }).then(() => {
            })
                .catch(err => console.log(err));

            fetch(serverUrl + 'api/favorites/get/', {
                method: 'GET',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
            }).then(res => res.json())
                .then(json => {
                    setFaves(json);
                    setLoadPage(true);
                }).then(() => {
            })
                .catch(err => console.log(err));
        } else {
            alert('Please login to see my lists page')
            history.push('/login')
        }

    },[]);

    return (
        <div>
            <div className="Home">
                <Navbar/>
            </div>
            <div>
                <CategoryTab/>
            </div>
            <Grid container justify="center" spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            <Box color={"#0B3954"} fontWeight="fontWeightBold" m={1}>
                                My Lists
                            </Box>
                        </Typography>
                        {loadPage ? (
                            <MenuList>
                                <Link to={{pathname: '/profile/lists/favorites'}} style={{ textDecoration: "none" , color:"black"}}>
                                <MenuItem>
                                    <Favorite style={{color: "#7A0010",  marginRight:"0.5rem"}} fontSize={"large"}/>
                                    <Typography variant="inherit"> Favorites </Typography>
                                    { faves.products.length > 1 ? (
                                        <Typography style={{ marginLeft:"1rem"}} variant="inherit"> ({faves.products.length} Products) </Typography>
                                    ):  <Typography style={{ marginLeft:"1rem"}} variant="inherit"> ({faves.products.length} Product) </Typography>}
                                </MenuItem>
                                </Link>
                                <Divider/>
                                {listlist.map((list, index) => (
                                    <Link to={{pathname: `/profile/lists/${list.id}`}} style={{ textDecoration: "none" , color:"black"}}>
                                    <Box style={{marginTop: "1rem", marginBottom: "1rem"}} key={index}>
                                        <MenuItem>
                                            <TurnedInIcon style={{color: "#0B3954", marginRight:"0.5rem"}} fontSize={"large"}/>
                                            <Typography variant="inherit"> {list.name} </Typography>
                                            { list.products.length > 1 ? (
                                                <Typography style={{ marginLeft:"1rem"}} variant="inherit"> ({list.products.length} Products) </Typography>
                                            ):  <Typography style={{ marginLeft:"1rem"}} variant="inherit"> ({list.products.length} Product) </Typography>}
                                        </MenuItem>
                                        <Divider/>
                                    </Box>
                                    </Link>
                                ))}
                            </MenuList>) : null}
                    </Paper>
                </Grid>
            </Grid>
            <Footer/>
        </div>
    );
}

