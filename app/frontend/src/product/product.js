import React, {Component, useEffect, useState} from 'react';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Footer from "../components/Footer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Favorite} from "@material-ui/icons";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import {Link, useLocation} from "react-router-dom";
import {serverUrl} from "../common/ServerUrl";
import CommentList from "./CommentList";
import Checkbox from "@material-ui/core/Checkbox";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginLeft: 100,
        marginRight: 100,
        marginTop: 20,
        marginBottom: 20,
        maxWidth: 1500,
        maxHeight: 1500,

    },
    image: {
        width: 460,
        height: 480,
    },
    img: {
        marginTop: 50,
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


export default function ComplexGrid() {
    const classes = useStyles();
    const [loadPage1, setLoadPage1] = React.useState(false);
    const [loadPage2, setLoadPage2] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [stars, setStars] = React.useState(0);
    let [heartclick, setheartclick] = useState(false);
    let [listclick, setlistclick] = useState(false);
    let [countclickamount, setcount] = useState(1);
    let product = useLocation();
    let random = [{author: "a1", text: "comment1",}, {author: "a2", text: "comment2",}, {
        author: "a3",
        text: "comment3",
    }];

    const [state, setState] = useState({
        name: '',
        price: '',
        imgsrc: '',
        rating: '',
        temp_comment: '',
        comments: [],
    });


    fetch(serverUrl + 'api/products/' + product.id, {
        method: 'GET',
    }).then(res => res.json())
        .then(json => {
            state.name = json.name;
            state.price = json.price;
            state.brand = json.brand;
            state.vendor = json.vendor;
            state.discount = json.discount;
            state.description = json.description;
            state.imgsrc = json.image_url;
            state.rating = json.rating;
            setLoadPage1(true);
        })
        .catch(err => console.log(err));

    fetch(serverUrl + 'api/products/opts/get_all_comments/', {
        method: 'POST',
        body: JSON.stringify({ product_id : product.id }),
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json())
        .then(json => {
            state.comments = json;
            setLoadPage2(true);
        })
        .catch(err => console.log(err));

    const handlecountplus = () => {
        if (countclickamount < 10) {
            countclickamount = countclickamount + 1;
        }
        setcount(countclickamount);
    };

    const handlecountminus = () => {
        if (countclickamount > 1) {
            countclickamount = countclickamount - 1;
        }
        setcount(countclickamount);
    };

    const handlelistcount = () => {
        if (listclick) {
            listclick = false;
        } else {
            listclick = true;
        }
        setlistclick(listclick);
    };

    const handleclickheart = () => {
        if (heartclick) {
            setheartclick(false);
        } else {
            setheartclick(true);
        }
    };

    function onChange(event) {
        var mutableState = state
        mutableState[event.target.id] = event.target.value
        setState(mutableState)
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    function handleOnButtonClick() {
        const token = localStorage.getItem('token')

        let data = {
            product_id: product.id,
            comment_text: state.temp_comment,
            is_anonymous: checked,
            rating_score: stars,
        }
        fetch(serverUrl + 'api/products/opts/add_comment/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(json => {
                const success = json.success
                if (success) {
                    alert('Your review is posted!')
                } else alert('Unsuccesful review!')})
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className={classes.root}>
                <div>
                    <div className="Home">
                        <Navbar/>
                    </div>
                    <div>
                        <CategoryTab/>
                    </div>
                </div>
            </div>

                {loadPage1 && loadPage2  ? (
                    <div>

                        <Paper justifyContent={'center'} className={classes.paper}>
                            <Grid container >
                                <Grid>
                                    <Grid>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} alt="complex" src={state.imgsrc}/>
                                        </ButtonBase>
                                    </Grid>
                                    <Grid container alignItems={"center"} justify="center">
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Rating style={{marginLeft: "2rem", justify: 'center'}}
                                            name="read-only" value={state.rating} precision={0.1} readOnly />
                                        </Box>
                                    </Grid>
                                </Grid>


                                <Grid sm container style={{marginLeft: "2rem"}}>
                                    <Grid>
                                        <Grid style={{marginTop:"2rem"}}>
                                            <Typography gutterBottom variant="subtitle1">
                                                {state.name}
                                            </Typography>
                                            <Divider/>
                                            <Typography style={{marginTop: "4rem", marginBottom: "2rem", display: 'inline-block'}} variant="body2"
                                                        gutterBottom>
                                                Brand:
                                            </Typography>
                                            <Typography style={{marginBottom: "2rem", display: 'inline-block'}} variant="body2"
                                                        color="textSecondary">
                                                 {state.brand}
                                            </Typography>
                                            <Divider/>
                                            <Typography style={{marginTop: "4rem", marginBottom: "2rem", display: 'inline-block'}} variant="body2"
                                                        gutterBottom>
                                                Price:
                                            </Typography>
                                            <Typography style={{marginTop: "4rem", marginBottom: "2rem", display: 'inline-block'}}
                                                        variant="body2" color="textSecondary">
                                                {state.price}
                                            </Typography>
                                            <Divider/>
                                            <Typography style={{marginTop: "4rem", marginBottom: "2rem", display: 'inline-block'}} variant="body2"
                                                        gutterBottom>
                                                Vendor:
                                            </Typography>
                                            <Typography style={{marginBottom: "2rem", display: 'inline-block'}} variant="body2"
                                                        color="textSecondary">
                                                {state.vendor}
                                            </Typography>
                                            <Divider/>
                                            <Typography style={{marginTop: "4rem", marginBottom: "2rem"}} variant="body2"
                                                        gutterBottom>
                                                Product Description:
                                            </Typography>
                                            <Typography style={{marginBottom: "2rem"}} variant="body2"
                                                        color="textSecondary">
                                                {state.description}
                                            </Typography>
                                            <Divider/>

                                            <IconButton style={{marginTop: "2rem"}}
                                                        onClick={handlelistcount}>
                                                {listclick ? <TurnedInIcon fontSize={"large"}/> :
                                                    <TurnedInNotIcon fontSize={"large"}/>}
                                            </IconButton>
                                            <IconButton style={{marginTop: "2rem"}}
                                                        onClick={handleclickheart}>
                                                {heartclick ? <Favorite fontSize={"large"}/> :
                                                    <FavoriteBorderIcon fontSize={"large"}/>}
                                            </IconButton>

                                        </Grid>
                                        <Grid style={{marginBottom: "1rem", marginLeft: "20rem"}}>
                                            <div>
                                                <ButtonGroup style={{marginLeft: "9rem"}} variant="text" color="#FFFFFF" aria-label="text primary button group">
                                                    <IconButton
                                                        onClick={handlecountplus}>
                                                        <AddIcon/>
                                                    </IconButton>
                                                    <Button size='small' id="outlined-basic" label="0" variant="outlined">
                                                        {countclickamount}
                                                    </Button>
                                                    <IconButton
                                                        onClick={handlecountminus}>
                                                        <RemoveIcon/>
                                                    </IconButton>
                                                </ButtonGroup>
                                                <Button size="large" variant="contained" style={{
                                                    marginLeft: "9.1rem",
                                                    marginTop: "1rem",
                                                    marginBottom: "1rem",
                                                    cursor: 'pointer',
                                                    background: '#0B3954',
                                                    color: 'white'
                                                }}>
                                                    PURCHASE
                                                </Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper justifyContent={'center'} className={classes.paper}>
                            <Grid >
                                <Box component="fieldset" mb={3} borderColor="transparent" >
                                    <div>
                                        <Typography style={{display: 'inline-block', marginRight: '2rem'}}>Please give a rating</Typography>
                                        <Rating
                                            id="temp_rating"
                                            name="temp_rating"
                                            value={stars}
                                            onChange={(event, newValue) => {
                                                setStars(newValue);
                                            }}
                                        />

                                    </div>
                                </Box>

                            </Grid>
                            <div>
                                <TextField style={{"height": "100%", "width": "100%"}}
                                           id="temp_comment"
                                           label="Please write a comment"
                                           multiline
                                           rows={4}
                                           defaultValue=""
                                           variant="outlined"
                                           onChange={onChange}
                                />
                            </div>
                            <Button size="large" variant="contained" style={{
                                marginTop: "1rem",
                                marginBottom: "1rem",
                                cursor: 'pointer',
                                background: '#0B3954',
                                color: 'white'
                            }} onClick={handleOnButtonClick}>
                                ADD REVIEW
                            </Button>
                            <Checkbox
                                id="checked"
                                checked={checked}
                                color="primary"
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'primary checkbox'}}
                            />
                            <Typography style={{display: 'inline-block'}}  >Review as anonymous</Typography>

                        </Paper>

                        <Paper justifyContent={'center'} className={classes.paper}>
                            COMMENT SECTION ({state.comments.length})
                            <CommentList commentList={state.comments}/>
                        </Paper>
                        <div>
                            <Footer/>
                        </div>
                    </div>) : null}
            </div>
            );
}
