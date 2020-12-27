
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Rating from '@material-ui/lab/Rating';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";


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
        width: 1110,
        height: "max-content",
    },

    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


export const TitlebarGridList= ({tileData, categoryPage}) =>  {
    const classes = useStyles();


    return (
        <div style={{marginTop:'2rem'}} className={classes.root}>
            <GridList cellHeight={400}  className={classes.gridList}>
                {!categoryPage && localStorage.getItem('searchkey')!=='undefined'? (
                  <GridListTile  cols={2} style={{ height: 'auto' }}>
                      <h3 style={{ marginBottom:'1rem'}}>Search Result For :
                          &nbsp; {localStorage.getItem('searchkey')}</h3>
                  </GridListTile>
                ) : null}
                {tileData.length===0 ? (
                  <GridListTile  cols={2} style={{ height: '55rem' }}>
                      <h3 style={{ marginBottom:'1rem',alignText:"center"}}>There are no available products. </h3>
                  </GridListTile>
                ):(
                  tileData.map((tile) => (

                      <GridListTile key={tile.img} cols={tile.cols || 2/3} >
                          {categoryPage ? (
                            <Link to={"/product/"+tile.id}>
                                <img  style={{width:"21rem",height:"20rem"}} src={tile.image_url} alt={tile.name} /></Link>
                          ): (
                            <Link to={{pathname: `product/${tile.id}`}}>
                                <img  style={{width:"21rem",height:"20rem"}} src={tile.image_url} alt={tile.name} /></Link>
                          )}
                                title={<span style={{color:'black',fontSize:"1.2rem", width:"max-component"}}>{tile.name.toUpperCase()}
                                <Divider/> <br></br></span>}
                            subtitle={<span  style={{color: "black",fontSize:"0.8rem"}}>PRICE: {tile.price}
                                <br></br><br></br>BY: {tile.vendor}
                                <br></br><br></br>
                                <Rating name="size-small" value={tile.total_rating_score}   readOnly size="small" /> </span>}

                        />
                    </GridListTile>
                )))}

            </GridList>

        </div>

    );

}
