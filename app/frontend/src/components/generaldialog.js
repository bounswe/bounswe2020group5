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
import Messages from "../profile/messages";

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

export const GeneralCustomizedDialogs= ({id}) =>  {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    let [messageempty,setmessageempty]=React.useState(false);

    const justhandleClose = () => {
        setOpen(false);

    };

    const handleChange = (event) => {
        setValue(event.target.value);
        setmessageempty(false)

    };

    const handleClickOpen = () => {
        setOpen(true);



    };
    const handleClose = () => {
        if(value.length<1){
            setmessageempty(true)
        }

        if (!(value.length<2)) {
        setOpen(false);

        const token = localStorage.getItem('token')

        console.log(token)
        console.log('ooooo')
        let createmessage;



        createmessage= {
            "chat_id": id,
            "content":value,
        }

        if (token) {
            fetch(serverUrl + 'api/chats/send_message/', {
                method: 'POST',
                headers: {'Authorization': 'Token ' + token,'Content-Type': 'application/json'},
                body: JSON.stringify(createmessage),
            }).then(res => res.json())
                .then(json => {
                    console.log(json);
                    window.location.reload();

                })
                .catch(err => console.log(err));
        } else {
            alert('Please login in order to message')
        }


    }};


    return (
        <div>
            <Button size="large"  onClick={handleClickOpen} style={{
                marginRight:'3rem',
                cursor: 'pointer',
                background: '#0B3954',
                color: 'white',
                position:'relative'

            }}>
                REPLY
            </Button>
            <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={justhandleClose}>
                    SEND MESSAGE
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <TextField style={{"height": "30rem", "width": "35rem"}}
                                   id="temp_comment"
                                   label="Please write a message "
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
export default GeneralCustomizedDialogs;
