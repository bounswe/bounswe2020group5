import React, {useState} from 'react';
import Navbar from "./Navbar";
import CategoryTab from "../components/CategoryTab";
import SimpleGridList from "../components/SimpleGridList";
import InputBase from "@material-ui/core/InputBase";
import Footer from "../components/Footer";
import {serverUrl} from "../common/ServerUrl";


function Home() {

    const [loadPage, setLoadPage] = React.useState(false);
    const [state, setState] = useState({
        first: [],
        second: [],
        product_list: '',
    });

    fetch(serverUrl + 'api/products', {
        method: 'GET',
    }).then(res => res.json())
        .then(json => {
            state.product_list = json;
            state.first = state.product_list;
            state.second = state.product_list;
            setLoadPage(true);
        })
        .catch(err => console.log(err));

    return (
        <div>
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
                                fontWeight: "600",
                                marginLeft: "3rem",
                                marginTop: "2rem",
                                marginBottom: "1rem"
                            }}
                            defaultValue="BESTSELLERS"
                            inputProps={{'aria-label': 'bestsellers'}}
                            disabled={true}
                        />
                    </div>
                    {loadPage ? (

                            <div>
                        <SimpleGridList tileData={state.first}/>
                    </div>) : null}
                    <div>
                        <InputBase
                            style={{
                                color: "black",
                                fontSize: 30,
                                fontWeight: "600",
                                marginLeft: "3rem",
                                marginTop: "2rem",
                                marginBottom: "1rem"
                            }}
                            defaultValue="NEW ARRIVALS"
                            inputProps={{'aria-label': 'new-arrivals'}}
                            disabled={true}
                        />
                    </div>
                    {loadPage ? (
                        <div>
                        <SimpleGridList tileData={state.second}/>
                    </div>) : null}
                    <div>
                        <Footer/>
                    </div>
                </div>

        </div>

    );
}

export default Home;
