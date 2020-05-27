import React from "react";

import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import classes from "./Home.module.css";

const Home = (props) => (
  <div className={classes.Home}>
    <Posts />
    <NewPost />
  </div>
);

export default Home;
