import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import {Link} from "react-router-dom";

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
  subtitle: {
    color: "black",
    fontSize:18,
  },
  titleBar: {
    background: "white"
  },
}));


export const SimpleGridList = ({tileData}) => {

  const classes = useStyles();

  return (

      <div className={classes.root}>
        <GridList className={classes.gridList} cols={3} >
          {tileData.map((tile,index) => (
              <GridListTile style={{height:"19rem"}}>
                <Link to={{ pathname: `product/${tile.id}`, id: tile.id}}>
                  <img style={{width:"15rem",height:"15rem"}} src={tile.image_url} alt={tile.name} />
                </Link>
                <GridListTileBar
                    title={tile.name}
                    subtitle={tile.price}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                      subtitle: classes.subtitle,
                    }}
                    actionIcon={
                      <Link to={{ pathname: `product/${tile.id}`, id: tile.id}}>
                        <IconButton
                            aria-label={`info about ${tile.title}`}
                            className={classes.icon}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Link>
                    }
                />
              </GridListTile>
          ))}
        </GridList>
      </div>
  );
}

export default SimpleGridList;

