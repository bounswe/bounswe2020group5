import React, {useEffect, useState} from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
import {serverUrl} from "../common/ServerUrl";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import GeneralCustomizedDialogs from "../components/generaldialog";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflowX:'hidden'

    },
    float:{
        display: 'inline-block',
        flexDirection: 'vertical',
        alignItems:'center',
        justifyContent:'space-between',
        marginLeft:'1rem'


    },
    flow:{
        display:'flex',
        flexDirection: 'horizontal',
        alignItems:'center',

    },

    reply:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
    nested: {
        paddingLeft: theme.spacing(4),
        marginBottom:'2rem'
    },
    gridroot: {
        flexGrow: 1,
        marginTop: "1rem",
        marginLeft: "2rem",
    },
    paper: {
        height: "30rem",
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },

    ftr: {
        marginTop: "2rem",
    },

}));

function Messages() {

    const classes = useStyles();
    let [open, setOpen] = React.useState(false);
    let [loadPage, setLoadPage] = React.useState(false);
    let [open2, setOpen2] = React.useState('');
    let[allchats,setallchats]=React.useState();
    let[showlist,setshowlist]=React.useState(true);



    useEffect(() => {

    const token = localStorage.getItem('token')

    console.log(token)


    if (token) {
        fetch(serverUrl + 'api/chats/get_all_chats/', {
            method: 'GET',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},


        }).then(res => res.json())
            .then(json => {



                if(JSON.parse(JSON.stringify(json)).error=='there is no chat the user is involved'){
                    setshowlist(false)
                }else{
                    setallchats(JSON.parse(JSON.stringify(json)).chats)
                    setshowlist(true)
                }
                console.log(JSON.parse(JSON.stringify(json)).chats)
                setLoadPage(true)


            })

            .catch(err => console.log(err));
    } else {
        alert('Please login to see message page')
    }
    }, []);





    function getlastmessage(chatnos){
    let messageset=[];
    let lastmessagefr=[];
    let arraychatnos = Array.from(chatnos);
     arraychatnos.map((value) => {
       console.log(value)
       console.log('sssssssss')

        const token = localStorage.getItem('token')
        let lastmessage;


        lastmessage = {
            "chat_id": value,
        }



        if (token) {
            fetch(serverUrl + 'api/chats/get_last_message/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify(lastmessage),
            }).then(res => res.json())
                .then(json => {

                    console.log(json)
                    console.log(json.context)
                    console.log('xxxxxx')


                    console.log(lastmessagefr)
                    console.log('xxxxxx')

                })

                .catch(err => console.log(err));
        } else {
            alert('')
        }
})
        setLoadPage(true)

    }



    let [indexnow, setindexnow] = React.useState('');
    let [hover,sethover]=useState(false);

    return (


        <div>
            {loadPage ? (

                <div>
                    <div className="Home">
                        <Navbar messagespage={true}/>
                    </div>
                    <div>
                        <CategoryTab/>
                    </div>
                    <div style={{marginTop: "1rem"}}>
                        <Breadcrumbs style={{color: "#0B3954"}} separator="›">
                            <Link style={{marginLeft: "3rem", color: "#0B3954"}} to="/">
                                Home Page
                            </Link>
                            <Link style={{color: "#0B3954"}} to="/profile">
                                Messsages
                            </Link>
                        </Breadcrumbs>
                        { showlist ? <List className={classes.root}  >
                            {console.log(allchats)}


                            {allchats.map((value,index) => {
                                console.log('vvvvvvv')

                                let date=value.messages[value.messages.length-1].date_sent.split("T")[0].split("-")[2]+"-"+value.messages[value.messages.length-1].date_sent.split("T")[0].split("-")[1]+"-"+value.messages[value.messages.length-1].date_sent.split("T")[0].split("-")[0]+" "+
                                    (parseInt(value.messages[value.messages.length-1].date_sent.split("T")[1].split("Z")[0].split(":")[0])+3)+":"+value.messages[value.messages.length-1].date_sent.split("T")[1].split("Z")[0].split(":")[1];
                                let vendorname=value.vendor_username
                                let customername=value.customer_username

                                console.log('lastmessages')

                                return (


                                    <ListItem  className={classes.float} key={index}>
                                        <div className={classes.flow}>

                                        <ListItemText  onClickCapture={()=>setOpen2(!open2)}
                                                      onClick={()=>setindexnow(index)} primary={value.messages[value.messages.length-1].whose_message=='customer'?
                                            <span className={classes.flow} style={{fontStyle:'italic',fontWeight:'bold'}}>From:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{customername.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                To:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{vendorname.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                Date:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{date}</span>
                                               </span>: <span className={classes.flow} style={{fontStyle:'italic',fontWeight:'bold'}}>
                                                From:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{vendorname.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                To:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{customername.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                Date:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{date}</span></span>}
                                                secondary={<span style={{color:'black'}}> <br></br>{value.messages[value.messages.length-1].content}</span>}/>
                                            <GeneralCustomizedDialogs id={value.id}/>
                                            <Tooltip style={{marginRight:'45rem', color: '#7A0010' }}  title="Go to product">

                                                <Link to={"/product/"+value.product_id}>
                                                <IconButton style={{color: '#7A0010' }} aria-label="arrow">
                                                    <ArrowForwardOutlinedIcon fontSize="large" />
                                                </IconButton>
                                                </Link>

                                            </Tooltip>
                                        </div>


                                        { open2&&index==indexnow ?<ExpandLess style={{marginTop:'1rem'}} onClickCapture={()=>setOpen2(!open2)} onClick={()=>setindexnow(index)}/> : <ExpandMore style={{marginTop:'1rem'}} onClickCapture={()=>setOpen2(!open2)} onClick={()=>setindexnow(index)}/>}
                                        <Collapse  in={open2&&index==indexnow } timeout="auto" unmountOnExit>
                                            {value.messages.map((value,index) => {
                                                let datehistory=value.date_sent.split("T")[0].split("-")[2]+"-"+value.date_sent.split("T")[0].split("-")[1]+"-"+value.date_sent.split("T")[0].split("-")[0]+" "+
                                                    (parseInt(value.date_sent.split("T")[1].split("Z")[0].split(":")[0])+3)+":"+value.date_sent.split("T")[1].split("Z")[0].split(":")[1];
                                         return(
                                            <List >
                                                <ListItem  >
                                                    <ListItemText primary={value.whose_message=='customer'?
                                                        <span style={{fontStyle:'italic',fontWeight:'bold'}}>
                                                            From:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}> {customername.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            To:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}> {vendorname.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            Date:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}> {datehistory}</span></span>: <span style={{fontStyle:'italic',fontWeight:'bold'}}>
                                                            From:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}> {vendorname.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            To:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{customername.toUpperCase()}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            Date:&nbsp;&nbsp;&nbsp;<span  style={{color:'red'}}>{datehistory}</span></span>}

                                                            secondary={<span style={{color:'black'}}> <br></br>{value.content}</span>}/>
                                                </ListItem>
                                                <Divider/>
                                            </List> );})}
                                        </Collapse>

                                        <Divider/>
                                    </ListItem>



                            );
                            })}

                        </List>:null}

                    </div>


                    <div className={classes.gridroot}>
                        <Grid container>
                            <Grid item xs={3}>

                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.ftr}>
                        <Footer/>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Messages;
