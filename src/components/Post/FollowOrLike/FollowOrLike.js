import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const FollowOrLike = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color={props.liked ? "primary" : "secondary"}
        onClick={props.likeHandler}
      >
        <ThumbUpIcon />
      </Button>
    </div>
  );
};

export default FollowOrLike;
