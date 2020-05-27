import React from "react";

import Tweet from "../../../assets/images/Tweet.jpg";
import Man from "../../../assets/images/ProfileMan.jpg";
import Woman from "../../../assets/images/ProfileWoman.jpg";
import Undefined from "../../../assets/images/QuestionMark.jpg";
import classes from "./Logo.module.css";

const Logo = (props) => {
  let image = Tweet;
  if (props.isAuth) {
    switch (props.gender) {
      case "Male":
        image = Man;
        break;
      case "Female":
        image = Woman;
        break;
      default:
        image = Undefined;
    }
  }
  return <img className={classes.Logo} src={image} alt="" />;
};

export default Logo;
