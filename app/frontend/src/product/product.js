import React , {useEffect, useState}from 'react';
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



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginLeft:200,
        marginTop:20,
        marginBottom:100,
        maxWidth: 1100,
    },
    image: {
        width: 600,
        height: 600,
    },
    img: {
        marginTop:100,
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function ComplexGrid() {
    const classes = useStyles();
    var count=0;
    let [clicked, setClicked] = useState(false);
    let [countclick, setcount] = useState(0);

    const handlecount = () => {
        if(countclick){
            count=count++;
        }else{

        }
    };
    const handleclick = () => {
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

            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={image1}/>
                        </ButtonBase>

                    </Grid>
                    <Grid item xs={1} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Intellinet Smart Watch
                                </Typography>
                                <Typography style={{ marginTop: "5rem"}} variant="body2" gutterBottom>
                                    $19.00
                                </Typography>
                                <Typography style={{ marginTop: "5rem"}}variant="body2" color="textSecondary">
                                    SIZES
                                </Typography>
                                <Typography style={{ marginTop: "5rem"}} variant="body2" color="textSecondary">
                                    COLORS
                                </Typography>
                                <TextField style={{ marginTop: "5rem"}}id="filled-basic" label="Please leave a comment" variant="filled" />
                            </Grid>
                            <Grid item>
                                <div>
                                <Button style={{ marginLeft: "15rem",marginTop: "5rem",cursor: 'pointer' }}>
                                    SEPETE EKLE
                                </Button>
                                </div>
                                <div>
                                    <IconButton style={{ marginLeft: "10rem"}}
                                        onClick={handlecount}>
                                    <AddIcon />
                                    </IconButton>
                                <Button style={{ marginLeft: "10rem",marginRight:"7rem"}}size='small'id="outlined-basic" label="0" variant="outlined">
                                    0

                                </Button>
                                    <IconButton style={{ marginLeft: "10rem"}}
                                                onClick={handlecount}>
                                    <RemoveIcon/>
                                    </IconButton>
                                    </div>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={handleclick}>
                                {clicked ? <Favorite /> : <FavoriteBorderIcon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <div>
                <Footer/>
            </div>
        </div>
    );
}
