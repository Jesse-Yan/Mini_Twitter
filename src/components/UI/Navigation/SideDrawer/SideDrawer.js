import React, { Fragment } from "react";
import { CSSTransition } from "react-transition-group";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Title from "../Title/Title";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../Backdrop/Backdrop";
import PropTypes from "prop-types";

const SideDrawer = (props) => {
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <CSSTransition
        in={props.open}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames={{
          appearActive: classes.Close,
          enterActive: classes.Open,
          exit: classes.Close,
        }}
      >
        <div className={classes.SideDrawer}>
          <div className={classes.Logo}>
            <Logo isAuth={props.isAuth} gender={props.gender} />
          </div>
          <Title loading={props.loading} name={props.firstName} />
          <nav>
            <NavigationItems clicked={props.closed} isAuth={props.isAuth} />
          </nav>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
};

export default SideDrawer;
