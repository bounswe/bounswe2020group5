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
import React, { useState } from "react";

import {Link} from "react-router-dom";



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
}));



export default function Orderlist(props) {
    const classes = useStyles();







    return (
        <Paper className={classes.paper}>
            <Grid>
                <Paper style={{backgroundColor:'rgba(11, 57, 84,0.15)'}} className={classes.paperinner}>

                    Order
                </Paper>
            {props.orders.purchases.map((e,index) => {
                return(
                    <Paper className={classes.paperinner}>

                <Grid container spacing={4}>
                <Grid justify="center" item container xs={3}>



                        <img
                            style={{maxHeight: 200, maxWidth: 330}}
                            src={e.product.image_url}
                            alt="product image"
                        />



                </Grid>
                <Grid
                    item
                    style={{ flexDirection: "column", position: "relative" }}
                    container
                    xs={6}
                >
                    <Typography gutterBottom variant="h4">
                        {e.product.name}
                    </Typography>
                    <Divider variant="middle" />

                    <Box
                        style={{
                            position: "absolute",
                            top:100,
                            bottom: 10,
                            left:30,
                            right: 550,
                            display: "flex",

                        }}
                    >

                        <Typography
                            gutterBottom
                            variant="h5"
                            style={{ marginRight:15,marginBottom: 40, color: "#229954" }}
                        >
                            &nbsp;$&nbsp;
                            {(parseFloat(e.product.price) *(100 - e.product.discount)) /100}
                        </Typography>

                        <Typography
                            gutterBottom
                            variant="h5"
                            style={{marginRight:5,marginBottom: 40}}
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
                    xs={3}
                >

                    <Box style={{marginRight:'0.7rem'}}
                         className={classes.box}>
                        {<span>Order Status: </span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            size="small"

                            variant="outlined"
                        >
                            {JSON.parse(JSON.stringify(e.status))}
                        </Button>

                    </Box>


                </Grid>
            </Grid></Paper>);})}
            </Grid>
        </Paper>
    );
}
