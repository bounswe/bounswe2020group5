import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {

        height:20,
        weight:10,
        backgroundColor: theme.palette.background.paper,
    },
    float:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',

    },
}));

export default function StarList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([-1]);


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List dense className={classes.root}>
            {[ 1, 2, 3,4,5].map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem className={classes.float} key={value} button>
                        <Box component="fieldset"  borderColor="transparent">
                            <Rating size="small"
                                    name="read-only" value={value} readOnly

                            />
                        </Box>
                        <ListItemText id={labelId} primary={``} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(value)}
                                checked={checked.indexOf(value) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

