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


export const TitlebarGridList= ({tileData}) =>  {
    const classes = useStyles();

    return (
        <div style={{marginTop:'2rem'}} className={classes.root}>
            <GridList cellHeight={400}  className={classes.gridList}>
                <GridListTile  cols={2} style={{ height: 'auto' }}>
                    <ListSubheader style={{ marginBottom:'1rem'}}component="div"><Button>Search Result For : {''}</Button></ListSubheader>
                </GridListTile>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img} cols={tile.cols || 2/3} >
                        <img  style={{width:"21rem",height:"20rem"}} src={tile.image_url} alt={tile.name} />

                        <GridListTileBar  style={{ backgroundColor:'rgb(211,211,211,.7)',width:"22rem",height:"10rem"}}

                                          title={<span style={{fontSize:"1rem", width:"max-component"}}>{tile.name}
                                <Divider/> <br></br></span>}
                            subtitle={<span  style={{color: "black",fontSize:"0.8rem"}}>PRICE: {tile.price}
                                <br></br><br></br>BY: {tile.vendor}
                                <br></br><br></br>
                                <Rating name="size-small" defaultValue={tile.total_rating_score} size="small" /> </span>}


                            actionIcon={
                                <IconButton style={{color: "white"}} aria-label={`info about ${tile.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>

        </div>

    );

}
