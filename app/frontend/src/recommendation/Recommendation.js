
import React, {useEffect, useState} from 'react';


import SimpleGridList from "../components/SimpleGridList";
import InputBase from "@material-ui/core/InputBase";
import {serverUrl} from "../common/ServerUrl";


function Recommendation() {

  const [loadPage, setLoadPage] = React.useState(false);

  let [recommendations, setRecommendations] = React.useState("");

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      fetch(serverUrl + 'api/products/recommend/', {
        method: 'GET',
        headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},

      }).then(res => res.json())
        .then(json => {
          console.log(json)
          setRecommendations(json)
          setLoadPage(true);
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div>
      {loadPage ? (
        <div>
          <div style={{marginTop:'2rem',marginBottom:'1rem'}}>
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
                width:"50rem"
              }}
              defaultValue="RECOMMENDED FOR YOU"
              inputProps={{'aria-label': 'bestsellers'}}
              disabled={true}
            />
          </div>
          <div>
            <SimpleGridList tileData={recommendations}/>
          </div>
        </div>) : null}

    </div>


  );
}

export default Recommendation;
