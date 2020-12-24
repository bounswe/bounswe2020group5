import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,

  },
  gridList: {
    padding:'0.1rem',
    width: 1300,
    height: "max-content",
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    '&::-webkit-scrollbar': {
      width: '0.2em'
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.8)',
      'border-radius': '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.8)',
      'border-radius': '10px',
    }
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
    let[hover,sethover]=React.useState(false)

    function handleover(index) {
      setSelected(index);
      sethover(true)
    }
  function handleleave(index) {
    setSelected();


  }

    function handleIconClick(index, icon) {
      console.log("icon", icon);
      setSelected(index);
      setTitle(icon);
    }
  function handleInputChange() {

  }
  return (
    <Paper className={classes.root} >

      <GridList className={classes.gridList}  cols={3} >
        {tileData.map((tile,index) => (

          <GridListTile style={{height:"23rem"}}>
            <img onMouseOver={()=>handleover(index)} onMouseLeave={()=>handleleave(index)}style={selected==index?{marginLeft:'4rem',width:"19.5rem",height:"19.5rem"}:
                {marginLeft:'4rem',width:"17.5rem",height:"17.5rem"}}
                 src={tile.image_url} alt={tile.name}
              />
            <GridListTileBar   onMouseOver={()=>handleover(index)} onMouseLeave={()=>handleleave(index)}style={selected==index?{ backgroundColor:'rgb(255,69,0,.3)',height:'6rem',marginLeft:'1rem'}:
                { backgroundColor:'rgb(211,211,211,.7)',height:'6rem',marginLeft:'1rem'}}
              title={tile.name.toUpperCase()}
              subtitle={<span><br></br>{tile.price}</span>}
              classes={{
                root: classes.titleBar,
                title: classes.title,
                subtitle: classes.subtitle,

              }}
              actionIcon={
                <Link onClick={() => localStorage.setItem("id",JSON.stringify(tile.id))}
                      style={{textDecoration: 'none'}} to="/product">
                <IconButton  style={{color: 'white'}}
                    aria-label={`info about ${tile.name}`}
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
    </Paper>
  );
}

export default SimpleGridList;
