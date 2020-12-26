import { Box, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { serverUrl } from "../common/ServerUrl";
import { useState, useEffect } from "react";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
  },
}));

export default function Cart() {
  useEffect(() => {
    console.log("effect");
    fetch(serverUrl + "api/cart/get", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data.products_in_cart));
    return () => {
      console.log("cleanup");
    };
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Navbar />
      <CategoryTab />
      <Box>
        <Paper className={classes.paper}>asd</Paper>
      </Box>
    </React.Fragment>
  );
}
