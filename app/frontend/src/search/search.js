import React , {Component,useEffect, useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import Footer from "../components/Footer";
import gridlistforsearch, {TitlebarGridList} from "../components/gridlistforsearch";
import CheckboxListSecondary from "../components/filterlists";
import TextField from "@material-ui/core/TextField";
import {Button, Divider} from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import {serverUrl} from "../common/ServerUrl";
import Rating from "@material-ui/lab/Rating";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',

    },
    formControl: {
        margin: theme.spacing(1),
        width:225,
        marginLeft:850,
        marginTop:25,
    },

    helperText:{
    color:'red'
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
    const [loadPage, setLoadPage] = React.useState(false);
    let [statepro, setStatepro] = React.useState("");

    let [selectbrand, setselectbrand] = React.useState([]);
    let [selectvendor, setselectvendor] = React.useState([]);
    let [selectid,setselectid]=React.useState([]);
    let [branddata,setbranddata]=React.useState(true);
    let [vendordata,setvendordata]=React.useState(true);


    let filledidproducts;
    let filledbrandlist;
    let uniquebrand=new Set();
    let filledvendorlist;
    let uniquevendor=new Set();

    useEffect(() => {

        let searchproductdata;


        searchproductdata = {
            "query": localStorage.getItem('searchkey'),
        }
        fetch(serverUrl + 'api/products/search/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(searchproductdata),

        }).then(res => res.json())
            .then(json => {
                setStatepro ( json);
                setLoadPage(true);

                filledidproducts = json.map((product) => (product.id));
                setselectid(filledidproducts)

                filledbrandlist=json.map((product) => (product.brand));
                filledbrandlist.forEach(b => uniquebrand.add(b));
                filledbrandlist=Array.from(uniquebrand);
                setselectbrand(filledbrandlist);

                filledvendorlist=json.map((product) => (product.vendor));
                filledvendorlist.forEach(v => uniquevendor.add(v));
                filledvendorlist=Array.from(uniquevendor);
                setselectvendor(filledvendorlist);


            })
            .catch(err => console.log(err));


    }, []);

    const classes = useStyles();

    const vendorfilterclick = () => {
        let error;
        let datavendor;
        var vendorkeys=JSON.parse(sessionStorage.getItem('vendorlist'));

        if(vendorkeys==null){
            vendorkeys=0
        }

        if (vendorkeys==0){
            setvendordata(false);
            vendorkeys=[];
            if(statepro.length==0){
                setvendordata(true);
            }
        }else{
            setvendordata(true);
        }


        datavendor = {
            "product_ids": selectid,
            "filter_data":[{
                "filter_by":"vendor",
                "data":vendorkeys,
            },
            ]
        }

        fetch(serverUrl + 'api/products/filter/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datavendor)
        }).then(res => res.json())
            .then(json => {
                console.log(json)
                error=json.error

                if(error=='No products found'){
                    setStatepro([])}
                else{

                    if(vendorkeys.length!=0) {
                        setStatepro(json)
                    }
                }
                setLoadPage(true);
                sessionStorage.setItem('vendorlist',JSON.stringify([]))

            })
            .catch(err => {
                alert('Some error has occurred')
                console.log(err)
            });

    };
    const pricefilterclick = () => {
        let dataprice;
        let error;
        dataprice = {
            "product_ids": selectid,
            "filter_data":[{
                "filter_by":"price_range",
                "data":{
                    "lower_limit":priceleast,
                    "upper_limit":pricemost,
                }
            },
            ]
        }
        fetch(serverUrl + 'api/products/filter/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataprice)
        }).then(res => res.json())
            .then(json => {
                error=json.error
                console.log(json.error)
                console.log(json)

                if(error=='No products found'){

                    setStatepro([])}
                else{
                    if(priceleast!=pricemost){
                    if(dataprice.length!=0) {
                        if(statepro.length!=0){
                        setStatepro(json)
                    }}
                }}
                    setLoadPage(true);


            })
            .catch(err => {
                alert('Some error has occurred')
                console.log(err)
            });

    };
    const starfilterclick = () => {
        let datastar;
        let error;
        datastar = {
            "product_ids": selectid,
            "filter_data":[{
                "filter_by":"rating",
                "data":starvalue,
            },
            ]
        }
        fetch(serverUrl + 'api/products/filter/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datastar)
        }).then(res => res.json())
            .then(json => {
                error=json.error

                if(error=='No products found'){
                    setStatepro([])}
                else{
                    if(datastar.length!=0) {
                        if(statepro.length!=0){
                            setStatepro(json)
                        }}
                }
                setLoadPage(true);


            })
            .catch(err => {
                alert('Some error has occurred')
                console.log(err)
            });

    };

    const discountfilterclick = () => {
        let datadiscount;
        let error;
        datadiscount = {
            "product_ids": selectid,
            "filter_data":[{
                "filter_by":"discount_rate",
                "data":discountleast,
            },
            ]
        }
        fetch(serverUrl + 'api/products/filter/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datadiscount)

        }).then(res => res.json())
            .then(json => {
                error=json.error

                if(error=='No products found'){
                    setStatepro([])}
                    else{
                    if(datadiscount.length!=0) {
                        if(statepro.length!=0){
                            setStatepro(json)
                        }}
                }
                    console.log(statepro)

                setLoadPage(true);


            })
            .catch(err => {

                    alert('Some error has occurred')
                    console.log(err)

            });

    };

    const brandfilterclick = () => {
        let error;
        let databrand;
        var brandkeys=JSON.parse(sessionStorage.getItem('brandlist'));
        console.log(brandkeys)


        if(brandkeys==null ){
            brandkeys=[]

        }

        if (brandkeys.length==0){
            setbranddata(false);

        if(statepro.length==0){
            console.log('aa')

            setbranddata(true);
            }
        }else{
            setbranddata(true);
        }



        databrand = {
            "product_ids": selectid,
            "filter_data":[{
                "filter_by":"brand",
                "data":brandkeys,
            },
            ]
        }
        fetch(serverUrl + 'api/products/filter/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(databrand)
        }).then(res => res.json())
            .then(json => {
                error=json.error
                if(error=='No products found'){
               setStatepro([])
                }else{

                    if(brandkeys.length!=0) {
                        setStatepro(json)

                    }
                }
                setLoadPage(true);
                sessionStorage.setItem('brandlist',JSON.stringify([]))

            })
            .catch(err => {
                alert('Some error has occurred')
                console.log(err)
            });

    };

    const Applyallfilter = () => {
        let applyallvendor=true;
        let applyallbrand=true;
        let applyallprice=true;
        let error;
        let dataall;
        let filterdata=[];
        var brandkeys=JSON.parse(sessionStorage.getItem('brandlist'));


        var vendorkeys=JSON.parse(sessionStorage.getItem('vendorlist'));

        if(brandkeys==null){
            brandkeys=[]
        }
        if(vendorkeys==null){
            vendorkeys=[]

        }

        setvendordata(true);
        setbranddata(true);

        if(brandkeys.length==0){
            applyallbrand=false

        }else{
            applyallbrand=true
        }
        if(vendorkeys.length==0){

            applyallvendor=false

        }else{
            applyallvendor=true
        }

        if(priceleast==pricemost){

            applyallprice=false
        }else{
            applyallprice=true
        }


        if(applyallbrand==true){
            filterdata.push(    {
                "filter_by":"brand",
                "data":brandkeys,
            })
        }

        if(applyallvendor==true){

            filterdata.push(    {
                "filter_by":"vendor",
                "data":vendorkeys,
            })
        }

        if(applyallprice==true){
            filterdata.push(    {
                "filter_by":"price_range",
                "data":{
                    "lower_limit":priceleast,
                    "upper_limit":pricemost,
                },
            })
        }


        filterdata.push( {
            "filter_by":"rating",
            "data":starvalue,
        })

        filterdata.push({
            "filter_by":"discount_rate",
            "data":discountleast,
            })

        dataall = {
            "product_ids": selectid,
            "filter_data":filterdata,
        }
        fetch(serverUrl + 'api/products/filter/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataall)
        }).then(res => res.json())
            .then(json => {
                error=json.error
                if(error=='No products found'){
                    setStatepro([])
                }else{

                    if(dataall.length!=0) {
                        if(statepro.length!=0){
                            setStatepro(json)
                        }}

                }
                setLoadPage(true);

            })
            .catch(err => {
                alert('Some error has occurred')
                console.log(err)
            });

    };

    let[sortkey,setsortkey]=React.useState('')

    const [state, setState] = React.useState({
        sort: '',

    });

    const handleChange = (event) => {
        const sort = event.target.sort;
        setState({
            ...state,
            [sort]: event.target.value,
        });

        setsortkey(event.target.value)

    };


    const sorting = () => {
        let error;
        let datasort;
        let sorting=statepro.map((product) => (product.id));
        console.log('pppp')
        console.log(sorting)

        datasort = {
            "product_ids": sorting,
            "sort_by":sortkey.substring(0,sortkey.indexOf("-")),
            "order":sortkey.substring(sortkey.indexOf("-")+1,sortkey.length),
        }
        fetch(serverUrl + 'api/products/sort/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datasort)

        }).then(res => res.json())
            .then(json => {
                error=json.error

                if(error=='No products found'){
                    setStatepro([])}
                else{
                    if(datasort.length!=0) {
                        if(statepro.length!=0){
                            setStatepro(json)
                        }}
                }

                setLoadPage(true);


            })
            .catch(err => {

                alert('Some error has occurred')
                console.log(err)

            });

    };


    const [starvalue, starsetValue] = React.useState(0);
    const resetstar = (event) => {
        starsetValue(0);
    };

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


    return (

        <div>
            {loadPage ? (
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

                    <Button onClick={Applyallfilter} style={{marginLeft:'1.2rem',marginBottom:'0.5rem',backgroundColor:"#0B3954"}}variant="contained" color="secondary">
                        APPLY ALL SELECTED
                    </Button>

                    <div>
                        <div className={classes.float} style={{marginTop:'1rem'}}  variant="text" aria-label="text primary button group">

                        <TextField style={{marginLeft:'0.3rem',marginRight:'0.5rem'}}
                        id="filled-name"
                        label="Brand Name"
                        value={brandname}
                        FormHelperTextProps={{
                          className: classes.helperText
                          }}
                        helperText={branddata ? '':'Please select brands.'}
                        onChange={handleChangeBrand}
                        variant="outlined"
                        size="small"
                    />

                    <IconButton onClick={brandfilterclick} style={{ background: '#F3DE8A' }} color="secondary" aria-label="add to shopping cart">
                        <SearchIcon  style={{ fontSize: 18 }}/>
                    </IconButton>
                        </div>

                        <CheckboxListSecondary listof={selectbrand} filterkey={brandname} isbrand={true}/>
                    </div>
                    <Divider/>
                    <div style={{marginTop:'1rem'}}>
                        <div className={classes.float} style={{marginTop:'1rem'}} variant="text" aria-label="text primary button group">
                        <TextField style={{marginLeft:'0.3rem',marginRight:'0.5rem'}}
                            id="filled-name"
                            label="Vendor Name"
                            value={vendorname}
                            FormHelperTextProps={{
                               className: classes.helperText
                               }}
                            helperText={vendordata ? '':'Please select vendors.'}
                            onChange={handleChangeVendor}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton onClick={vendorfilterclick}  style={{ background: '#F3DE8A' }}color="secondary" aria-label="add to shopping cart">
                            <SearchIcon  style={{ fontSize: 18 }}/>
                        </IconButton>
                    </div>
                         <CheckboxListSecondary listof={selectvendor} filterkey={vendorname} isbrand={false}/>
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
                        <IconButton onClick={pricefilterclick} color="secondary" style={{ background: '#F3DE8A' }} aria-label="add to shopping cart">
                            <SearchIcon  style={{ fontSize: 18 }}/>
                        </IconButton>

                    </div>
                    <Divider style={{marginTop:'2rem',marginBottom:'1rem'}}/>
                    <div className={classes.float} style={{marginLeft:'0.5rem'}}>
                        <Typography className={classes.float} > {'Star Filter (Min.)'} </Typography>
                        <IconButton onClick={starfilterclick} color="secondary" style={{marginLeft:'4.5rem', background: '#F3DE8A' }} aria-label="add to shopping cart">
                        <SearchIcon  style={{ fontSize: 18 }}/>
                    </IconButton></div>
                    <div className={classes.float}>
                        <Rating style={{marginTop:'1.5rem',marginLeft:'0.5rem'}}
                            name="simple-controlled"
                            value={starvalue}
                            //precision={0.5}
                            onChange={(event, newValue) => {
                                starsetValue(newValue);
                            }}

                        />
                        <IconButton onClick={resetstar} color="secondary" style={{marginTop:'1.8rem',marginLeft:'4.5rem' }}>
                            <CancelIcon  style={{ fontSize: 18 }}/>
                        </IconButton>

                    </div>
                    <Divider style={{marginTop:'1rem',marginBottom:'1rem'}}/>
                    <div style={{marginTop:'1rem',marginLeft:'0.5rem'}}>
                        Discount (%Min.)
                    <div className={classes.float} style={{marginTop:'1rem'}} variant="text" aria-label="text primary button group">

                        <TextField style={{marginRight:'5rem'}}
                            id="filled-name"

                            value={discountleast}
                            onChange={handleChangeDiscountleast}
                            variant="outlined"
                            size="small"
                        />
                        <IconButton onClick={discountfilterclick} color="secondary" style={{ background: '#F3DE8A' }} aria-label="add to shopping cart">
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
                            <option value='best_sellers-ascending'>Best sellers Ascending</option>
                            <option value='best_sellers-descending'>Best sellers Descending</option>
                            <option value='new_arrivals-ascending'>New arrivals Ascending</option>
                            <option value='new_arrivals-descending'>New arrivals Descending</option>
                            <option value='price-ascending'>Price Ascending</option>
                            <option value='price-descending'>Price Descending</option>
                            <option value='comments-ascending'>Comments Ascending</option>
                            <option value='comments-descending>'>Comments Descending</option>
                            <option value='rating-ascending'>Rating Ascending</option>
                            <option value='rating-descending'>Rating Descending</option>

                        </Select>
                    </FormControl>
                        <IconButton onClick={sorting} size="medium"  style={{ marginRight:'10rem',marginTop:'2rem',color:"#0B3954" }} >
                            <FilterListIcon  style={{fontSize: 18 }}/>
                        </IconButton>
                        </div>
                    <TitlebarGridList tileData={statepro}/>

                    </Grid>


                </Grid>

            <div style={{ marginTop: "5rem"}}>
                <Footer />
            </div>
        </div>):null}
        </div>
    );
}
