
import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Rating from '@material-ui/lab/Rating';
import Divider from "@material-ui/core/Divider";
import {Link} from "react-router-dom";
import {serverUrl} from "../common/ServerUrl";
import Paper from "@material-ui/core/Paper";
import {IconButton} from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Tooltip from "@material-ui/core/Tooltip";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflowY:'visible',
        overflowX:'visible',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1200,
        height: "max-content",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    tile: {
        marginBottom: "1rem",
    },
    paper: {

        height:'4rem',
        width:'35rem'


    },
}));


export const TitlebarGridList= ({tileData, categoryPage}) =>  {

    const classes = useStyles();
    let[vendorgobutton,setvendorgobutton]=React.useState(false);

    useEffect(() => {
        const searchkey = localStorage.getItem('searchkey')
        let data;
        data={vendor_username:localStorage.getItem('searchkey')}

            fetch(serverUrl + 'api/users/vendor/details', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(json => {

                    {

                        if(!(json.error==false)){
                            console.log('llllll')
                            console.log(json.error)
                            setvendorgobutton(true)

                       }
                    }

                }).catch(err => setvendorgobutton(false));

            console.log(vendorgobutton)
        console.log('hhhhhhhhh')


    }, []);


    return (
        <div style={{marginTop:'2rem'}} className={classes.root}>
            <GridList cellHeight={400}  className={classes.gridList}>
                {!categoryPage && localStorage.getItem('searchkey')!=='undefined'? (

                    <GridListTile className={classes.tile} cols={2} style={{ height: 'auto' }}>
                       <div style={{display:'flex',flexDirection:'row'}}> <Paper style={{ marginBottom:'1rem'}}className={classes.paper}><h3 style={{ marginBottom:'1rem'}}>SEARCH RESULT FOR :
                           &nbsp; {localStorage.getItem('searchkey').toUpperCase()}</h3></Paper>
                               {vendorgobutton?
                               <Tooltip  placement="top-start" title="Go to Public View Vendor Page">
                               <Link to={"/vendorview/"+localStorage.getItem('searchkey').toLowerCase()}>
                               <IconButton style={{marginTop:'0.25rem',marginLeft:'2rem',height:'3.5rem',width:'3.5rem',backgroundColor:'#7E7F9A',color: '#F3DE8A' }} aria-label="arrow">
                               <ArrowForwardOutlinedIcon fontSize="large" />
                               </IconButton></Link></Tooltip>:''}
                  </div>

                    </GridListTile>

                ) : null}
                {tileData.length===0 ? (
                    <GridListTile className={classes.tile} cols={2} style={{ height: '55rem' }}>
                        <h3 style={{ marginBottom:'1rem',alignText:"center"}}>There are no available products. </h3>
                    </GridListTile>
                ):(
                    tileData.map((tile) => (

                        <GridListTile className={classes.tile} key={tile.img} cols={tile.cols || 2/3} >
                            {categoryPage ? (
                                <Link to={"/product/"+tile.id}>
                                <img  style={{width:"21rem",height:"20rem"}} src={tile.image_url} alt={tile.name} /></Link>
                          ): (
                            <Link to={{pathname: `product/${tile.id}`}}>
                                <img  style={{width:"21rem",height:"20rem"}} src={tile.image_url} alt={tile.name} /></Link>
                          )}

                            {tile.discount >0 ? (
                                <GridListTileBar  style={{ backgroundColor:'rgb(211,211,211,.7)',width:"22rem",height:"10rem"}}
                                                  title={<span style={{color:'black',fontSize:"1.2rem", width:"max-component"}}>{tile.name.substr(0, 20).toUpperCase()}{tile.name.length>20? "...":''}
                                                      <span style={{color: "red",fontSize:"1.2rem"}} > &nbsp; &nbsp; %{tile.discount} </span> <Divider/>  <br></br> </span>}
                                                  subtitle={<span  style={{color: "black",fontSize:"0.9rem"}}>PRICE: ${tile.price} <span style={{color: "red",fontSize:"0.9rem"}} > &nbsp; ---> &nbsp;  ${(tile.price - tile.price * tile.discount / 100).toFixed(2)} </span>
                                                      <br></br><br></br>BY: {tile.vendor}
                                                      <br></br><br></br>
                                <Rating name="size-small" value={tile.rating} precision={0.1}  readOnly size="small" /> </span>}
                                />
                                ): (
                                <GridListTileBar  style={{ backgroundColor:'rgb(211,211,211,.7)',width:"22rem",height:"10rem"}}
                                title={<span style={{color:'black',fontSize:"1.2rem", width:"max-component"}}>{tile.name.substr(0, 28).toUpperCase() }{tile.name.length>28? "...":''} <Divider/>  <br></br> </span>}
                                subtitle={<span  style={{color: "black",fontSize:"0.8rem"}}>PRICE: ${tile.price}
                                <br></br><br></br>BY: {tile.vendor}
                                <br></br><br></br>

                                <Rating name="size-small" value={tile.rating} precision={0.1}  readOnly size="small" /> </span>}
                                />
                                )}

                    </GridListTile>
                )))}

            </GridList>

        </div>

    );

}
