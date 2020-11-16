import React from 'react';
import Navbar from "./Navbar";
import CategoryTab from "../components/CategoryTab";
import SimpleGridList from "../components/SimpleGridList";
import InputBase from "@material-ui/core/InputBase";
import {tileData} from '../components/tileData';
import {tileData2} from '../components/tileData2';
import Footer from "../components/Footer";


function Home() {
  return (
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
            fontSize:30,
            fontWeight:"600",
            marginLeft:"3rem",
            marginTop:"2rem",
            marginBottom:"1rem"
          }}
          defaultValue="BESTSELLERS"
          inputProps={{ 'aria-label': 'bestsellers' }}
          disabled={true}
        />
      </div>
      <div>
        <SimpleGridList tileData={tileData}/>
      </div>
      <div>
        <InputBase
          style={{
            color: "black",
            fontSize:30,
            fontWeight:"600",
            marginLeft:"3rem",
            marginTop:"2rem",
            marginBottom:"1rem"
          }}
          defaultValue="NEW ARRIVALS"
          inputProps={{ 'aria-label': 'new-arrivals' }}
          disabled={true}
        />
      </div>
      <div>
        <SimpleGridList tileData={tileData2}/>
      </div>
      <div>
        <Footer/>
      </div>

    </div>

  );
}

export default Home;
