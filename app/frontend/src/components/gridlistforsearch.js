import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import Rating from '@material-ui/lab/Rating';


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
            <GridList cellHeight={350}  className={classes.gridList}>
                <GridListTile  cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Search Result For{''}</ListSubheader>
                </GridListTile>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img} cols={tile.cols || 2/3} >
                        <img  style={{width:"22rem",height:"20rem"}} src={tile.img} alt={tile.title} />

                        <GridListTileBar

                            title={<span style={{fontSize:"1rem", width:"max-component"}}>{tile.title}&nbsp;&nbsp;&nbsp;
                                </span>}
                            subtitle={<span  style={{color: "black",fontSize:"0.8rem"}}>Price: {tile.price}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By: {tile.author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Rating name="size-small" defaultValue={tile.star} size="small" /> </span>}


                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
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
