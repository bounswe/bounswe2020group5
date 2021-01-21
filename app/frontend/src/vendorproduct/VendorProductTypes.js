import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginLeft: "1rem",
        marginRight: "1rem"
    },
    chip: {
        backgroundColor: "#0B3954",
        fontSize: "1.3rem",
        color: "white",
        marginRight: "1rem",
        marginBottom: "1rem",
    },
}));

export const ProductTypes = ({typeslist}) =>  {

    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <Typography variant="h5" style={{display: 'inline-block', margin:"1rem"}}  gutterBottom>
                        Types of products I sell:
                    </Typography>
                    {typeslist.map((type, index) => (
                        <Chip className={classes.chip} label={type} />
                    ))}
                </List>
            </div>
        </div>
    );
}
export default ProductTypes;

