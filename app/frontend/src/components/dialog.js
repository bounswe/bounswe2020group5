import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import {serverUrl} from "../common/ServerUrl";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export const CustomizedDialogs= ({vendor,productid}) =>  {
    const [open, setOpen] = React.useState(false);
    const [opensnack, setOpensnack] = React.useState(false);
    const [opensnack2, setOpensnack2] = React.useState(false);
    const [value, setValue] = React.useState('');

    let [messageempty,setmessageempty]=React.useState(false);

    const snackhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpensnack2(false);
        setOpensnack(false);
    };

    const snackhandleopen = () => {

        setOpensnack(true);

    };
    const snackhandleopen2 = () => {

        setOpensnack2(true);
    };



    const handleChange = (event) => {
        setValue(event.target.value);

        setmessageempty(false)



    };

    const handleClickOpen = () => {
        setOpen(true);


    };
    const justhandleClose = () => {
        setOpen(false);

    };
    const handleClose = () => {


        if(value.length<1){
            setmessageempty(true)
        }
       if (!(value.length<2)) {
           setOpen(false);
           const token = localStorage.getItem('token')
           let messagetovendor;

           messagetovendor = {
               "vendor_username": vendor,
               "product_id": productid
           }

           if (token) {
               let chatid

               fetch(serverUrl + 'api/chats/create_chat/', {
                   method: 'POST',
                   headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                   body: JSON.stringify(messagetovendor),
               }).then(res => res.json())
                   .then(json => {
                       console.log(json)

                       if(JSON.parse(JSON.stringify(json)).error=="The chat with this vendor about this product already exists"){
                           {snackhandleopen()}
                       }else{
                           console.log(JSON.parse(JSON.stringify(json.chat)).id)
                           chatid=JSON.parse(JSON.stringify(json.chat)).id;
                           console.log(chatid)

                           let createmessage;

                           createmessage = {
                               "chat_id": chatid,
                               "content": value,
                           }

                           if (token) {
                               fetch(serverUrl + 'api/chats/send_message/', {
                                   method: 'POST',
                                   headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
                                   body: JSON.stringify(createmessage),
                               }).then(res => res.json())
                                   .then(json => {
                                       console.log(json);
                                       {snackhandleopen2()}

                                   })
                                   .catch(err => console.log(err));

                           }
                       }

                   }).then(() => {

               }).catch(err => console.log(err));

           } else {
               alert('Please login in order to message to vendor')
           }


       }};


    return (
        <div>
            <Snackbar open={opensnack} autoHideDuration={6000} onClose={snackhandleClose}>
                <Alert onClose={snackhandleClose} severity="warning">
                    You have already started a chat with vendor for this particular product. Please continue with conversation from
                    your messages page!
                </Alert>
            </Snackbar>
            <Snackbar open={opensnack2} autoHideDuration={6000} onClose={snackhandleClose}>
                <Alert onClose={snackhandleClose} severity="success">
                    Succesfully created chat for this product with designated vendor. Please continue messaging from messages page
                    for later inquiries.
                </Alert>
            </Snackbar>
            <Button size="large" variant="contained" onClick={handleClickOpen} style={{
                marginRight:'2rem',
                cursor: 'pointer',
                background: '#0B3954',
                color: 'white'

            }}>
                MESSAGE VENDOR
            </Button>
            <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={justhandleClose}>
                    SEND MESSAGE TO VENDOR
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <TextField style={{"height": "30rem", "width": "35rem"}}
                                   id="temp_comment"
                                   label="Please write a message to vendor"
                                   multiline
                                   rows={20}
                                   helperText={messageempty ? 'Please write a message':''}
                                   value={value}
                                   variant="outlined"
                                   onChange={handleChange}

                        />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        SEND
                    </Button>
                    <Button autoFocus onClick={justhandleClose} color="primary">
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default CustomizedDialogs;
