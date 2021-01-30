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
import AdminCommentList from "./AdminCommentList";
import Checkbox from "@material-ui/core/Checkbox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import CustomizedDialogs from "../components/dialog";
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOutlinedIcon from '@material-ui/icons/AlarmOutlined';
import Input from "@material-ui/core/Input";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";


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
    const { exchangeRates,currencies } = require('exchange-rates-api');
    const example = async () => {
       let amounts= await exchangeRates().latest()
            .base(currencies.USD)
            .symbols([currencies.EUR, currencies.TRY,currencies.KRW,currencies.JPY])
            .fetch();
       setusdtry(amounts.TRY)
       setusdwon(amounts.KRW)
       setusdyen(amounts.JPY)
       setusdeu(amounts.EUR)

    };
    const {id} = props.match.params;
    const classes = useStyles();
    const [loadPage1, setLoadPage1] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [stars, setStars] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchoralarm, setAnchoraelalarm] = React.useState(null);
    let [heartclick, setheartclick] = useState(false);
    let [alarmclick, setalarmclick] = useState(false);
    let [listclick, setlistclick] = useState(false);
    let [messageclick, setmessageclick] = useState(false);
    let [countclickamount, setcount] = useState(1);
    let [purchased, setPurchased] = useState(false);
    const token = localStorage.getItem('token')
    const vendor = localStorage.getItem('is_vendor')
    const [mylists, setMylists] = React.useState([]);
    const [open1, setOpen1] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [message, setMessage] = React.useState("");
    let[stock,setstock]=React.useState();
    let[usdtry,setusdtry]=React.useState();
    let[usdwon,setusdwon]=React.useState();
    let[usdyen,setusdyen]=React.useState();
    let[usdeu,setusdeu]=React.useState();
    let[initialarm,setinitialalarm]=React.useState();
    const [admin, setAdmin] = React.useState(false);

    let [defaultalarmprice, setdefaultalarmprice] = React.useState();


    let [state, setState] = useState({
        name: '',
        price: '',
        imgsrc: '',
        rating: '',
        vendorrating: '',
        temp_comment: '',
        comments: [],
        newlist: "",
        alarmprice:'',
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
                    }),
                fetch(serverUrl + 'api/alarms/my-price-alarms/', {
                    method: 'GET',
                    headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
                }).then(res => res.json())
                    .then(json => {
                        console.log(json)
                        for (let j = 0; j < json.length; j++) {
                            console.log(json[j].product.id.toString())
                            console.log(id.toString())
                             if(json[j].product.id.toString() === id.toString())
                                setalarmclick(true);
                             console.log('cccccc')
                            if(json[j].product.id.toString() === id.toString()){
                                setinitialalarm(json[j].price)
                                setdefaultalarmprice(json[j].price)
                                console.log('ffffffff')}
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
                setstock(json.stock)

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
        }).then(() => {example();})
            .catch((err) => {
            console.log(err);
        })

        fetch(serverUrl + 'api/admin/is_admin/', {
            method: 'GET',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => {
            setAdmin(json.is_it_admin)
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(defaultalarmprice)
        
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
        setOpen3(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchoraelalarm(null)
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

    const handlealarmclick = (event) => {
        setAnchoraelalarm(event.currentTarget)
    };

    const Alarmsetted = () => {
        handleClose();
        if(parseInt(state.alarmprice)) {


            console.log(parseInt(state.alarmprice))
            fetch(serverUrl + 'api/alarms/set-price-alarm/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify({'product_id': id, 'price': parseInt(state.alarmprice)})
            }).then(res => res.json())
                .then(json => {
                    alert("Alarm is successfully setted according to the given value. ")
                    console.log(json)
                    setdefaultalarmprice(parseInt(state.alarmprice))
                }).then(() => setalarmclick(true)).catch((err) => {
                console.log(err);
            }, [])
        }else{
            handleClose();
            alert("Please set alarm as a number. ")
            setdefaultalarmprice(initialarm)
        }
    };
    const Alarmdelete= () => {
       handleClose();

        fetch(serverUrl + 'api/alarms/delete-price-alarm/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'product_id': id})
        }).then(res => res.json())
            .then(json => {
                alert("Alarm is successfully removed.")
                console.log(json)
            }).then(()=>setalarmclick(false)).catch((err) => {
            console.log(err);
        }, [])
    };

    function onChange(event) {
        setdefaultalarmprice(null)
        var mutableState = state
        mutableState[event.target.id] = event.target.value
        setState(mutableState)
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);

    };

    function addtocart() {
        if(!(stock<countclickamount)){
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
        }else{
            setMessage("The amount you want to buy exceeds the stock number.");
                setOpen3(true);
                }
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

    const currencieslist = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'TRY',
            label: '₺',
        },
        {
            value: 'JPY',
            label: '¥',
        },
        {
            value:'KRW',
            label:'₩'
        }
    ];
    let [currency, setCurrency] = React.useState('USD');

    const handleChangecurrency = (event) => {
        setCurrency(event.target.value);

    };

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

                                        <IconButton style={{height:'3rem',width:'3rem',marginRight:'1rem'}} onClick={handlelistcount}>
                                            {listclick ? <TurnedInIcon style={{color: "#7E7F9A"}} fontSize={"large"}/> :
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

                                        <IconButton style={{height:'3rem',width:'3rem',marginRight:'1rem'}} onClick={handleclickheart}>
                                            {heartclick ? <Favorite style={{color: "#7A0010"}} fontSize={"large"}/> : <FavoriteBorderIcon fontSize={"large"}/>}

                                        </IconButton>
                                        <div>
                                        <IconButton aria-describedby={'simple-popover'} style={{height:'3rem',width:'3rem'}} onClick={handlealarmclick}>
                                            {alarmclick ? <AlarmIcon style={{color: "#EB9486",fontWeight: "bold"}} fontSize={"large"}/> : <AlarmOutlinedIcon fontSize={"large"}/>}
                                        </IconButton>

                                        <Popover
                                            id="simple-popover"
                                            anchorEl={anchoralarm}
                                            keepMounted
                                            open={Boolean(anchoralarm)}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem style={{height:'3rem',width:'20rem'}}>
                                                $&nbsp;
                                                <TextField id="alarmprice" value={defaultalarmprice}
                                                       placeholder="Alarm Price" onChange={onChange}/>

                                                {!(alarmclick)? <Button aria-label="add"
                                                                      onClick={Alarmsetted} style={{ marginLeft: "0.5rem",height:'1.8rem',backgroundColor: "#0B3954",color:'white'}}>
                                                    Add
                                                </Button>:<div>
                                                    <Button aria-label="add"
                                                            onClick={Alarmsetted} style={{ marginLeft: "0.5rem",marginRight: "0.5rem",height:'1.8rem',backgroundColor: "#0B3954",color:'white'}}>
                                                       Edit
                                                    </Button>
                                                    <Button aria-label="delete"
                                                    onClick={Alarmdelete} style={{height:'1.8rem',color:'white',
                                                        backgroundColor: "#7A0010", marginRight: "0.5rem"}}>
                                                    Remove
                                                    </Button></div>}

                                            </MenuItem>

                                        </Popover></div>
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
                                            Brand:&nbsp;
                                        </Typography>
                                        <Typography style={{marginBottom: "2rem", display: 'inline-block'}}
                                                    variant="body2"
                                                    color="textSecondary">
                                            {state.brand}
                                        </Typography>
                                        <Divider/>
                                        {state.discount > 0 ? (
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                                <Grid container direction="row" alignItems="center">
                                                    <Grid item>
                                                        <div>
                                                            <Typography style={{
                                                                marginTop: "4rem",
                                                                marginBottom: "2rem",
                                                                display: 'inline-block'
                                                            }} variant="body2"
                                                                        gutterBottom>
                                                                Price:&nbsp;
                                                            </Typography>
                                                            <Typography style={{
                                                                marginTop: "4rem",
                                                                marginBottom: "2rem",
                                                                display: 'inline-block'
                                                            }}
                                                                        variant="body2" color="textSecondary">
                                                                {currency=='USD' ? '$ '+state.price:''}
                                                                {currency=='TRY' ? '₺ '+(state.price*usdtry).toFixed(2):''}
                                                                {currency=='KRW' ? '₩ '+(state.price*usdwon).toFixed(2):''}
                                                                {currency=='JPY' ? '¥ '+(usdyen*state.price).toFixed(2):''}
                                                                {currency=='EUR' ? '€ '+(state.price*usdeu).toFixed(2):''}

                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography style={{
                                                                marginBottom: "2rem",
                                                                display: 'inline-block',
                                                                color: "red"
                                                            }} variant="body2"
                                                                        gutterBottom>
                                                                Discounted Price:&nbsp;
                                                            </Typography>
                                                            <Typography style={{
                                                                marginBottom: "2rem",
                                                                display: 'inline-block',
                                                                color: "red"
                                                            }}
                                                                        variant="body2" color="textSecondary">
                                                                {currency=='USD' ? '$ '+(state.price - state.price * state.discount / 100).toFixed(2):''}
                                                                {currency=='TRY' ? '₺ '+((state.price - state.price * state.discount / 100)*usdtry).toFixed(2):''}
                                                                {currency=='KRW' ? '₩ '+((state.price - state.price * state.discount / 100)*usdwon).toFixed(2):''}
                                                                {currency=='JPY' ? '¥ '+((state.price - state.price * state.discount / 100)*usdyen).toFixed(2):''}
                                                                {currency=='EUR' ? '€ '+((state.price - state.price * state.discount / 100)*usdeu).toFixed(2):''}

                                                            </Typography>
                                                        </div>

                                                    </Grid>
                                                    <Grid item>
                                                        <img style={{width: "4rem", height: "4rem"}}
                                                             src="/img/discount.png" alt="discount icon"/>
                                                    </Grid>
                                                    <TextField
                                                        style={{ width:'7.5rem', marginTop: "2rem",marginLeft:'10rem'}}
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Select Currency"
                                                        value={currency}
                                                        onChange={handleChangecurrency}
                                                        variant="outlined"
                                                    >
                                                        {currencieslist.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>

                                            </div>
                                        ) : (
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                                <Typography style={{
                                                    marginTop: "4rem",
                                                    marginBottom: "2rem",
                                                    display: 'inline-block'
                                                }} variant="body2"
                                                            gutterBottom>
                                                    Price: &nbsp;
                                                </Typography>
                                                <Typography style={{
                                                    marginTop: "4rem",
                                                    marginBottom: "2rem",
                                                    display: 'inline-block'
                                                }}
                                                            variant="body2" color="textSecondary">
                                                    {currency=='USD' ? '$ '+state.price:''}
                                                    {currency=='TRY' ? '₺ '+(state.price*usdtry).toFixed(2):''}
                                                    {currency=='KRW' ? '₩ '+(state.price*usdwon).toFixed(2):''}
                                                    {currency=='JPY' ? '¥ '+(usdyen*state.price).toFixed(2):''}
                                                    {currency=='EUR' ? '€ '+(state.price*usdeu).toFixed(2):''}

                                                </Typography>
                                                <TextField
                                                    style={{ width:'7.5rem', marginTop: "2.5rem",marginLeft:'16rem'}}
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Select Currency"
                                                    value={currency}
                                                    onChange={handleChangecurrency}
                                                    variant="outlined"
                                                >
                                                    {currencieslist.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
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
                                        <Link to={"/vendorview/"+state.vendor.toLowerCase()}>
                                        <Typography style={{marginLeft: "1rem", marginBottom: "2rem", display: 'inline-block'}}
                                                    variant="body2"
                                                    color="textSecondary">
                                            {state.vendor}
                                        </Typography></Link>
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
                                            <Snackbar open={open3} autoHideDuration={6000} onClose={snackbarClose}>
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
                        {!admin ? <CommentList commentList={state.comments}/> : <AdminCommentList commentList={state.comments}/>}
                    </Paper>
                    <div>
                        <Footer/>
                    </div>
                </div>) : null}
        </div>
    );
}
export default Product;
