import React , {Component,useEffect, useState}from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import InputBase from "@material-ui/core/InputBase";
import SimpleGridList from "../components/SimpleGridList";
import {tileData} from "../components/tileData";
import {tileData2} from "../components/tileData2";
import Footer from "../components/Footer";
import Button from "@material-ui/core/Button";
import image1 from "../img/10685527785522.jpg";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import BlockIcon from "@material-ui/icons/BlockOutlined";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Favorite} from "@material-ui/icons";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginLeft:250,
        marginTop:20,
        marginBottom:20,
        maxWidth: 1000,
        maxHeight: 1500,

    },
    image: {
        width: 460,
        height: 480,
    },
    img: {
        marginTop:50,
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));
const styles = {

    largeIcon: {
        width: 60,
        height: 60,
    },

};

export default function ComplexGrid() {
    const classes = useStyles();

    let [clicked, setClicked] = useState(false);
    let [countclick, setcount] = useState(0);

    const handlecountplus = () => {
        if(countclick<10) {
            countclick = countclick + 1;
        }
       setcount(countclick);
    };

    const handlecountminus = () => {
        if(countclick>0) {
            countclick = countclick - 1;
        }
        setcount(countclick);
    };

    const handleclickheart = () => {
        if(clicked){
            setClicked(false);
        }else{
            setClicked(true);
        }
    };
    return (

        <div className={classes.root}>
            <div>
                <div className="Home">
                    <Navbar/>
                </div>
                <div>
                    <CategoryTab/>
                </div>
            </div>

            <Paper justifyContent={'center'} className={classes.paper}>
                <Grid container >
                    <Grid >
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={image1}/>
                        </ButtonBase>

                    </Grid>
                    <Grid sm container>
                        <Grid >
                            <Grid >
                                <Typography gutterBottom variant="subtitle1">

                                    {localStorage.getItem('id')}
                                </Typography>
                                <Divider/>
                                <Typography style={{ marginTop: "5rem"}} variant="body2" gutterBottom>
                                    $19.00
                                </Typography>
                                <Divider/>
                                <Typography style={{ marginTop: "5rem"}}variant="body2" color="textSecondary">
                                    SIZES
                                </Typography>
                                <Divider/>
                                <Typography style={{ marginTop: "5rem"}} variant="body2" color="textSecondary">
                                    COLORS
                                </Typography>
                                <Divider />

                            </Grid>
                            <Grid style={{marginBottom: "3rem",marginLeft:"20rem"}}>



                                    <Button  style={{ marginLeft: "1.25rem",marginTop: "5rem",marginBottom: "2rem",cursor: 'pointer' }}>
                                        PURCHASE
                                    </Button>
                                <div >
                                    <ButtonGroup variant="text" color="#FFFFFF" aria-label="text primary button group">
                                    <IconButton
                                        onClick={handlecountplus}>
                                    <AddIcon />
                                    </IconButton>
                                <Button size='small'id="outlined-basic" label="0" variant="outlined">
                                    {countclick}

                                </Button>
                                    <IconButton
                                                onClick={handlecountminus}>
                                    <RemoveIcon/>
                                    </IconButton>
                                    </ButtonGroup>
                                    </div>
                            </Grid>
                        </Grid>
                        <Grid >
                            <IconButton
                                style={{ fontSize: '200%' }}
                                onClick={handleclickheart}>
                                {clicked ? <Favorite /> : <FavoriteBorderIcon />}
                            </IconButton >
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper justifyContent={'center'} className={classes.paper}>
              <div  >
                <TextField style={{"height" : "100%", "width" : "100%"}}
                    id="outlined-multiline-static"
                    label="Please write a comment"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                />
                </div>
            </Paper>
            <Paper justifyContent={'center'} className={classes.paper}>
                COMMENT SECTION
            </Paper>
            <div>
                <Footer/>
            </div>
        </div>
    );
}
