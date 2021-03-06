import {
    Box,
    Button,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Rating } from "@material-ui/lab";
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
        margin: theme.spacing(2),
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        minHeight: 16,
    },
    box: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default function Vendorproductlist(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={4}>
                <Grid justify="center" item container xs={3}>

                    <Link to={{pathname: `product/${props.product.id}`}}>
                        <img
                            style={{ maxHeight: 200, maxWidth:330 }}
                            src={props.product.image_url}
                            alt="product image"
                        />
                    </Link>

                </Grid>
                <Grid
                    item
                    style={{ flexDirection: "column", position: "relative" }}
                    container
                    xs={6}
                >
                    <Typography gutterBottom variant="h4">
                        {props.product.name}
                    </Typography>
                    <Divider variant="middle" />

                    <Typography gutterBottom style={{ margin: 16 }} variant="body1">
                        {props.product.description.length > 250 ? props.product.description.substring(0,250)+' .....':props.product.description }
                    </Typography>
                    <Box
                        style={{
                            position: "absolute",
                            top:180,
                            bottom: 10,
                            left:30,
                            right: 550,

                            display: "flex",
                        }}
                    >

                        <Typography
                            gutterBottom
                            variant="h5"
                            style={{marginRight:5,marginBottom: 40}}
                        >
                            $
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h5"
                            style={{
                                marginBottom: 40,
                                marginRight:5,
                                marginLeft:5,
                                textDecorationLine: "line-through",
                                color: "#A93226",
                            }}
                        >
                            {props.product.price}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h5"
                            style={{ marginRight:15,marginLeft:5,marginBottom: 40, color: "#229954" }}
                        >
                            &nbsp;$&nbsp;
                            {(parseFloat(props.product.price) *(100 - props.product.discount)) /100}
                        </Typography>
                        <Typography gutterBottom variant="h5" style={{ marginBottom: 40}}>
                            {"%" + props.product.discount}
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
                    <Box
                        className={classes.box}
                        component="fieldset"
                        borderColor="transparent"
                        style={{ flexDirection: "column" }}
                    >
                        <Rating style={{marginBottom:'1rem'}} name="read-only" value={props.product.rating} readOnly />

                    </Box>
                    <Box  style={{marginRight:'3rem',marginBottom:'1rem'}} className={classes.box}>
                        {<span>No of Sales: </span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            size="small"

                            variant="outlined"
                        >
                            {props.product.number_of_sales}
                        </Button>

                    </Box>
                    <Box style={{marginRight:'0.7rem'}}
                         className={classes.box}>
                        {<span>Stock: </span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            size="small"

                            variant="outlined"
                        >
                            {props.product.stock}
                        </Button>

                    </Box>

                    <Box className={classes.box}>
                        <Link style={{ textDecoration: 'none' }}  to={{pathname: 'vendorproduct/vendoreditproduct',state: { product: props.product}}}>
                            <Button style={{marginTop:'1rem',marginLeft:'1rem'}}
                                    size="medium"
                                    variant="contained"
                            >
                                {<span>EDIT PRODUCT</span>}

                            </Button>
                        </Link>

                    </Box>

                </Grid>
            </Grid>
        </Paper>
    );
}
