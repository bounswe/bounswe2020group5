import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import BlockIcon from "@material-ui/icons/Block";
import { serverUrl } from "../common/ServerUrl";
import { Alert } from "@material-ui/lab";
import { postDataToken2 } from "../common/Requests";

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
  button: {
    margin: theme.spacing(2),
    background: "#0B3954",
  },
}));

export const AdminCommentList = ({ commentList }) => {
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState("");

  function handleResponse(res) {
    try {
      const token = res.success;
      if (token) {
        alert("Admin action is successful.");
        window.location.reload()
      } else {
        setAlertMessage("Some error has occured");
        console.log(res);
      }
    } catch (error) {
      setAlertMessage("Some error has occured");
    }
  }

  function handleDelete(id) {
    const url = serverUrl + "api/admin/delete_comment/";

    const data = {
      comment_id: id,
    };

    postDataToken2(url, data)
      .then(handleResponse)
      .catch((rej) => {
        console.log(rej);
        setAlertMessage("Some error has occured");
      });
  }

  function handleBan(id) {
    const url = serverUrl + "api/admin/delete_user_by_comment_id/";

    const data = {
      comment_id: id,
    };

    postDataToken2(url, data)
      .then(handleResponse)
      .catch((rej) => {
        console.log(rej);
        setAlertMessage("Some error has occured");
      });
  }

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
                color="primary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(comment.id)}
              >
                Delete Comment
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<BlockIcon />}
                onClick={() => handleBan(comment.id)}
              >
                Ban User
              </Button>
              {alertMessage && (
                <Alert className={classes.alert} severity="error">
                  {alertMessage}
                </Alert>
              )}
              <Divider />
            </Box>
          ))}
        </List>
      </div>
    </div>
  );
};
export default AdminCommentList;
