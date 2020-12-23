import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: "black"
    },
    titleBar: {
        background: "white"
    },
    subtitle: {
        color: "black",
        fontSize: 18,
    },
    subtitle_disc: {
        color: "red",
        fontSize: 18,
    },
}));


export const SimpleGridList = ({tileData}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
                {tileData.map((tile, index) => {
                    if (tile.discount > 0) {
                        return (
                            <GridListTile style={{height: "19rem"}}>
                                <Link to={{pathname: `product/${tile.id}`, id: tile.id}}>
                                    <img style={{width: "15rem", height: "15rem"}} src={tile.image_url}
                                         alt={tile.name}/>
                                </Link>
                                <GridListTileBar
                                    title={tile.name}
                                    subtitle={"$" + (tile.price * tile.discount / 100).toFixed(2)}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                        subtitle: classes.subtitle_disc,
                                    }}
                                    actionPosition={'left'}
                                    actionIcon={<img style={{width: "2.5rem", height: "2.5rem"}} src="/img/discount.png"
                                                     alt="discount icon"/>}
                                />
                            </GridListTile>)
                    } else {
                        return (
                            <GridListTile style={{height: "19rem"}}>
                                <Link to={{pathname: `product/${tile.id}`, id: tile.id}}>
                                    <img style={{width: "15rem", height: "15rem"}} src={tile.image_url}
                                         alt={tile.name}/>
                                </Link>
                                <GridListTileBar
                                    title={tile.name}
                                    subtitle={"$" + tile.price}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                        subtitle: classes.subtitle,
                                    }}
                                />
                            </GridListTile>)
                    }
                })}
            </GridList>
        </div>
    );
}

export default SimpleGridList;

