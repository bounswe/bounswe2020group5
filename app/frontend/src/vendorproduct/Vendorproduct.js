import {Box, makeStyles, Paper} from "@material-ui/core";
import React from "react";
import {serverUrl} from "../common/ServerUrl";
import {useState, useEffect} from "react";
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import Vendorproductlist from "./Vendorproductlist";
import ProductTypes from "./VendorProductTypes";

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

export default function Vendorproduct() {
    const [plist, setPlist] = useState([]);
    const [typelist, setTypelist] = useState([]);

    useEffect(() => {
        console.log("effect");
        console.log(plist);
        console.log(localStorage.getItem("token"))
        fetch(serverUrl + "api/products/vendor-products/", {
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPlist(data);
                console.log(data);
                gatherTypes(data);
            });
        return () => {
            console.log("cleanup");
        };
    }, []);

    const gatherTypes = (plist) => {
        let alltypes = [];
        Object.keys(plist).forEach(function (key) {
            if (alltypes.indexOf(plist[key].subcategory) < 0) {
                alltypes.push(plist[key].subcategory)
            }
        });
        setTypelist(alltypes);
    }

    const renderProducts = () => {
        console.log(plist);
        return plist.map((e, i) => {
            return (
                <Vendorproductlist
                    product={e}
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
                        <Link style={{color: "#0B3954"}} to="/profile">
                            My Products
                        </Link>
                    </Breadcrumbs>
                </div>
                <ProductTypes typeslist={typelist}/>
                <React.Fragment>
                    {plist && plist.length > 0 && <Box>{renderProducts()}</Box>}
                </React.Fragment>
            </div>
        </div>
    );
}