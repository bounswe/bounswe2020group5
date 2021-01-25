import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import {serverUrl} from "../common/ServerUrl";
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 10,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },

}));

export const Statusupdate= ({orderid,priorstatus}) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    let [myValue, setValue] = React.useState();



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handlejustClose = () => {
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
        const token = localStorage.getItem('token')


        let dataship;
        dataship = {
            "purchase_id":parseInt(orderid),
            "cargo_company":myValue

        }
        console.log(orderid)

        fetch(serverUrl + 'api/orders/add-shipment/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify(dataship),
        }).then(res => res.json())
            .then(json=> {
                console.log('kkkkkkkkkkkkkk')
             console.log(json)
            }).then(()=>HandleUpdate("Ship")).catch(err=>console.log(err))


    };


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const HandleUpdate = (status,event) => {
        const token = localStorage.getItem('token')
        console.log(orderid)
        console.log(status)

        let dataupdate;
        dataupdate = {
            "purchase_id":parseInt(orderid),
            "status":status

        }
        console.log(orderid)

        fetch(serverUrl + 'api/orders/update-status/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify(dataupdate),
        }).then(res => res.json())
            .then(json=> {
                if(json.success){
                    alert("Order Status has been successfully updated")
                    window.location.reload()
                } else alert("amannn")
            }).catch(err=>console.log(err))
    };

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Order Status Update"
            />
            <div className={classes.container}>
                { /*<Grow in={checked}>

                        <Button
                            variant="contained"
                            style={{color:'white',backgroundColor:"#0B3954"}}
                            size="small"
                            onClick={(event) =>HandleUpdate("OrderTaken",event)}
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            OrderTaken
                        </Button>


                </Grow>*/}
                {/* Conditionally applies the timeout prop to change the entry speed. */}
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >
                    <Button
                        variant="contained"
                        style={{color:'white',backgroundColor:'#7E7F9A'}}
                        size="small"
                        onClick={(event) =>HandleUpdate("Preparing",event)}
                        className={classes.button}
                        disabled={!(priorstatus=="OrderTaken")}
                        startIcon={<TimelapseIcon />}
                    >
                       Preparing
                    </Button>

                </Grow>
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1500 } : {})}
                >
                    <Button
                        variant="contained"
                        style={{color:'white',backgroundColor:'#F3DE8A'}}
                        size="small"
                        onClick={(event) =>handleClickOpen("Ship",event)}
                        className={classes.button}
                        disabled={!(priorstatus=="Preparing")}
                        startIcon={<LocalShippingIcon />}
                    >
                        Ship
                    </Button>
                                    </Grow>
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 2000 } : {})}
                >

                    <Button
                        variant="contained"
                        style={{color:'white',backgroundColor:'#7A0010'}}
                        size="small"
                        onClick={(event) =>HandleUpdate("Delivered",event)}
                        className={classes.button}
                        disabled={!(priorstatus=="Ship")}
                        startIcon={<DoneAllIcon />}
                    >
                        Delivered
                    </Button>


                </Grow>
            </div>
            <Dialog open={open} onClose={handlejustClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Shipping Company</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To ship this product to customer, please enter a shipping company name here.
                    </DialogContentText>
                    <TextField
                        onChange={(e) => setValue(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="shipping"
                        label="Shipping Company"
                        type="ship"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlejustClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ship
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default Statusupdate;