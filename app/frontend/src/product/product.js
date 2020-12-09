import React , {Component,useEffect, useState}from 'react';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
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
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginLeft:100,
        marginRight:100,
        marginTop:20,
        marginBottom:20,
        maxWidth: 1500,
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
    const [value, setValue] = React.useState(0);

    let [heartclick, setheartclick] = useState(false);
    let [listclick, setlistclick] = useState(false);
    let [countclickheart, setcount] = useState(0);

    const handlecountplus = () => {
        if(countclickheart<10) {
            countclickheart = countclickheart + 1;
        }
       setcount(countclickheart);
    };

    const handlecountminus = () => {
        if(countclickheart>0) {
            countclickheart = countclickheart - 1;
        }
        setcount(countclickheart);
    };
    const handlelistcount = () => {
        if(listclick) {
            listclick = false;
        }else{
            listclick=true;
        }
        setlistclick(listclick);
    };


    const handleclickheart = () => {
        if(heartclick){
            setheartclick(false);
        }else{
            setheartclick(true);
        }
    };
    const handleclicklist = () => {
        if(heartclick){
            setlistclick(false);
        }else{
            setlistclick(true);
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
                                <Typography style={{ marginTop: "4rem",marginBottom: "2rem"}} variant="body2" gutterBottom>
                                    $19.00
                                </Typography>
                                <Divider />
                                <Typography style={{ marginTop: "4rem",marginBottom: "2rem"}}variant="body2" color="textSecondary">
                                    SIZES
                                </Typography>
                                <Divider/>
                                <Typography style={{ marginTop: "4rem",marginBottom: "2rem"}} variant="body2" color="textSecondary">
                                    COLORS
                                </Typography>
                                <Divider />
                                <IconButton style={{marginTop: "2rem"}}
                                    onClick={handlelistcount}>
                                    {listclick ? <TurnedInIcon fontSize={"large"} /> : <TurnedInNotIcon fontSize={"large"} />}
                                </IconButton >
                                <IconButton style={{marginTop: "2rem"}}
                                    onClick={handleclickheart}>
                                    {heartclick ? <Favorite fontSize={"large"} /> : <FavoriteBorderIcon fontSize={"large"} />}
                                </IconButton >

                            </Grid>
                            <Grid style={{marginBottom: "1rem",marginLeft:"20rem"}}>


                                    <Button size="large" variant="contained" style={{ marginLeft: "9.1rem",marginTop: "1rem",marginBottom: "1rem",cursor: 'pointer' }}>
                                        PURCHASE
                                    </Button>

                                <div >


                                    <ButtonGroup style={{ marginLeft: "9rem"}} variant="text" color="#FFFFFF" aria-label="text primary button group">

                                    <IconButton
                                        onClick={handlecountplus}>
                                    <AddIcon />
                                    </IconButton>
                                <Button size='small'id="outlined-basic" label="0" variant="outlined">
                                    {countclickheart}

                                </Button>
                                    <IconButton
                                                onClick={handlecountminus}>
                                    <RemoveIcon/>
                                    </IconButton>
                                    </ButtonGroup>
                                    </div>
                            </Grid>
                        </Grid>
                        <Grid style={{marginLeft:"2rem"}} >
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Typography component="legend"></Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box>

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
