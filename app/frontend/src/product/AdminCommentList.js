import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  author: {
    fontSize: "5rem",
    color: "red",
  },
  text: {
    marginLeft: "1rem",
    fontSize: "3rem",
  },
  comment: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 1)", // (default alpha is 0.38)
    },
  },
}));

export const AdminCommentList = ({ commentList }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <List
          component="nav"
          className={classes.root}
          aria-label="mailbox folders"
        >
          {commentList.map((comment, index) => (
            <Box
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              key={index}
            >
              <Typography
                variant="h6"
                style={{ display: "inline-block" }}
                gutterBottom
              >
                {comment.customer}
              </Typography>
              <Rating
                style={{ marginLeft: "2rem", justify: "center" }}
                name="read-only"
                value={comment.rating_score}
                precision={0.1}
                readOnly
              />
              <Typography variant="subtitle1" gutterBottom>
                {comment.comment_text}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Divider />
            </Box>
          ))}
        </List>
      </div>
    </div>
  );
};
export default AdminCommentList;
