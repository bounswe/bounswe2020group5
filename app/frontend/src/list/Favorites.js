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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        marginTop: "2rem",
        marginBottom: "2rem",
        padding: theme.spacing(5),
    },
    header: {
        marginLeft: "1rem",
        fontSize: "1.2rem",
    },
    subtext: {
        marginLeft: "1rem",
        fontSize: "0.8rem",
    },
    subtext_discount: {
        marginLeft: "1rem",
        fontSize: "0.8rem",
        color: "#7A0010",
        display: "inline-block"
    },
    iconbutton: {
        marginRight:"1rem",
        "&:hover": {
            backgroundColor: "transparent",
        },
    }
}));

export default function Favorites() {

    const classes = useStyles();
    const token = localStorage.getItem('token')
    const [loadPage, setLoadPage] = React.useState(false);
    const [list, setList] = React.useState([]);
    let history = useHistory();

    const HandleRemove = (event) => {
        fetch(serverUrl + 'api/favorites/remove/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'product_id': event.target.value })
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                if(json.ok){
                    alert("Product has been removed from your favorites!")
                    window.location.reload()
                } else alert(json.message)
            })
    };

    useEffect(() => {
        if (token) {
            fetch(serverUrl + 'api/favorites/get/', {
                method: 'GET',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
            }).then(res => res.json())
                .then(json => {
                    setList(json);
                    setLoadPage(true);
                }).then(() => {
            })
                .catch(err => console.log(err));
        } else {
            alert('Please login to see this page')
            history.push('/login')
        }
    }, []);


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
                <Link style={{color: "#0B3954"}} to="/profile/lists">
                    My Lists
                </Link>
                <Typography> Favorites </Typography>
            </Breadcrumbs>
            {loadPage ? (
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4" gutterBottom>
                                <Box color={"#7A0010"} fontWeight="fontWeightBold" m={1}>
                                    Favorites
                                </Box>
                            </Typography>
                            {list.products.length > 1 ? (
                                <Typography style={{marginLeft: "1rem"}}
                                            variant="inherit"> {list.products.length} Products </Typography>
                            ) : <Typography style={{marginLeft: "1rem"}}
                                            variant="inherit"> {list.products.length} Product </Typography>}

                            <List>
                                {list.products.map((product, index) => (

                                    <Box style={{marginTop: "1rem", marginBottom: "1rem"}} key={index}>
                                        <Grid xs container>
                                            <IconButton size="small" className={classes.iconbutton} value={product.id} onClick={HandleRemove}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        <Link to={{pathname: `/product/${product.id}`}}
                                              style={{textDecoration: "none", color: "black"}}>
                                            <Grid xs container>
                                                <Grid item>
                                                    <img style={{width: "6rem", height: "6rem"}} src={product.image_url}
                                                         alt={product.name}/>
                                                </Grid>
                                                <Grid item>
                                                    <Typography className={classes.header}> {product.name} </Typography>
                                                    {product.discount > 0 ? (
                                                        <Grid container>
                                                            <Grid item>
                                                                <Typography
                                                                    className={classes.subtext}> {product.vendor} </Typography>
                                                                <Typography
                                                                    className={classes.subtext}> $ {product.price} </Typography>
                                                                <Typography
                                                                    className={classes.subtext_discount}> $ {(product.price - product.price * product.discount / 100).toFixed(2)} </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <img style={{
                                                                    width: "3rem",
                                                                    height: "3rem",
                                                                    marginLeft: "2rem"
                                                                }} src="/img/discount.png"/>
                                                            </Grid>
                                                        </Grid>
                                                    ) : (
                                                        <div>
                                                            <Typography
                                                                className={classes.subtext}> {product.vendor} </Typography>
                                                            <Typography
                                                                className={classes.subtext}> $ {product.price} </Typography>
                                                        </div>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Link>
                                        </Grid>
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

