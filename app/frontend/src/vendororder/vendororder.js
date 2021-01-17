import { Box, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { serverUrl } from "../common/ServerUrl";
import { useState, useEffect } from "react";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import Vendororderlist from "./vendororderlist";


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

export default function Vendororder() {
    const [plist, setPlist] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(serverUrl + "api/orders/vendor-orders/", {
            method: 'GET',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},

        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setPlist(data);
            });
        return () => {
            console.log("cleanup");
        };
    }, []);

    const renderOrders = () => {
        return plist.map((e, i) => {
            return (
                <Vendororderlist
                    vendororders={e}
                />
            );
        });
    };

    const classes = useStyles();
    return (
        <div>

            <div>
                <div className="Home">
                    <Navbar/>
                </div>
                <div>
                    <CategoryTab/>
                </div>
                <div style={{marginTop: "1rem"}}>
                    <Breadcrumbs style={{color: "#0B3954"}} separator="›">
                        <Link style={{marginLeft: "3rem", color: "#0B3954"}} to="/">
                            Home Page
                        </Link>
                        <Link style={{color: "#0B3954"}} to="/orders">
                            Orders
                        </Link>
                    </Breadcrumbs>
                </div>
                <React.Fragment>
                    {plist && plist.length > 0 && <Box>{renderOrders()}</Box>}
                </React.Fragment>
            </div>
        </div>
    );
}