import React from "react";
import classes from "./DrawerToggle.module.css";
import PropTypes from "prop-types";

const DrawerToggle = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggle;
