import {
    Box,
    Button,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import {serverUrl} from "../common/ServerUrl";
import {Link} from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(20),
        alignItems: "center",
        flexDirection: "column",
        minHeight: 16,

    },
    paperinner: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        alignItems: "center",
        flexDirection: "column",
        minHeight: 16,

    },
    box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        margin: "1rem",
        backgroundColor: "#7a0010",
        color: "white",
        fontSize: "large",
        "&:hover": {
            backgroundColor: "#cd0310",
        },
    }
}));


export default function Orderlist(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token')
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [total, setTotal] = React.useState(0);
    const [canCancel, setCanCancel] = React.useState(false);
    const [dialogOpen, setDialog] = React.useState(false);
    const [openreturn, setOpenreturn] = React.useState(false);
    let stars = [];


    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const handleClickOpenretuen = () => {
        setOpenreturn(true);
    };

    const handleCloseretuen = () => {
        setOpenreturn(false);
    };

    useEffect(() => {
        let temp = 0;
        props.orders.purchases.map((e, index) => {
            temp += e.unit_price * e.amount;
            if (e.status === "OrderTaken" || e.status === "Preparing") {
                setCanCancel(true);
            }
            stars.push(0.0);
        });
        setTotal(temp.toFixed(2));

    }, []);

    const snackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
        setOpen2(false);
    };

    const HandleCancel = (order, event) => {
        setDialog(false);

        fetch(serverUrl + 'api/orders/customer-cancel/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'order_id': parseInt(order.order_id)}),
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    alert("Your order has been cancelled")
                    window.location.reload()
                } else alert("Cancel failed")
            })
    };
    const HandleShip = (purchase) =>{
        setDialog(false);
        let[date,setdate]=React.useState()
        let[cargonum,setcargonum]=React.useState()
        let[cargo,setcargo]=React.useState()
        fetch(serverUrl + 'api/orders/get-shipment/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'purchase_id': parseInt(purchase.purchase)}),
        }).then(res => res.json())
            .then(json => {
                setdate(json.date.split("T")[0].split("-")[2]+"-"+json.date.split("T")[0].split("-")[1]+"-"+json.date.split("T")[0].split("-")[0]+" "+
                    (parseInt(json.date.split("T")[1].split("Z")[0].split(":")[0])+3)+":"+json.date.split("T")[1].split("Z")[0].split(":")[1]);
                setcargonum(json.cargo_no);
                setcargo(json.cargo_company);
            })

        return (
            <Typography style={{fontWeight:'bold',color:"black",marginTop:'1rem'}}>
                <span>{'Shipment Date: '+date}</span><br></br>
                <span>{'Track Number: '+cargonum}</span><br></br>
                <span>{'Company: '+cargo}</span>
            </Typography>
        );
    }
    const HandleDeliver = (purchase) =>{

        let[date,setdate]=React.useState()
        let[cargonum,setcargonum]=React.useState()
        let[cargo,setcargo]=React.useState()
        fetch(serverUrl + 'api/orders/get-shipment/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'purchase_id': parseInt(purchase.purchase)}),
        }).then(res => res.json())
            .then(json => {
                setdate(json.date.split("T")[0].split("-")[2]+"-"+json.date.split("T")[0].split("-")[1]+"-"+json.date.split("T")[0].split("-")[0]+" "+
                    (parseInt(json.date.split("T")[1].split("Z")[0].split(":")[0])+3)+":"+json.date.split("T")[1].split("Z")[0].split(":")[1]);
                setcargonum(json.cargo_no);
                setcargo(json.cargo_company);
            })

        return (
            <Typography style={{fontWeight:'bold',color:"black",marginTop:'1rem'}}>
                {'You can return your purchase with '+cargonum+' code from '+cargo+" courier center."}
            </Typography>
        );
    }


    const rateVendor = (pid, index, newValue) => {
        if (newValue){ //sending same value results in request error
            stars[index] = newValue;
            fetch(serverUrl + 'api/orders/add-vendor-rating/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify({'purchase_id': pid, 'rating_score': newValue}),
            }).then(res => res.json())
                .then(json => {
                    if (json.success) {
                        setMessage(json.success);
                        setOpen1(true);
                    } else {
                        setMessage("Vendor rating failed.");
                        setOpen2(true);
                    }
                })
        };
    };


    const Cancelinfo = () => {
        if (props.orders.purchases[0].status === 'Vcancelled') {
            return <Paper style={{backgroundColor: 'white', color: '#7A0010', fontWeight: 'bold'}}
                          className={classes.paperinner}>
                ORDER CANCELLED BY VENDOR
            </Paper>
        } else if (props.orders.purchases[0].status === 'Ccancelled') {
            return <Paper style={{backgroundColor: 'white', color: '#7A0010', fontWeight: 'bold'}}
                          className={classes.paperinner}>
                ORDER CANCELLED BY CUSTOMER
            </Paper>
        }
    };

    return (
        <Paper className={classes.paper}>
            <Grid>
                <Grid container>
                    <Paper style={{backgroundColor: '#0B3954', color: 'white', fontWeight: 'bold'}}
                           className={classes.paperinner}>
                        Order {props.orders.order_id}
                    </Paper>
                    {canCancel ?
                        <div>
                            <Button startIcon={<CancelIcon style={{margin: "0.5rem"}}/>} style={{fontWeight: "bold"}}
                                    className={classes.button} onClick={handleClickOpen}>
                                Cancel Order
                            </Button>
                            <Dialog
                                open={dialogOpen}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Continue to cancel order?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        When you cancel an order, all of the products that haven't shipped yet will be
                                        cancelled. If you want to cancel a purchase that is already shipped or delivered, you should follow the return procedure.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Discard
                                    </Button>
                                    <Button onClick={(event) => HandleCancel(props.orders, event)} color="primary"
                                            autoFocus>
                                        Continue
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                        : <React.Fragment>
                            {Cancelinfo()}
                        </React.Fragment>}

                </Grid>
                {props.orders.purchases.map((e, index) => {
                    return (
                        <Paper className={classes.paperinner}>
                            <Grid container spacing={4}>
                                <Grid justify="center" item container xs={2}>
                                    <Link to={{pathname: `/product/${e.product.id}`}}
                                          style={{textDecoration: "none", color: "black"}}>
                                        <img
                                            style={{height: 200, width: 200}}
                                            src={e.product.image_url}
                                            alt="product image"
                                        />
                                    </Link>
                                </Grid>
                                <Grid
                                    item
                                    style={{flexDirection: "column", position: "relative"}}
                                    container
                                    xs={6}
                                >
                                    <Typography gutterBottom variant="h5">
                                        {e.product.name}
                                    </Typography>
                                    <Divider variant="middle"/>
                                    <Box
                                        style={{
                                            position: "absolute",
                                            top: 100,
                                            bottom: 10,
                                            left: 30,
                                            right: 550,
                                            display: "flex",

                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            style={{marginRight: 15, marginBottom: 40, color: "#229954"}}
                                        >
                                            &nbsp;$&nbsp;
                                            {(e.unit_price).toFixed(2)}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            style={{marginRight: 5, marginBottom: 40}}
                                        >
                                            &nbsp;AMOUNT&nbsp;:&nbsp;{e.amount}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                    xs={4}
                                >
                                    {!(e.status === "Delivered" )?
                                    <Box style={{marginRight: '0.7rem'}}
                                         className={classes.box}>
                                        {<span>Order Status: </span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button
                                            size="small"
                                            disabled
                                            variant="outlined"
                                            style={{
                                                backgroundColor: "white",
                                                color: "black",
                                            }}
                                        >
                                            {JSON.parse(JSON.stringify(e.status))}
                                        </Button>
                                    </Box>:
                                    <div style={{flexDirection:'row',display:'flex'}}>

                                        <Box style={{marginRight: '0.7rem'}}
                                             className={classes.box}>
                                            {<span>Order Status: </span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button
                                                size="small"
                                                disabled
                                                variant="outlined"
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                }}
                                            >
                                                {JSON.parse(JSON.stringify(e.status))}
                                            </Button>
                                        </Box>
                                        <Button
                                            size="small"
                                            onClick={handleClickOpenretuen}
                                            variant="outlined"
                                            style={{
                                                backgroundColor:'#7E7F9A',
                                                color: "white",
                                            }}
                                        >
                                            RETURN
                                        </Button>
                                        <Dialog
                                            open={openreturn}
                                            onClose={handleCloseretuen}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Return Procedure"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    <HandleDeliver purchase={e.id} />
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseretuen} color="primary">
                                                    OK
                                                </Button>

                                            </DialogActions>
                                        </Dialog>
                                    </div>}
                                    {e.status === "Delivered" ? (
                                        <Paper variant="outlined" style={{borderColor: "#7A0010"}}
                                               className={classes.paperinner}>
                                            <div style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                                                <Typography>Please give a rating to <Typography
                                                    style={{fontWeight: 'bold'}}> {e.product.vendor}</Typography></Typography>
                                                <Rating
                                                    style={{marginTop: "0.5rem"}}
                                                    id="temp_rating"
                                                    name= "vendor_rating"
                                                    value={stars[index]}
                                                    max={10}
                                                    onChange={(event, newValue) => {
                                                        rateVendor(e.id, index, newValue);
                                                    }}
                                                />
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
                                        </Paper>
                                    ) : null}
                                    {e.status === "Ship" ? (
                                        <Paper variant="outlined" style={{borderColor: "#7A0010"}}
                                               className={classes.paperinner}>
                                            <div style={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                                                <Typography style={{color:'red'}}>Ship Information </Typography>
                                                <HandleShip purchase={e.id} />
                                            </div>
                                        </Paper>
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                })}

                <Grid container justify="flex-end" style={{marginRight: "5rem"}}>
                    <Paper style={{backgroundColor: 'white', color: '#0B3954', fontWeight: 'bold', fontSize: 20}}
                           className={classes.paperinner}>
                        Total cost: ${total}
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
}
