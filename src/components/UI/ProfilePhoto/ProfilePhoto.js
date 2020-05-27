import React from "react";

import classes from "./ProfilePhoto.module.css";
import ProfileMan from "../../../assets/images/ProfileMan.jpg";
import ProfileWoman from "../../../assets/images/ProfileWoman.jpg";
import QuestionMark from "../../../assets/images/QuestionMark.jpg";

const ProfilePhoto = (props) => {
  let profile = null;
  switch (props.gender) {
    case "Male":
      profile = ProfileMan;
      break;
    case "Female":
      profile = ProfileWoman;
      break;
    default:
      profile = QuestionMark;
  }
  return (
    <div>
      <img className={classes.ProfilePhoto} src={profile} alt="ProfilePhoto" />
    </div>
  );
};

export default ProfilePhoto;
