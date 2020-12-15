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
import gridlistforsearch, {TitlebarGridList} from "../components/gridlistforsearch";
import filterlists from "../components/filterlists";
import VirtualizedList from "../components/filterlists";
import CheckboxListSecondary from "../components/filterlists";
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import StarList from "../components/starlist";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';



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
    var brandlist=['a', 'b', 'c', 'd', 'e', 'f'];
    var vendorlist=['a', 'b', 'c', 'd', 'e', 'f'];



    const [brandname, brandsetName] = React.useState('');
    const handleChangeBrand = (event) => {
        brandsetName(event.target.value);
    };
    const [vendorname, vendorsetName] = React.useState('');
    const handleChangeVendor = (event) => {
        vendorsetName(event.target.value);
    };
    const [priceleast, priceleastsetName] = React.useState(0);
    const handleChangePriceleast = (event) => {
        priceleastsetName(event.target.value);
    };
    const [pricemost, pricemostsetName] = React.useState(0);
    const handleChangePricemost = (event) => {
        pricemostsetName(event.target.value);
    };
    const [discountleast, discountleastsetName] = React.useState(0);
    const handleChangeDiscountleast = (event) => {
        discountleastsetName(event.target.value);
    };
    const [discountmost, discountmostsetName] = React.useState(0);
    const handleChangeDiscountmost = (event) => {
        discountmostsetName(event.target.value);
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

            <Grid
                container spacing={2}>
                <Grid  item style={{marginTop: '2rem'}} xs={12} sm={2}>
                    <div>
                        <ButtonGroup style={{marginTop:'1rem'}}  variant="text" aria-label="text primary button group">

                        <TextField
                        id="filled-name"
                        label="Brand Name"
                        value={brandname}
                        onChange={handleChangeBrand}
                        variant="outlined"
                        size="small"
                    />

                    <IconButton style={{ background: '#F3DE8A' }} color="secondary" aria-label="add to shopping cart">
                        <SearchIcon  style={{ fontSize: 18 }}/>
                    </IconButton>
                        </ButtonGroup>

                    <CheckboxListSecondary list={brandlist} filterkey={brandname}/>
                    </div>
                    <Divider/>
                    <div style={{marginTop:'1rem'}}>
                        <ButtonGroup style={{marginTop:'1rem'}} variant="text" aria-label="text primary button group">
                        <TextField
                            id="filled-name"
                            label="Vendor Name"
                            value={vendorname}
                            onChange={handleChangeVendor}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton style={{ background: '#F3DE8A' }}color="secondary" aria-label="add to shopping cart">
                            <SearchIcon  style={{ fontSize: 18 }}/>
                        </IconButton>
                    </ButtonGroup>
                        <CheckboxListSecondary list={vendorlist} filterkey={vendorname}/>
                    </div>
                    <Divider style={{marginBottom:'1rem'}}/>
                    <Divider style={{marginBottom:'1rem'}}/>
                    Price Range
                    <ButtonGroup style={{marginTop:'1rem'}} variant="text" aria-label="text primary button group">

                        <TextField
                            id="filled-name"

                            value={priceleast}
                            onChange={handleChangePriceleast}
                            variant="outlined"
                            size="small"
                        />
                        <Typography component="legend"> &nbsp;____&nbsp; </Typography>
                    <TextField
                            id="filled-name"

                            value={pricemost}
                            onChange={handleChangePricemost}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton color="secondary" style={{ background: '#F3DE8A' }} aria-label="add to shopping cart">
                            <SearchIcon  style={{ fontSize: 18 }}/>
                        </IconButton>

                    </ButtonGroup>
                    <Divider style={{marginTop:'2rem',marginBottom:'1rem'}}/>
                    <div style={{marginLeft:'0.5rem'}}> Star Filter <IconButton color="secondary" style={{marginLeft:'7rem', background: '#F3DE8A' }} aria-label="add to shopping cart">
                        <SearchIcon  style={{ fontSize: 18 }}/>
                    </IconButton></div>
                    <div >
                    <StarList />
                    </div>
                    <Divider style={{marginTop:'16rem',marginBottom:'1rem'}}/>
                    <div style={{marginTop:'1rem',marginLeft:'0.5rem'}}>
                        Discount Range (%)
                    <ButtonGroup style={{marginTop:'1rem'}} variant="text" aria-label="text primary button group">

                        <TextField
                            id="filled-name"

                            value={discountleast}
                            onChange={handleChangeDiscountleast}
                            variant="outlined"
                            size="small"
                        />
                        <Typography component="legend"> &nbsp;____&nbsp; </Typography>
                        <TextField
                            id="filled-name"

                            value={discountmost}
                            onChange={handleChangeDiscountmost}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton color="secondary" style={{ background: '#F3DE8A' }} aria-label="add to shopping cart">
                            <SearchIcon  style={{ fontSize: 18 }}/>
                        </IconButton>

                    </ButtonGroup>
                        <Divider style={{marginTop:'1rem',marginBottom:'1rem'}}/>
                    </div>


                    </Grid>
                <Grid item xs={12} sm={10}>
                <TitlebarGridList tileData={tileData}/>
                    </Grid>


                </Grid>




            <div style={{ marginTop: "5rem"}}>
                <Footer />
            </div>
        </div>
    );
}
