import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem clicked={props.clicked} link="/" exact>
        <strong>Posts</strong>
      </NavigationItem>
      {props.isAuth ? (
        <NavigationItem clicked={props.clicked} link="/myposts">
          <strong>MyPosts</strong>
        </NavigationItem>
      ) : null}
      {props.isAuth ? (
        <NavigationItem clicked={props.clicked} link="/logout">
          <strong>Logout</strong>
        </NavigationItem>
      ) : (
        <NavigationItem clicked={props.clicked} link="/auth">
          <strong>Login/Signup</strong>
        </NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
