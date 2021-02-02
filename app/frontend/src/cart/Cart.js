import { Box, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { serverUrl } from "../common/ServerUrl";
import { useState, useEffect } from "react";
import CartProduct from "./CartProduct";

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
  const [plist, setPlist] = useState([]);
  useEffect(() => {
    fetch(serverUrl + "api/cart/get/", {
      headers: {
        'Authorization': `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlist(data.products_in_cart);
      });
    return () => {
      console.log("cleanup");
    };
  }, []);

  const renderProducts = () => {
    return plist.map((e, i) => {
      return (
        <CartProduct
          key={e.product.id}
          product={e.product}
          cnt={e.count}
        />
      );
    });
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      {plist && plist.length > 0 && <Box>{renderProducts()}</Box>}
    </React.Fragment>
  );
}
