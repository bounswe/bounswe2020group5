import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import CategoryTab from "../components/CategoryTab";
import SimpleGridList from "../components/SimpleGridList";
import InputBase from "@material-ui/core/InputBase";
import {tileData} from '../components/tileData';
import {tileData2} from '../components/tileData2';
import Footer from "../components/Footer";
import {serverUrl} from "../common/ServerUrl";


function Home() {

    const [loadPage, setLoadPage] = React.useState(false);
    let [bestsellers, setbestsellers] = React.useState("");
    let [newarrivals, setnewarrivals] = React.useState("");

    useEffect(() => {

        let homepagearrays;


        homepagearrays = {
            "number_of_products": 5,
        }
        fetch(serverUrl + 'api/products/homepage/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(homepagearrays),

        }).then(res => res.json())
        .then(json => {
            setbestsellers( json.best_sellers);
            setnewarrivals(json.newest_arrivals);
            setLoadPage(true);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            {loadPage ? (

                <div>
                    <div className="Home">
                        <Navbar/>
                    </div>
                    <div>
                        <CategoryTab/>
                    </div>
                    <div>
                        <InputBase
                            style={{
                                color: "black",
                                fontSize: 30,
                                fontWeight: "bold",
                                marginLeft: "3rem",
                                marginTop: "2rem",
                                marginBottom: "1rem",
                                fontStyle: "italic",
                                textDecorationsStyles: "dashed",
                            }}
                            defaultValue="BESTSELLERS"
                            inputProps={{'aria-label': 'bestsellers'}}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <SimpleGridList tileData={bestsellers}/>
                    </div>
                    <div>
                        <InputBase
                            style={{
                                color: "black",
                                fontSize: 30,
                                fontWeight: "bold",
                                marginLeft: "3rem",
                                marginTop: "2rem",
                                marginBottom: "1rem",
                                fontStyle: "italic",

                            }}
                            defaultValue="NEW ARRIVALS"
                            inputProps={{'aria-label': 'new-arrivals'}}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <SimpleGridList tileData={newarrivals}/>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                </div>) : null}

        </div>

    );
}

export default Home;
