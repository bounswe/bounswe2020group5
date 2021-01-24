import React, {useEffect, useState} from 'react';
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
import {serverUrl} from "../common/ServerUrl";
import CommentList from "./CommentList";
import Checkbox from "@material-ui/core/Checkbox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CustomizedDialogs from "../components/dialog";

import {Link} from "react-router-dom";
import Input from "@material-ui/core/Input";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


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
    },
    image: {
        width: 460,
        height: 480,
    },
    img: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));


const Product = (props) => {
    const {id} = props.match.params;
    const classes = useStyles();
    const [loadPage1, setLoadPage1] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [stars, setStars] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    let [heartclick, setheartclick] = useState(false);
    let [listclick, setlistclick] = useState(false);
    let [messageclick, setmessageclick] = useState(false);
    let [countclickamount, setcount] = useState(1);
    let [purchased, setPurchased] = useState(false);
    const token = localStorage.getItem('token')
    const vendor = localStorage.getItem('is_vendor')
    const [mylists, setMylists] = React.useState([]);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const [state, setState] = useState({
        name: '',
        price: '',
        imgsrc: '',
        rating: '',
        vendorrating: '',
        temp_comment: '',
        comments: [],
        newlist: "",
    });

    useEffect(() => {

        if (token && vendor==="false") {
            Promise.all([
                fetch(serverUrl + 'api/orders/customer-purchased/', {
                    method: 'POST',
                    headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                    body: JSON.stringify({product_id: id}),
                }).then(res => res.json())
                    .then(json => {
                        setPurchased(json.message)
                    }),
                fetch(serverUrl + 'api/favorites/get/', {
                    method: 'GET',
                    headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
                }).then(res => res.json())
                    .then(json => {
                        for (let j = 0; j < json.products.length; j++) {
                            console.log(json.products[j]);
                            if ("" + json.products[j].id === id)
                                setheartclick(true);
                        }
                    })
            ]).catch((err) => {
                console.log(err);
            })

        }

        Promise.all([
            fetch(serverUrl + 'api/products/' + id, {
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
            }),
            fetch(serverUrl + 'api/products/opts/get_all_comments/', {
            method: 'POST',
            body: JSON.stringify({product_id: id}),
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json())
            .then(json => {
                state.comments = json;
            }),
            fetch(serverUrl + 'api/orders/avg-rating-product-page/', {
                method: 'POST',
                body: JSON.stringify({product_id: id}),
                headers: {'Content-Type': 'application/json'},
            }).then(res => res.json())
                .then(json => {
                    state.vendorrating = json.score.toFixed(1);
                })
        ]).then(() => {
            setLoadPage1(true);
            //json response
        }).catch((err) => {
            console.log(err);
        })
    }, []);

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

    const handlelistcount = (event) => {
        fetch(serverUrl + 'api/product-lists/opts/my/', {
            method: 'GET',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
        }).then(res => res.json())
            .then(json => {
                setMylists(json);
            });
        setAnchorEl(event.currentTarget);
    };

    const addtolist = function (list) {
        fetch(serverUrl + 'api/product-lists/opts/add_product/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'list_id': list.id, 'product_id': id})
        }).then(res => res.json())
            .then(json => {
                if (json.ok) {
                    if (json.message === "product added") alert("Product has been added to your list")
                    else alert(json.message)
                    setlistclick(true);
                } else alert(json.message)
            }).catch((err) => {
            console.log(err);
        })
        handleClose();
    }

    const addtonewlist = async function () {
        let temp = {};

        const res = await fetch(serverUrl + 'api/product-lists/opts/add/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'name': state.newlist})
        });
        const body = await res.json();
        if (body.ok) {
            temp = body.data;
        } else alert(body.message)

        var mutableState = state
        mutableState["newlist"] = ""
        setState(mutableState)
        await addtolist(temp);
    }

    const snackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
        setOpen2(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleclickheart = () => {
        if (heartclick) {
            fetch(serverUrl + 'api/favorites/remove/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify({'product_id': id})
            }).then(res => res.json())
                .then(json => {
                    if (json.ok) {
                        alert(json.message)
                    } else alert(json.message)
                }).catch((err) => {
                console.log(err);
            })
            setheartclick(false);
        } else {
            fetch(serverUrl + 'api/favorites/add/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify({'product_id': id})
            }).then(res => res.json())
                .then(json => {
                    if (json.ok) {
                        alert(json.message)
                    } else alert(json.message)
                }).catch((err) => {
                console.log(err);
            })
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

    function addtocart() {
        fetch(serverUrl + 'api/cart/edit/', {
            method: 'POST',
            body: JSON.stringify({product_id: id, count: countclickamount}),
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
        }).then(res => res.json()).then(json => {
            if (json.ok) {
                setMessage(json.message);
                setOpen1(true);
            } else {
                setMessage(json.message);
                setOpen2(true);
            }
        }).catch(err => console.log(err));
    }

    function handleOnButtonClick() {

        let data = {
            product_id: id,
            comment_text: state.temp_comment,
            is_anonymous: checked,
            rating_score: stars,
        }

        if (data.rating_score == 0) {
            alert("You forgot to give a rating. Min. rating allowed is 1.")
        } else {
            Promise.all([fetch(serverUrl + 'api/products/opts/add_comment/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(json => {
                    const success = json.success
                    if (success) {
                        window.location.reload()
                        alert('Your review is posted!');
                    } else alert('Your review could not be posted!')
                }),
                fetch(serverUrl + 'api/products/opts/get_all_comments/', {
                    method: 'POST',
                    body: JSON.stringify({product_id: id}),
                    headers: {'Content-Type': 'application/json'},
                }).then(res => res.json())
                    .then(json => {
                        state.comments = json;
                    })]).then(
            ).catch(err => console.log(err));
        }
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

            {loadPage1 ? (
                <div>
                    <Paper className={classes.paper}>
                        <Grid xs item container>
                            <Grid xs item container justify="center">
                                <Grid container justify="center">
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={state.imgsrc}/>
                                    </ButtonBase>
                                </Grid>
                                <Grid container justify="center">
                                    <Rating name="read-only" value={state.rating} precision={0.1} readOnly/>
                                </Grid>
                                {token && vendor==="false" ? (

                                    <Grid container alignItems={"center"} justify="center">

                                        <CustomizedDialogs vendor={state.vendor}
                                                           productid={JSON.parse(JSON.stringify(id))}/>

                                        <IconButton onClick={handlelistcount}>
                                            {listclick ? <TurnedInIcon style={{color: "#0B3954"}} fontSize={"large"}/> :
                                                <TurnedInNotIcon fontSize={"large"}/>}
                                        </IconButton>
                                        <Menu
                                            id="simple-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}>
                                            <MenuItem>
                                                <Input id="newlist" placeholder="New List" onChange={onChange}/>
                                                <IconButton aria-label="add" onClick={addtonewlist}>
                                                    <AddBoxIcon style={{color: "#0B3954", marginRight: "0.5rem"}}
                                                                fontSize={"medium"}/>
                                                </IconButton>
                                            </MenuItem>
                                            <Divider/>
                                            {mylists.map(list => (
                                                <Box>
                                                    <MenuItem key={list.id}
                                                              onClick={(event) => addtolist(list, event)}>{list.name}</MenuItem>
                                                    <Divider/>
                                                </Box>
                                            ))}
                                        </Menu>
                                        <IconButton onClick={handleclickheart}>
                                            {heartclick ? <Favorite style={{color: "#7A0010"}} fontSize={"large"}/> :
                                                <FavoriteBorderIcon fontSize={"large"}/>}
                                        </IconButton>
                                    </Grid>) : null}
                            </Grid>

                            <Grid xs item container style={{marginLeft: "2rem"}}>
                                <Grid>
                                    <Grid style={{marginTop: "2rem"}}>
                                        <Typography gutterBottom variant="subtitle1">{state.name}</Typography>
                                        <Divider/>
                                        <Typography
                                            style={{
                                                marginTop: "4rem",
                                                marginBottom: "2rem",
                                                display: 'inline-block'
                                            }}
                                            variant="body2"
                                            gutterBottom>
                                            Brand:
                                        </Typography>
                                        <Typography style={{marginBottom: "2rem", display: 'inline-block'}}
                                                    variant="body2"
                                                    color="textSecondary">
                                            {state.brand}
                                        </Typography>
                                        <Divider/>
                                        {state.discount > 0 ? (
                                            <div>
                                                <Grid container direction="row" alignItems="center">
                                                    <Grid item>
                                                        <div>
                                                            <Typography style={{
                                                                marginTop: "4rem",
                                                                marginBottom: "2rem",
                                                                display: 'inline-block'
                                                            }} variant="body2"
                                                                        gutterBottom>
                                                                Price: $
                                                            </Typography>
                                                            <Typography style={{
                                                                marginTop: "4rem",
                                                                marginBottom: "2rem",
                                                                display: 'inline-block'
                                                            }}
                                                                        variant="body2" color="textSecondary">
                                                                {state.price}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography style={{
                                                                marginBottom: "2rem",
                                                                display: 'inline-block',
                                                                color: "red"
                                                            }} variant="body2"
                                                                        gutterBottom>
                                                                Discounted Price: $
                                                            </Typography>
                                                            <Typography style={{
                                                                marginBottom: "2rem",
                                                                display: 'inline-block',
                                                                color: "red"
                                                            }}
                                                                        variant="body2" color="textSecondary">
                                                                {(state.price - state.price * state.discount / 100).toFixed(2)}
                                                            </Typography>
                                                        </div>

                                                    </Grid>
                                                    <Grid item>
                                                        <img style={{width: "4rem", height: "4rem"}}
                                                             src="/img/discount.png" alt="discount icon"/>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ) : (
                                            <div>
                                                <Typography style={{
                                                    marginTop: "4rem",
                                                    marginBottom: "2rem",
                                                    display: 'inline-block'
                                                }} variant="body2"
                                                            gutterBottom>
                                                    Price: $
                                                </Typography>
                                                <Typography style={{
                                                    marginTop: "4rem",
                                                    marginBottom: "2rem",
                                                    display: 'inline-block'
                                                }}
                                                            variant="body2" color="textSecondary">
                                                    {state.price}
                                                </Typography>
                                            </div>)
                                        }
                                        <Divider/>
                                        <Typography
                                            style={{
                                                marginTop: "4rem",
                                                marginBottom: "2rem",
                                                display: 'inline-block'
                                            }}
                                            variant="body2"
                                            gutterBottom>
                                            Vendor:
                                        </Typography>
                                        <Typography style={{marginLeft: "1rem", marginBottom: "2rem", display: 'inline-block'}}
                                                    variant="body2"
                                                    color="textSecondary">
                                            {state.vendor}
                                        </Typography>
                                        {state.vendorrating>8 ? (<Button style={{background:"#40a119", fontSize:"1rem", color:"white", marginLeft:"2rem", display: 'inline-block'}} variant="contained" disabled>{state.vendorrating}</Button>):
                                            state.vendorrating>5 ? (<Button style={{background:"#f3de8a", fontSize:"1rem", color:"#0b3954",marginLeft:"2rem", display: 'inline-block'}} variant="contained" disabled>{state.vendorrating}</Button>):
                                                    (<Button style={{background:"#a71325",  fontSize:"1rem", color:"white",marginLeft:"2rem", display: 'inline-block'}} variant="contained" disabled>{state.vendorrating}</Button>)}
                                        <Divider/>
                                        <Typography style={{marginTop: "4rem", marginBottom: "2rem"}}
                                                    variant="body2"
                                                    gutterBottom>
                                            Product Description:
                                        </Typography>
                                        <Typography style={{marginBottom: "2rem"}} variant="body2"
                                                    color="textSecondary">
                                            {state.description}
                                        </Typography>
                                        <Divider/>

                                    </Grid>
                                    {token && vendor==="false" ? (
                                        <Grid style={{marginBottom: "1rem", marginTop: "1rem", marginLeft: "20rem"}}>
                                        <div>
                                            <ButtonGroup style={{marginLeft: "9rem"}} variant="text"
                                                         aria-label="text primary button group">
                                                <IconButton
                                                    onClick={handlecountplus}>
                                                    <AddIcon/>
                                                </IconButton>
                                                <Button size='small' id="outlined-basic" label="0"
                                                        variant="outlined">
                                                    {countclickamount}
                                                </Button>
                                                <IconButton
                                                    onClick={handlecountminus}>
                                                    <RemoveIcon/>
                                                </IconButton>
                                            </ButtonGroup>
                                            <Button onClick={addtocart} size="large" variant="contained" style={{
                                                marginLeft: "9.1rem",
                                                marginTop: "1rem",
                                                marginBottom: "1rem",
                                                cursor: 'pointer',
                                                background: '#0B3954',
                                                color: 'white'
                                            }}>
                                                ADD TO CART
                                            </Button>
                                            <Snackbar open={open1} autoHideDuration={6000} onClose={snackbarClose}>
                                                <Alert onClose={snackbarClose} severity="success">
                                                    {message}
                                                </Alert>
                                            </Snackbar>
                                            <Snackbar open={open2} autoHideDuration={6000} onClose={snackbarClose}>
                                                <Alert onClose={snackbarClose} severity="error">
                                                    {message}
                                                </Alert>
                                            </Snackbar>
                                        </div>
                                    </Grid>):null}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>


                    {purchased ? (
                        <Paper className={classes.paper}>
                            <Grid>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <div>
                                        <Typography style={{display: 'inline-block', marginRight: '2rem'}}>Please give a
                                            rating</Typography>
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
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                                <Typography style={{display: 'inline-block'}}>Review as anonymous</Typography>
                            </div>
                        </Paper>

                    ) : null}

                    <Paper className={classes.paper}>
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
export default Product;
