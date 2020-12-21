import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {Link, useLocation} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import {makeStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    author: {
        fontSize: "5rem",
        color: "red",
    },
    text:{
        marginLeft: "1rem",
        fontSize: "3rem",
    },
}));

export const CommentList = ({commentList}) =>  {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    {commentList.map((comment, index) => (

                        <ListItem key={index}>
                            <div>
                            <ListItemText primary={comment.customer+": "} className={classes.author} />
                            </div>
                            <div>
                            <ListItemText primary={comment.comment_text} className={classes.text} />
                            </div>
                        </ListItem>
                        ))}
                </List>
            </div>
        </div>
    );
}
export default CommentList;

