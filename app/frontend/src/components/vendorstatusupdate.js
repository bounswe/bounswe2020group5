import React from 'react';
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

export const Statusupdate= ({orderid}) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);


    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const HandleUpdate = (status) => {
        const token = localStorage.getItem('token')
        let dataupdate;
        dataupdate = {
            "order_id": orderid,
            "status":status

        }
        console.log(orderid)

        fetch(serverUrl + 'api/orders/update-status/', {
            method: 'POST',
            headers: {'Authorization': 'Token ' + token, 'Content-Type': 'application/json'},
            body: JSON.stringify(dataupdate),
        }).then(res => res.json())
            .then(json => {
                if(json.success){
                    alert("Order Status Updated")
                    window.location.reload()
                } else alert("Cancel failed")
            })
    };

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Order Status Update"
            />
            <div className={classes.container}>
                <Grow in={checked}>

                        <Button
                            variant="contained"
                            style={{color:'white',backgroundColor:"#0B3954"}}
                            size="small"
                            onClick={HandleUpdate("OrderTaken")}
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            OrderTaken
                        </Button>


                </Grow>
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
                        onClick={HandleUpdate("Preparing")}
                        className={classes.button}
                        startIcon={<TimelapseIcon />}
                    >
                       Preparing
                    </Button>

                </Grow>
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >
                    <Button
                        variant="contained"
                        style={{color:'white',backgroundColor:'#F3DE8A'}}
                        size="small"
                        onClick={HandleUpdate("Ship")}
                        className={classes.button}
                        startIcon={<LocalShippingIcon />}
                    >
                        Ship
                    </Button>

                </Grow>
                <Grow
                    in={checked}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(checked ? { timeout: 1000 } : {})}
                >

                    <Button
                        variant="contained"
                        style={{color:'white',backgroundColor:'#7A0010'}}
                        size="small"
                        onClick={HandleUpdate("Delivered")}
                        className={classes.button}
                        startIcon={<DoneAllIcon />}
                    >
                        Delivered
                    </Button>


                </Grow>
            </div>
        </div>
    );
}
export default Statusupdate;