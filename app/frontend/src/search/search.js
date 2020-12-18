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
import gridlistforsearch, {TitlebarGridList} from "../components/gridlistforsearch";
import CheckboxListSecondary from "../components/filterlists";
import TextField from "@material-ui/core/TextField";
import {Button, Divider} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import StarList from "../components/starlist";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from "@material-ui/core/InputLabel";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',

    },
    formControl: {
        margin: theme.spacing(1),
        width:200,
        marginLeft:1000,
    },

    float:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
       justifyContent:'space-between',

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

    const [state, setState] = React.useState({
        sort: '',

    });

    const handleChange = (event) => {
        const sort = event.target.sort;
        setState({
            ...state,
            [sort]: event.target.value,
        });
    };

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

                    <Button style={{marginLeft:'3rem',marginBottom:'0.5rem',backgroundColor:"#0B3954"}}variant="contained" color="secondary">
                        APPLY ALL
                    </Button>

                    <div>
                        <div className={classes.float} style={{marginTop:'1rem'}}  variant="text" aria-label="text primary button group">

                        <TextField style={{marginLeft:'0.3rem',marginRight:'0.5rem'}}
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
                        </div>

                    <CheckboxListSecondary list={brandlist} filterkey={brandname}/>
                    </div>
                    <Divider/>
                    <div style={{marginTop:'1rem'}}>
                        <div className={classes.float} style={{marginTop:'1rem'}} variant="text" aria-label="text primary button group">
                        <TextField style={{marginLeft:'0.3rem',marginRight:'0.5rem'}}
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
                    </div>
                        <CheckboxListSecondary list={vendorlist} filterkey={vendorname}/>
                    </div>
                    <Divider style={{marginBottom:'1rem'}}/>
                    <Divider style={{marginBottom:'1rem'}}/>
                    &nbsp;&nbsp;Price Range
                    <div className={classes.float} style={{marginLeft:'0.5rem',marginTop:'1rem'}} variant="text" aria-label="text primary button group">

                        <TextField
                            id="filled-name"

                            value={priceleast}
                            onChange={handleChangePriceleast}
                            variant="outlined"
                            size="small"
                        />
                        <Typography component="legend"> <bd>-</bd> </Typography>
                    <TextField style={{marginRight:'0.5rem'}}
                            id="filled-name"

                            value={pricemost}
                            onChange={handleChangePricemost}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton color="secondary" style={{ background: '#F3DE8A' }} aria-label="add to shopping cart">
                            <SearchIcon  style={{ fontSize: 18 }}/>
                        </IconButton>

                    </div>
                    <Divider style={{marginTop:'2rem',marginBottom:'1rem'}}/>
                    <div className={classes.float} style={{marginLeft:'0.5rem'}}>
                        <Typography component="legend"> {'Star Filter'} </Typography>
                        <IconButton color="secondary" style={{marginLeft:'7rem', background: '#F3DE8A' }} aria-label="add to shopping cart">
                        <SearchIcon  style={{ fontSize: 18 }}/>
                    </IconButton></div>
                    <div >
                    <StarList />
                    </div>
                    <Divider style={{marginTop:'16rem',marginBottom:'1rem'}}/>
                    <div style={{marginTop:'1rem',marginLeft:'0.5rem'}}>
                        Discount Range (%)
                    <div className={classes.float} style={{marginTop:'1rem'}} variant="text" aria-label="text primary button group">

                        <TextField
                            id="filled-name"

                            value={discountleast}
                            onChange={handleChangeDiscountleast}
                            variant="outlined"
                            size="small"
                        />
                        <Typography component="legend">  <bd>-</bd> </Typography>
                        <TextField style={{marginRight:'0.5rem'}}
                            id="filled-name"

                            value={discountmost}
                            onChange={handleChangeDiscountmost}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton color="secondary" style={{ background: '#F3DE8A' }} aria-label="add to shopping cart">
                            <SearchIcon  style={{ fontSize: 18 }}/>
                        </IconButton>

                    </div>
                        <Divider style={{marginTop:'1rem',marginBottom:'1rem'}}/>
                    </div>


                    </Grid>
                <Grid item xs={12} sm={10}>
                    <div className={classes.float}>
                    <FormControl   size={'medium'} color={"primary"} className={classes.formControl}>
                        <InputLabel htmlFor="sort-native-simple">SORT</InputLabel>
                        <Select
                            native
                            value={state.age}
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'sort-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value='bestseller'>Best-sellers</option>
                            <option value='newarrivals'>New-arrivals</option>
                            <option value='price'>Price</option>
                            <option value='review'>Reviews</option>
                            <option value='rating'>Rating</option>
                        </Select>
                    </FormControl>
                        <IconButton size="medium"  style={{ marginRight:'5rem',marginTop:'1.25rem',color:"#0B3954" }} >
                            <FilterListIcon  style={{fontSize: 18 }}/>
                        </IconButton>
                        </div>
                <TitlebarGridList tileData={tileData}/>
                    </Grid>


                </Grid>




            <div style={{ marginTop: "5rem"}}>
                <Footer />
            </div>
        </div>
    );
}
