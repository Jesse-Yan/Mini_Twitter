import React, { Fragment } from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import Title from "../Title/Title";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "./DrawerToggle/DrawerToggle";
import PropTypes from "prop-types";

const Toolbar = (props) => (
  <Fragment>
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToogleClicked} />
      <div className={classes.Logo}>
        <Logo isAuth={props.isAuth} gender={props.gender} />
      </div>
      <Title loading={props.loading} name={props.firstName} />
      <nav className={classes.DesktopOnly}>
        <NavigationItems
          isAuth={props.isAuth}
          className={classes.DesktopOnly}
        />
      </nav>
    </header>
  </Fragment>
);

Toolbar.propTypes = {
  drawerToogleClicked: PropTypes.func.isRequired,
};

export default Toolbar;
