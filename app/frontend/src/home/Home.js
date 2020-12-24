import React, {useState} from 'react';
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
            state.first = state.product_list.slice(1, 7);
            state.second = state.product_list.slice(5);
            setLoadPage(true);
        })
        .catch(err => console.log(err));

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
                    <div>
                        <SimpleGridList tileData={state.first}/>
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
                            defaultValue="NEW ARRIVALS"
                            inputProps={{'aria-label': 'new-arrivals'}}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <SimpleGridList tileData={state.second}/>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                </div>) : null}

        </div>

    );
}

export default Home;
