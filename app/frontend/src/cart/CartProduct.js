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
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { postDataToken2 } from "../common/Requests";
import { serverUrl } from "../common/ServerUrl";

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
  let [countclickamount, setcount] = useState(props.cnt);

  const handlecountplus = () => {
    if (countclickamount < 10) {
      countclickamount = countclickamount + 1;
    }

    setcount(countclickamount);
  };

  const handlecountminus = () => {
    if (countclickamount > 0) {
      countclickamount = countclickamount - 1;
      setcount(countclickamount);
      const data = {
        product_id: props.product.id,
        count: countclickamount,
      };
      postDataToken2(serverUrl + "api/cart/edit/", data);
    }
  };

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
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          xs={3}
        >
          <Grid item xs={4} />
          <Grid item xs={4} alignItems="center" justify="center">
            <ButtonGroup
              style={{}}
              variant="text"
              color="#FFFFFF"
              aria-label="text primary button group"
            >
              <IconButton onClick={handlecountplus}>
                <AddIcon />
              </IconButton>
              <Button
                size="small"
                id="outlined-basic"
                label="0"
                variant="outlined"
              >
                {countclickamount}
              </Button>
              <IconButton onClick={handlecountminus}>
                <RemoveIcon />
              </IconButton>
            </ButtonGroup>
          </Grid>
          <Grid xs={4} alignItems="center" justify="center">
            <Typography variant="h5"> {props.product.rating}</Typography>{" "}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
