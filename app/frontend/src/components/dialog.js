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

export const CustomizedDialogs= ({customer,vendor,isvendor}) =>  {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    let [chatid,setchatid]=React.useState('');
    let [loadPage, setLoadPage] = React.useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);

            const token = localStorage.getItem('token')

            console.log(token)
            console.log('ooooo')
            let messagetovendor;
            let chatid;


            messagetovendor= {
                "vendor_username": 'deryapolat',
                "product_name":'74'
            }

            if (token) {
                fetch(serverUrl + 'api/chats/create_chat/', {
                    method: 'POST',
                    headers: {'Authorization': 'Token ' + token,'Content-Type': 'application/json'},
                    body: JSON.stringify(messagetovendor),
                }).then(res => res.json())
                    .then(json => {
                       setchatid(JSON.parse(JSON.stringify(json.chat)).id);

                    }).then(() => {
                    setLoadPage(true)
                })
                    .catch(err => console.log(err));
            } else {
                alert('Please login in order to message to vendor')
            }


    };
    const handleClose = () => {
        setOpen(false);

            const token = localStorage.getItem('token')

            console.log(token)
            console.log('ooooo')
            let createmessage;



            createmessage= {
                "chat_id": '56',
                "content":'aaa',
            }

            if (token) {
                fetch(serverUrl + 'api/chats/send_message/', {
                    method: 'POST',
                    headers: {'Authorization': 'Token ' + token,'Content-Type': 'application/json'},
                    body: JSON.stringify(createmessage),
                }).then(res => res.json())
                    .then(json => {
                       console.log(json);


                    }).then(() => {
                    setLoadPage(true)
                })
                    .catch(err => console.log(err));
            } else {
                alert('Please login in order to message to vendor')
            }


    };


    return (
        <div>
            <Button size="large" variant="contained" onClick={handleClickOpen} style={{
                marginRight:'2rem',
                cursor: 'pointer',
                background: '#0B3954',
                color: 'white'

            }}>
                MESSAGE VENDOR
            </Button>
            <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    SEND MESSAGE TO VENDOR
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <TextField style={{"height": "30rem", "width": "35rem"}}
                                   id="temp_comment"
                                   label="Please write a message to vendor"
                                   multiline
                                   rows={20}
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
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default CustomizedDialogs;
