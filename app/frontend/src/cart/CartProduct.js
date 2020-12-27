import {
  Box,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

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
}));

export default function CartProduct(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <img
            style={{ width: "100%" }}
            src={props.product.image_url}
            alt="product image"
          />
        </Grid>
        <Grid item style={{ flexDirection: "column" }} container xs={6}>
          <Typography gutterBottom variant="h4">
            {props.product.name}
          </Typography>
          <Divider variant="middle" />
          <Typography gutterBottom variant="body1">
            {props.product.description}
          </Typography>
        </Grid>
        <Grid item container xs={3}>
          asd
        </Grid>
      </Grid>
    </Paper>
  );
}
