import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import React, {useState} from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import {serverUrl} from "../common/ServerUrl";
import Statusupdate from "../components/vendorstatusupdate";



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
    papertop: {

        flexDirection: "row",
        minWidth: 20,
        display:'flex'

    },
    box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    iconbutton: {
        marginRight:"1rem",
        width: "auto",
        color:  "#0B3954",
        fontSize: "large",
        "&:hover": {
            backgroundColor: "white",
        },
    }
}));


export default function Vendororderlist(props) {
    const classes = useStyles();
    const token = localStorage.getItem('token')

    const HandleCancel = (purchaseid, event) => {
        fetch(serverUrl + 'api/orders/vendor-cancel/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify({'purchase_id': parseInt(purchaseid) }),
        }).then(res => res.json())
            .then(json => {
                if(json.success){
                    alert("Order has been cancelled by vendor")
                    window.location.reload()
                } else alert("Cancel failed")
            })
    };

    const Cancelorupdateinfo=(id,status)=>{
        if(status=='Vcancelled'){
            return <Paper style={{backgroundColor: 'white', color: '#7A0010', fontWeight: 'bold'}}
                          className={classes.paperinner}>
                ORDER CANCELLED BY VENDOR
            </Paper>
        }else if(status=='Ccancelled'){
            return <Paper style={{backgroundColor: 'white', color: '#7A0010', fontWeight: 'bold'}}
                          className={classes.paperinner}>
                ORDER CANCELLED BY CUSTOMER
            </Paper>
        }else {
            return <Statusupdate orderid={id} priorstatus={status}/>
        }
    };

    return (
        <Paper className={classes.paper}>
            <Grid>
                <Grid  className={classes.papertop}>
                    <div>
                    <Paper className={classes.paperinner} style={{width:"16rem",backgroundColor: 'rgba(11, 57, 84,0.15)'}} >
                        Order No: {props.vendororders.order}&nbsp;&nbsp;&nbsp;Purchase No: {props.vendororders.id}
                    </Paper>
                    </div>
                    {!(props.vendororders.status=='Vcancelled'||props.vendororders.status=='Ccancelled'||
                        props.vendororders.status=='Ship'||props.vendororders.status=='Delivered')?
                        <IconButton style={{marginRight:"15rem"}}className={classes.iconbutton}
                        onClick={(event) => HandleCancel(props.vendororders.id, event)}>
                        <CancelIcon style={{marginRight:"0.5rem"}}/> Cancel Order
                    </IconButton>:<span style={{marginRight:"25rem"}}></span>}
                    <div>
                        <React.Fragment>
                            { <Box>{Cancelorupdateinfo(props.vendororders.id,props.vendororders.status)}</Box>}
                        </React.Fragment>

                    </div>



                </Grid>
                        <Paper className={classes.paperinner}>
                            <Grid container spacing={4}>
                                <Grid justify="center" item container xs={3}>
                                    <img
                                        style={{maxHeight: 200, maxWidth: 330}}
                                        src={props.vendororders.product.image_url}
                                        alt="product image"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    style={{flexDirection: "column", position: "relative"}}
                                    container
                                    xs={6}
                                >
                                    <Typography gutterBottom variant="h4">
                                        {props.vendororders.product.name}
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
                                            variant="h5"
                                            style={{marginRight: 15, marginBottom: 40, color: "#229954"}}
                                        >
                                            &nbsp;$&nbsp;
                                            {(parseFloat(props.vendororders.product.price) * (100 - props.vendororders.product.discount)) / 100}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            style={{marginRight: 5, marginBottom: 40}}
                                        >
                                            &nbsp;AMOUNT&nbsp;:&nbsp;{props.vendororders.amount}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                    xs={3}
                                >

                                    <Box style={{marginRight: '0.7rem'}}
                                         className={classes.box}>
                                        {<span>Order Status: </span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button
                                            size="small"
                                            variant="outlined"
                                        >
                                            {props.vendororders.status}
                                        </Button>
                                    </Box>

                                </Grid>
                            </Grid></Paper>

            </Grid>
        </Paper>
    );
}
