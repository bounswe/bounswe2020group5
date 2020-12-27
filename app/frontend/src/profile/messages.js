import React, {useEffect, useState} from 'react';
import Navbar from "../home/Navbar";
import CategoryTab from "../components/CategoryTab";
import {Link} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
import {serverUrl} from "../common/ServerUrl";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import GeneralCustomizedDialogs from "../components/generaldialog";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,

    },
    float:{
        display: 'inline-block',
        flexDirection: 'vertical',
        alignItems:'center',
        justifyContent:'space-between',

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
    txt: {
        fontSize: 20,
    },
    grid2: {
        marginBottom: "1.5rem",
        marginLeft: "6rem",
    },
    ftr: {
        marginTop: "2rem",
    },
    txtfield: {
        width: "14rem",
        marginBottom: "2rem",
    },
    txtfield2: {
        width: "36rem",
        marginBottom: "2rem",
    },
    txtfield3: {
        width: "20rem",
        marginBottom: "2rem",
        marginLeft: "2rem",
    }
}));

function Messages() {

    const classes = useStyles();
    let [open, setOpen] = React.useState(false);
    let [loadPage, setLoadPage] = React.useState(true);
    let [open2, setOpen2] = React.useState('');
    let[allchats,setallchats]=React.useState([]);
    let chatnos =new Set();
    let [lastmessages, setlastmessages] = React.useState([]);

    useEffect(() => {

    const token = localStorage.getItem('token')

    console.log(token)


    if (token) {
        fetch(serverUrl + 'api/chats/get_all_chats/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: '',

        }).then(res => res.json())
            .then(json => {
                {json.map((value) => {chatnos.add(value.id)})}

                console.log(chatnos)
                console.log('aaaa')
                console.log(json)
                setallchats(json)
                getlastmessage(chatnos)

            }).then(() => {
            setLoadPage(true)
        })
            .catch(err => console.log(err));
    } else {
        alert('Please login to see profile page')
    }
    }, []);

    let[messagehistoryofid,setmessagehistoryofid]=React.useState([])

    const getchathistory = (id) => {

        const token = localStorage.getItem('token')
        let messagehistory;



        messagehistory= {
            "chat_id": id,
        }


        console.log(token)

        if (token) {
            fetch(serverUrl + 'api/chats/get_chat_history/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify(messagehistory),
            }).then(res => res.json())
                .then(json => {
                   console.log(json)
                    console.log('hhhhhh')
                    setmessagehistoryofid(json)

                }).then(() => {
                setLoadPage(true)
            })
                .catch(err => console.log(err));
        } else {
            alert('Please login to see profile page')
        }

    };



function getlastmessage(chatnos){
    let arraychatnos = Array.from(chatnos);
   arraychatnos.map((value) => {
       console.log(value)

        const token = localStorage.getItem('token')
        let lastmessage;


        lastmessage = {
            "chat_id": value,
        }

        console.log('sssssssss')
        console.log(token)

        if (token) {
            fetch(serverUrl + 'api/chats/get_last_message/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                body: JSON.stringify(lastmessage),
            }).then(res => res.json())
                .then(json => {
                    console.log(json)
                    console.log('xxxxxx')
                    lastmessages.push(json)
                    setlastmessages(lastmessages)
                    console.log(lastmessages)
                }).then(() => {
                setLoadPage(true)
            })
                .catch(err => console.log(err));
        } else {
            alert('')
        }
})

    }



    let [indexnow, setindexnow] = React.useState('');


    return (

        <div>
            {loadPage ? (
                <div>
                    <div className="Home">
                        <Navbar/>
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
                        <List className={classes.root}  >
                            {allchats.map((value,index) => {
                                console.log(index)
                                console.log(value.id)
                                console.log(lastmessages)



                                return (


                                    <ListItem  className={classes.float} key={index}>
                                        <ListItemAvatar style={{width:'30rem'}} className={classes.reply}  >
                                            <Avatar
                                                alt={`Avatar n°${value + 1}`}
                                                src={`/static/images/avatar/${value + 1}.jpg`}
                                            />
                                            <GeneralCustomizedDialogs id={value.customer_id} />
                                        </ListItemAvatar>
                                        <ListItemText onClickCapture={()=>setOpen2(!open2)}
                                                      onClick={()=>setindexnow(index)} primary={<span>From: {value.customer_id} To:{value.vendor_id}
                                                      </span>} secondary={<span
                                                      contentEditable="true">{lastmessages.indexOf(index)}</span>}/>


                                        { open2&&index==indexnow ? <ExpandLess onClickCapture={()=>setOpen2(!open2)} onClick={()=>setindexnow(index)}/> : <ExpandMore onClickCapture={()=>setOpen2(!open2)} onClick={()=>setindexnow(index)}/>}
                                        <Collapse  className={classes.float} in={open2&&index==indexnow } timeout="auto" unmountOnExit>
                                            {[].map((value,index) => {
                                         return(
                                            <List >
                                                <ListItem  className={classes.flow}>
                                                    <ListItemText primary={value}/>
                                                </ListItem>
                                            </List> );})}
                                        </Collapse>

                                        <Divider/>
                                    </ListItem>


                            );
                            })}

                        </List>

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
