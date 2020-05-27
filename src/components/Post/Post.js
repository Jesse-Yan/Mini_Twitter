import React, { useState } from "react";

import ProfilePhoto from "../UI/ProfilePhoto/ProfilePhoto";
import FollowOrLike from "./FollowOrLike/FollowOrLike";
import classes from "./Post.module.css";

const Post = (props) => {
  const [liked, setLiked] = useState(false);

  const likeClickHandler = () => {
    setLiked((prevState) => !prevState);
  };

  return (
    <div className={classes.Post}>
      <div className={classes.Profile}>
        <ProfilePhoto gender={props.gender} />
        <p>
          {props.name} posted on {props.date}
        </p>
      </div>
      <textarea
        className={classes.Content}
        readOnly
        cols="15"
        wrap="hard"
        defaultValue={props.content}
      />
      {props.myPosts ? null : (
        <FollowOrLike liked={liked} likeHandler={likeClickHandler} />
      )}
    </div>
  );
};

export default Post;
