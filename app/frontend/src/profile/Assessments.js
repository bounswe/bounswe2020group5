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

export default function Assessments() {

    const classes = useStyles();
    let history = useHistory();

    const token = localStorage.getItem('token')
    const vendor = localStorage.getItem('is_vendor')

    const [loadPage, setLoadPage] = React.useState(false);
    const [reviews, setReviews] = React.useState();

    //get all reviews the customer posted before
    useEffect(() => {
        //if guest or vendor, dont give access
        if (!token || vendor==="true" ) {
            alert('Please login to see this page')
            history.push('/login')
        }

        fetch(serverUrl + 'api/products/opts/get_user_comments/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
        }).then(res => res.json())
            .then(json => {
                setReviews(json);
                console.log(json);
                setLoadPage(true); //render
            }).then(() => {}).catch(err => console.log(err));
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
                <Link style={{color: "#0B3954"}} to="/profile/assessments">
                    Assessments
                </Link>
            </Breadcrumbs>
            {loadPage ? (
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={9}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4" gutterBottom>
                                <Box color={"#0B3954"} fontWeight="fontWeightBold" m={1}>
                                    Assessments
                                </Box>
                            </Typography>
                            <List>
                                {Object.keys(reviews).map((review, index) => (
                                    <Box style={{marginTop: "2rem", marginBottom: "2rem"}} key={index}>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <Link to={{pathname: `/product/${reviews[review].product.id}`}} style={{textDecoration: "none", color: "black"}}>
                                                    <img style={{margin:"1rem", width: "8rem", height: "8rem"}} src={reviews[review].product.image_url} alt={reviews[review].product.id}/>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={8} >
                                                <Typography style={{marginTop:"0.5rem", marginBottom:"1.5rem", fontWeight:"bold", fontSize:"20px"}} >{reviews[review].product.name}</Typography>
                                                <Rating name="read-only" value={reviews[review].rating_score} precision={0.1} readOnly/>
                                                <Typography style={{marginTop:"0.5rem", marginBottom:"0.5rem"}} >{reviews[review].comment_text}</Typography>
                                            </Grid>
                                            <Grid item xs={2} style={{marginTop: "2rem"}}>
                                                <Link to={{pathname: `/product/${reviews[review].product.id}`}} style={{ marginLeft:"5rem", textDecoration: "none", color: "black"}}>
                                                    <ArrowForwardIcon style={{fontSize:50, color:"#0B3954"}}/>
                                                </Link>
                                            </Grid>
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

