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
            {props.product.description}
          </Typography>
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              display: "flex",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              style={{ margin: 8, marginRight: 0 }}
            >
              List: $
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              style={{
                margin: 8,
                textDecorationLine: "line-through",
                marginLeft: 0,
              }}
            >
              {props.product.price}
            </Typography>
            <Typography gutterBottom variant="h5" style={{ margin: 8 }}>
              {(parseFloat(props.product.price) *
                (100 - props.product.discount)) /
                100}
            </Typography>
            <Typography gutterBottom variant="h5" style={{ margin: 8 }}>
              {"%" + props.product.discount}
            </Typography>
          </Box>
        </Grid>
        <Grid item container xs={3}>
          asd
        </Grid>
      </Grid>
    </Paper>
  );
}
