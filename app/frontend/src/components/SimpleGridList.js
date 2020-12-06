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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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
  const [id, setid] = React.useState();
    const [title, setTitle] = React.useState("");
    const [selected, setSelected] = React.useState();

    function handleClick(index, title) {
      console.log("title", title);
      setSelected(index);
      setTitle(title);
    }

    function handleIconClick(index, icon) {
      console.log("icon", icon);
      setSelected(index);
      setTitle(icon);
    }
  function handleInputChange() {

  }
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={5} >
        {tileData.map((tile,index) => (

          <GridListTile className={index === selected ? "selected" : ""}
                        key={`${index}${title.title}`} style={{height:"19rem"}}>
            <img style={{width:"15rem",height:"15rem"}} src={tile.img} alt={tile.title}
                 onClick={() => handleClick(index, tile.title)} />
            <GridListTileBar
              title={tile.title}
              subtitle={tile.price}
              classes={{
                root: classes.titleBar,
                title: classes.title,
                subtitle: classes.subtitle,

              }}
              actionIcon={

                <Link params={{id:tile.title}} style={{textDecoration: 'none'}} to="/product">
                <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                    onClick={() => handleIconClick(index, tile.icon)}

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
